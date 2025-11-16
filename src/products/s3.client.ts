import {
  S3Client,
  CreateBucketCommand,
  HeadBucketCommand,
} from '@aws-sdk/client-s3';
import { envs } from '../config/envs';

export const s3 = new S3Client({
  region: envs.awsRegion,
  endpoint: envs.s3Endpoint, // LocalStack o MinIO
  forcePathStyle: true, // obligatorio para LocalStack/MinIO
  credentials: {
    accessKeyId: envs.awsAccessKey,
    secretAccessKey: envs.awsSecretKey,
  },
});

export async function createBucketIfNotExists(bucketName: string) {
  try {
    // Verificar si el bucket existe
    await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
    console.log(`El bucket "${bucketName}" ya existe.`);
  } catch (err: any) {
    if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
      // Si no existe, lo creamos
      await s3.send(new CreateBucketCommand({ Bucket: bucketName }));
      console.log(`Bucket "${bucketName}" creado!`);
    } else {
      // Otro error inesperado
      console.error('Error verificando bucket:', err);
    }
  }
}
