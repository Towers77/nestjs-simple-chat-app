import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user1: User;

  @ManyToOne(() => User)
  @JoinColumn()
  user2: User;

  @OneToMany(() => Message, (message) => message.sent_in)
  messages: Message[];

  @Column({ default: 0 })
  message_count: number;
}
