
import { IsString, IsInt, IsDecimal } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDecimal()
  price: number;

  @IsInt()
  stock: number;
}
