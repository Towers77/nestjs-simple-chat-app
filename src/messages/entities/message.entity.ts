import { Chat } from 'src/chats/entities/chat.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.sent_messages)
  sent_by: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  sent_in: Chat;
}
