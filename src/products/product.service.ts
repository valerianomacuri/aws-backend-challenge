import { v4 as uuid } from 'uuid';
import { ProductsRepository } from './product.repository';
import { s3 } from './s3.client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';
import { envs } from '../config/envs';
import { lambdaClient } from '../lambda/lambda.client';
import { InvokeCommand } from '@aws-sdk/client-lambda';

const repo = new ProductsRepository();
const bucketName = envs.s3BucketName;
const S3_BASE_URL = `${envs.s3Endpoint}/${bucketName}`; // LocalStack endpoint

export class ProductService {
  async list() {
    return repo.findAll();
  }

  async get(id: string) {
    return repo.findById(id);
  }

  /**
   * Subir una imagen a S3 y devolver la URL
   */
  async uploadImage(
    imageBuffer: Buffer,
    imageName: string,
  ): Promise<Record<string, string>> {
    try {
      const key = `${uuid()}-${imageName}`;
      const contentType = mime.lookup(imageName) || 'application/octet-stream';

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: imageBuffer,
        ContentType: contentType,
      });

      await s3.send(command);

      const imageUrl = `${S3_BASE_URL}/${key}`;

      const response = await lambdaClient.send(
        new InvokeCommand({
          FunctionName: 'resize-image',
          InvocationType: 'RequestResponse', // async (no espera respuesta)
          Payload: Buffer.from(
            JSON.stringify({
              bucket: bucketName,
              key,
              imageUrl,
            }),
          ),
        }),
      );

      // El payload viene como Buffer, hay que parsearlo
      const payloadString = Buffer.from(response.Payload!).toString('utf-8');
      const result = JSON.parse(payloadString);
      const thumbnailUrl = result.thumbnailUrl;
      return { imageUrl, thumbnailUrl };
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw new Error('Failed to upload image');
    }
  }

  /**
   * Crear producto en la base de datos
   */
  async create(data: any): Promise<any> {
    const product = { id: uuid(), ...data };
    return repo.create(product);
  }
}
