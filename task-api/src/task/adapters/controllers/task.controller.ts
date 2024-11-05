import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { CRUD } from '../../../core/entities/crud.interface';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { UpdateTaskDto } from '../../dto/update-task.dto';
import { Task } from '../../entities/task.entity';
import { CreateTaskUseCase } from 'src/task/usecases/create-task.use-case';
import { FindOnetaskUseCase } from 'src/task/usecases/find-one-task.use-case';
import { FindAlltaskUseCase } from 'src/task/usecases/find-all-task.use-case';
import { UpdateTaskUseCase } from 'src/task/usecases/update-task.use-case';
import { RemoveTaskUseCase } from 'src/task/usecases/remove-task.use-case';

@Controller('task')
export class TaskController implements CRUD<Task> {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findOneTaskUseCase: FindOnetaskUseCase,
    private readonly findAllTaskUseCase: FindAlltaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly removeTaskUseCase: RemoveTaskUseCase,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.createTaskUseCase.execute(createTaskDto);
  }

  @Get()
  findAll() {
    return this.findAllTaskUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.findOneTaskUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateTaskDto: UpdateTaskDto) {
    return this.updateTaskUseCase.execute(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.removeTaskUseCase.execute(id);
  }
}
