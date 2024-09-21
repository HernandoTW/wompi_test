
import { IsNumber, IsString, IsEmail } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  baseFee: number;

  @IsNumber()
  deliveryFee: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;
}
