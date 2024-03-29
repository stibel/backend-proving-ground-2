import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  user: string;

  @CreateDateColumn()
  additionTime: Date;
}
