
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { Transaction, TransactionStatus } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ProductsService } from '../products/products.service';
import { CustomersService } from '../customers/customers.service';
import { WompiService } from '../wompi/wompi.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private productsService: ProductsService,
    private customersService: CustomersService,
    private wompiService: WompiService,
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
    const transaction = await this.transactionsRepository.findOne({ where: { id } });
    
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    transaction.status = status;
    transaction.wompiTransactionId = wompiTransactionId;
    
    await this.transactionsRepository.save(transaction);
    
    return transaction;
  }


  async processPayment(transactionId: number, token: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOneBy({ id: transactionId });
    if (!transaction) throw new NotFoundException('Transaction not found');

    try {
      const paymentResponse = await this.wompiService.createPayment(token, transaction.amount);
      
      if (paymentResponse.data.status === 'APPROVED') {
        transaction.status = TransactionStatus.COMPLETED;
        transaction.wompiTransactionId = paymentResponse.data.id;
        await this.transactionsRepository.save(transaction);
        await this.productsService.updateStock(transaction.product.id, 1);
      } else {
        transaction.status = TransactionStatus.FAILED;
        await this.transactionsRepository.save(transaction);
      }

      return transaction;
    } catch (error) {
      transaction.status = TransactionStatus.FAILED;
      await this.transactionsRepository.save(transaction);
      throw new HttpException('Payment processing failed', HttpStatus.BAD_REQUEST);
    }
  }
}
