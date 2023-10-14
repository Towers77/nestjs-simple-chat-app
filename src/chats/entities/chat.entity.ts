import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user1: User;

  @OneToOne(() => User)
  @JoinColumn()
  user2: User;

  @OneToMany(() => Message, (message) => message.sent_in)
  messages: Message[];

  @Column({ default: 0 })
  message_count: number;
}
