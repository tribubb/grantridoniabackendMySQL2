// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Entity Format, as it will appear in PHPMyAdmin/Sql Workbench
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  discordid: string;
}