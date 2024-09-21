
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { Transaction, TransactionStatus } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ProductsService } from '../products/products.service';
import { CustomersService } from '../customers/customers.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const product = await this.productsService.findOne(createTransactionDto.productId);
    let customer = await this.customersService.findOneByEmail(createTransactionDto.email);
    if (!customer) {
      customer = await this.customersService.create({
        name: createTransactionDto.name,
        email: createTransactionDto.email,
        address: createTransactionDto.address,
      });
    }

    const transaction = this.transactionsRepository.create({
      transactionNumber: uuidv4(),
      product,
      customer,
      amount: createTransactionDto.amount,
      baseFee: createTransactionDto.baseFee,
      deliveryFee: createTransactionDto.deliveryFee,
      status: TransactionStatus.PENDING,
    });

    return this.transactionsRepository.save(transaction);
  }

  async updateStatus(id: number, status: TransactionStatus, wompiTransactionId: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOneBy({ id });
    if (!transaction) throw new NotFoundException('Transaction not found');
    transaction.status = status;
    transaction.wompiTransactionId = wompiTransactionId;
    return this.transactionsRepository.save(transaction);
  }
}
