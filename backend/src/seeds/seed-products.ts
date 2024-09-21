
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProductsService } from '../products/products.service';
import { CreateProductDto } from '../products/dto/create-product.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productsService = app.get(ProductsService);

  const products: CreateProductDto[] = [
    {
      name: 'Product 1',
      description: 'Description Product 1',
      price: 10000,
      stock: 50,
    },
    {
      name: 'Product 2',
      description: 'Description Product 2',
      price: 20000,
      stock: 30,
    },
    {
      name: 'Product 3',
      description: 'Description Product 3',
      price: 45000,
      stock: 60,
    },    
  ];

  for (const product of products) {
    await productsService.create(product);
  }

  console.log('Productos seedados correctamente.');
  await app.close();
}

bootstrap();
