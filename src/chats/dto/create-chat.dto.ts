import { IsInt } from 'class-validator';

export class CreateChatDto {
  @IsInt()
  user1_id: number;

  @IsInt()
  user2_id: number;
}
