import { Router } from 'express';
import { ProductController } from './product.controller';
import { authMiddleware } from '../shared/auth.middleware';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// Listar todos los productos
router.get('/', ProductController.list);

// Obtener un producto por ID
router.get('/:id', ProductController.get);

// Subir imagen a S3 (solo usuarios autenticados)
router.post(
  '/upload',
  authMiddleware,
  upload.single('image'),
  ProductController.uploadImage,
);

// Crear producto en la base de datos (solo usuarios autenticados)
router.post('/', authMiddleware, ProductController.create);

export default router;
