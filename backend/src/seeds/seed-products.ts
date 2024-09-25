
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProductsService } from '../products/products.service';
import { CreateProductDto } from '../products/dto/create-product.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productsService = app.get(ProductsService);

  const products: CreateProductDto[] = [
    {
      name: 'Test Product 1',
      description: 'Description test product 1',
      price: 10000,
      stock: 50,
    },
    {
      name: 'Test Product 2',
      description: 'Description test product 2',
      price: 20000,
      stock: 30,
    },
    {
      name: 'Test Product 3',
      description: 'Description test product 3',
      price: 45000,
      stock: 60,
    },
     {
      name: 'Test Product 4',
      description: 'Description test product 4',
      price: 32000,
      stock: 8,
    },       
  ];

  for (const product of products) {
    await productsService.create(product);
  }

  console.log('Productos seedados correctamente.');
  await app.close();
}

bootstrap();
