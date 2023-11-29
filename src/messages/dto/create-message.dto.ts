import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  text: string;

  @IsNumber()
  sent_by: number;

  @IsNumber()
  sent_in: number;
}
