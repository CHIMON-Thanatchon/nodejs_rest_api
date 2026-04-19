import { IsInt, IsNumberString, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  isbn: string;

  /** ราคาเป็นสตริง decimal เช่น "299.00" */
  @IsNumberString()
  price: string;

  @IsInt()
  @Min(0)
  stock: number;
}
