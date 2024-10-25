import { randomUUID, UUID } from 'crypto';
import { IRead } from 'src/database/interfaces/read.interface';
import { IWrite } from 'src/database/interfaces/write.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { NotFoundException } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import * as path from 'path';
import { Task } from './entities/task.entity';

const DB_FILE_PATH = path.resolve(__dirname, '../database/task.db.json');

export default class TaskRepository implements IRead<Task>, IWrite<Task> {
  private async readFile() {
    return JSON.parse(await readFile(DB_FILE_PATH, 'utf-8'));
  }

  private async writeFile(data, newData: Task) {
    const hasTaskContent = !!data?.tasks;
    if (!hasTaskContent) data = { ...data, tasks: [] };
    data.tasks.push(newData);
    await writeFile(DB_FILE_PATH, JSON.stringify(data));
  }

  private appendRandomUUID(createDto: CreateTaskDto) {
    const id = randomUUID();
    return { ...createDto, id };
  }

  async create(createDto: CreateTaskDto): Promise<string> {
    try {
      try {
        const dataWithId = this.appendRandomUUID(createDto);
        const data = await this.readFile();
        await this.writeFile(data, dataWithId);
      } catch (readError) {
        console.log('🚀 ~ readError:', readError);
        if (readError.code !== 'ENOENT') {
          return readError;
        }
      }

      return 'success';
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return 'failure';
    }
  }

  async update(id: UUID, updateDTO: UpdateTaskDto): Promise<Task> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: UUID): Promise<Task | null> {
    try {
      const data = await this.readFile();
      if (!data?.tasks)
        throw new NotFoundException(
          `Tarefa ${id} não foi encontrada ou não existe`,
        );

      const tasks = data.tasks.filter((task) => task.id === id);
      return tasks?.[0] ?? null;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return null;
    }
  }

  async remove(id: UUID): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
