
import { IsString, IsEmail, IsDateString } from 'class-validator';

export class CreateDeliveryDto {
  @IsDateString()
  deliveryDate: string;

  @IsEmail()
  email: string;
}
