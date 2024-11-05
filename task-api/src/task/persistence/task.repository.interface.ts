import { CRUD } from '../../core/entities/crud.interface';
import { Task } from '../entities/task.entity';

export interface TaskRepository extends CRUD<Task> {}
