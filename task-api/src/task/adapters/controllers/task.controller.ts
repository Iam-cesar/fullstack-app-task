import {
  Body,
  Controller,
  Delete,
  Get, Injectable,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { CRUD } from '../../../core/entities/crud.interface';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { UpdateTaskDto } from '../../dto/update-task.dto';
import { Task } from '../../entities/task.entity';
import { TaskService } from '../../usecases/task.service.interface';

@Controller('task')
export class TaskController implements CRUD<Task> {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.taskService.remove(id);
  }
}
