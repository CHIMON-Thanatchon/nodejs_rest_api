import { IsInt, IsUUID, Min } from 'class-validator';

export class AddCartItemDto {
  @IsUUID()
  bookId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
