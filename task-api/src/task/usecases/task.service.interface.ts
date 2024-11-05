import { UUID } from 'crypto';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { RepositoryResponseInterface } from '../../infrastructure/gateways/repositoryResponse.interface';
import { Task } from '../entities/task.entity';

export interface TaskService {
  create(createTaskDto: CreateTaskDto): Promise<RepositoryResponseInterface<Task>>;

  findAll(): Promise<RepositoryResponseInterface<Task>>;

  findOne(id: UUID): Promise<RepositoryResponseInterface<Task>>;

  remove(id: UUID): Promise<RepositoryResponseInterface<Task>>;

  update(id: UUID, updateTaskDto: UpdateTaskDto): Promise<RepositoryResponseInterface<Task>>;
}
