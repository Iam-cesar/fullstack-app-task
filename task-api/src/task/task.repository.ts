import { randomUUID, UUID } from 'crypto';
import { IRead } from 'src/database/interfaces/read.interface';
import { IWrite } from 'src/database/interfaces/write.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { readFile, writeFile } from 'fs/promises';
import * as path from 'path';
import RepositoryResponse from 'src/utils/repositoryResponse';
import { Task } from './entities/task.entity';

const DB_FILE_PATH = path.resolve(__dirname, '../database/task.db.json');

export default class TaskRepository implements IRead<Task>, IWrite<Task> {
  constructor(private readonly repositoryResponse: RepositoryResponse<Task>) {}
  private async readFile() {
    return JSON.parse(await readFile(DB_FILE_PATH, 'utf-8'));
  }

  private async writeFile(data): Promise<void> {
    await writeFile(DB_FILE_PATH, JSON.stringify(data));
  }

  private appendRandomUUID(createDto: CreateTaskDto) {
    const id = randomUUID();
    return { ...createDto, id };
  }

  async create(createDto: CreateTaskDto): Promise<RepositoryResponse<Task>> {
    try {
      const dataWithId = this.appendRandomUUID(createDto);
      let data = await this.readFile();
      const hasTaskContent = !!data?.tasks;
      if (!hasTaskContent) data = { ...data, tasks: [] };
      data.tasks.push(dataWithId);
      await this.writeFile(data);
      return RepositoryResponse.create<Task>(null, null, null);
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return RepositoryResponse.create<Task>(error, error.message, null);
    }
  }

  async update(
    id: UUID,
    updateDTO: UpdateTaskDto,
  ): Promise<RepositoryResponse<Task>> {
    try {
      const data = await this.readFile();
      const selectedTask: Task[] = data.filter((task: Task) => task.id === id);
      const taskAtIndexZero = selectedTask?.[0];
      if (!taskAtIndexZero) return null;
      const taskUpdated = { ...taskAtIndexZero, ...updateDTO };
      return RepositoryResponse.create<Task>(null, null, taskUpdated);
    } catch (error) {
      return RepositoryResponse.create<Task>(error, error.message, null);
    }
  }

  async findAll(): Promise<RepositoryResponse<Task[]>> {
    try {
      const allTasks = await this.readFile();
      return RepositoryResponse.create<Task[]>(null, null, allTasks);
    } catch (error) {
      return RepositoryResponse.create<Task[]>(error, error.message, []);
    }
  }

  async findOne(id: UUID): Promise<RepositoryResponse<Task>> {
    try {
      const data = await this.readFile();
      const tasks = data.tasks.filter((task: Task) => task.id === id);
      return RepositoryResponse.create<Task>(null, null, tasks?.[0]);
    } catch (error) {
      return RepositoryResponse.create<Task>(error, error.message, null);
    }
  }

  async remove(id: UUID): Promise<RepositoryResponse<Task>> {
    try {
      const tasks = await this.readFile();
      tasks.filter((task: Task) => task.id !== id);
      await this.writeFile(tasks);
      return RepositoryResponse.create<Task>(null, null, tasks);
    } catch (error) {
      return RepositoryResponse.create<Task>(error, error.message, null);
    }
  }
}
