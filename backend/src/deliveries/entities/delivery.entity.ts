
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deliveryDate: Date;

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer: Customer;
}
