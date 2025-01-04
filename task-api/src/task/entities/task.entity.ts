import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'is_completed', default: false, nullable: false })
  isCompleted: boolean;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
