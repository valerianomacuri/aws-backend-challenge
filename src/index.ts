import express from 'express';
import productRoutes from './products/product.routes';
import userRoutes from './users/user.routes';
import orderRoutes from './orders/order.routes';
import { envs } from './config/envs';
import { setupLocalCognito } from './users/cognito.client';
import { AppDataSource } from './orders/datasource';
import { createBucketIfNotExists } from './products/s3.client';

const app = express();
app.use(express.json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', userRoutes);

setupLocalCognito();
createBucketIfNotExists(envs.bucketName);

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected successfully');
    app.listen(envs.port, () =>
      console.log(`🚀 Server running on port ${envs.port}`),
    );
  })
  .catch((err) => {
    console.error('❌ Failed to connect to the database');
    console.error(err);
    process.exit(1); // Salir del proceso si no se puede conectar
  });
