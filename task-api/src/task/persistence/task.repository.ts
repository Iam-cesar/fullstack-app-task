import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {}
