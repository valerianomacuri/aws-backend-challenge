import { Request, Response } from 'express';
import { ProductService } from './product.service';

const productService = new ProductService();

// Tipado correcto para multer
interface FileRequest extends Request {
  file?: Express.Multer.File;
}

export class ProductController {
  static async list(req: Request, res: Response) {
    try {
      const products = await productService.list();
      return res.json(products);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: 'Error fetching products', error: err });
    }
  }

  static async get(req: Request, res: Response) {
    try {
      const product = await productService.get(req.params.id);
      if (!product)
        return res.status(404).json({ message: 'Product not found' });

      return res.json(product);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: 'Error fetching product', error: err });
    }
  }

  static async uploadImage(req: FileRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
      }

      const { imageUrl, thumbnailUrl } = await productService.uploadImage(
        req.file.buffer,
        req.file.originalname,
      );

      return res.status(200).json({ imageUrl, thumbnailUrl });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: 'Error uploading image', error: err });
    }
  }

  /**
   * Crear producto en la base de datos
   */
  static async create(req: Request, res: Response) {
    try {
      const product = await productService.create(req.body);
      return res.status(201).json(product);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: 'Error creating product', error: err });
    }
  }
}
