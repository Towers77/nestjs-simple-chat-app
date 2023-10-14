import { Message } from 'src/messages/entities/message.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true, nullable: false, select: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @OneToMany(() => Message, (message) => message.sent_by)
  sent_messages: Message;
}
