
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private deliveriesRepository: Repository<Delivery>,
    private customersService: CustomersService,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    const customer = await this.customersService.findOneByEmail(createDeliveryDto.email);
    if (!customer) throw new NotFoundException('Customer not found');
    
    const delivery = this.deliveriesRepository.create({
      deliveryDate: createDeliveryDto.deliveryDate,
      customer,
    });

    return this.deliveriesRepository.save(delivery);
  }
}
