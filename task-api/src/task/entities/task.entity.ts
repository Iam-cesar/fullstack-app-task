import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskEnumKeys, TaskEnumStatus } from './task.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'status', default: TaskEnumStatus.PENDING, nullable: false })
  status: TaskEnumKeys;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: string;
}
