
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { ProductsModule } from '../products/products.module';
import { CustomersModule } from '../customers/customers.module';
import { WompiModule } from '../wompi/wompi.module'; // Asegúrate de importar WompiModule


@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]), 
    ProductsModule,
    CustomersModule,
    WompiModule
  ],
  providers: [TransactionsService],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule {}
