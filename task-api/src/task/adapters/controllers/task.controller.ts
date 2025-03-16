import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { FindOptionsOrderValue, Like } from 'typeorm';
import { CRUD } from '../../../core/interfaces/crud.interface';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { UpdateTaskDto } from '../../dto/update-task.dto';
import { Task } from '../../entities/task.entity';
import { TaskEnumStatus } from '../../entities/task.enum';
import { CreateTaskUseCase } from '../../usecases/create-task.use-case';
import { FindAllTaskUseCase } from '../../usecases/find-all-task.use-case';
import { FindOneTaskUseCase } from '../../usecases/find-one-task.use-case';
import { RemoveTaskUseCase } from '../../usecases/remove-task.use-case';

const TASK_ORDER_OPTIONS = [
  'id',
  'title',
  'description',
  'status',
  'created_at',
  'updated_at',
];

@Controller('task')
export class TaskController implements CRUD<Task> {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findOneTaskUseCase: FindOneTaskUseCase,
    private readonly findAllTaskUseCase: FindAllTaskUseCase,
    private readonly removeTaskUseCase: RemoveTaskUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @HttpCode(400)
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.createTaskUseCase.execute(createTaskDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(
    @Query('perPage') perPage?: string,
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: keyof Task,
    @Query('order') order?: FindOptionsOrderValue,
    @Req() req?: Request,
  ) {
    try {
      const take = parseInt(perPage);
      const skip = parseInt(page);
      const where = search ? { title: Like(`%${search}%`) } : {};
      const orderOptions = this.getOrderParams(orderBy, order);

      return await this.findAllTaskUseCase.execute(
        {
          take,
          skip,
          where,
          order: orderOptions,
        },
        req,
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (isNaN(+id)) throw this.throwIsNanException();

    try {
      return await this.findOneTaskUseCase.execute(+id);
    } catch (error) {
      throw new HttpException(`Task ${id} not found.`, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    if (isNaN(+id)) throw this.throwIsNanException();

    const input = { id: +id, ...updateTaskDto };
    const isStatusValid = input.status in TaskEnumStatus;
    if (!isStatusValid) throw this.throwErrorIfInvalidStatus();

    try {
      return await this.createTaskUseCase.execute(input);
    } catch (error) {
      throw new HttpException(`Task ${id} not found.`, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (isNaN(+id)) throw this.throwIsNanException();

    try {
      return await this.removeTaskUseCase.execute(+id);
    } catch (error) {
      throw new HttpException(`Task ${id} not found.`, HttpStatus.NOT_FOUND);
    }
  }

  private throwIsNanException() {
    return new HttpException(
      'Id attribute must be a number',
      HttpStatus.BAD_REQUEST,
    );
  }

  private throwErrorIfInvalidStatus() {
    return new HttpException(
      'Status should be "PENDING", "IN_PROGRESS" or "COMPLETED"',
      HttpStatus.BAD_REQUEST,
    );
  }

  private getOrderParams(orderBy: keyof Task, order: FindOptionsOrderValue) {
    const orderOptions = {};

    if (orderBy && TASK_ORDER_OPTIONS.includes(orderBy)) {
      orderOptions[orderBy] = order;
    }
    return orderOptions;
  }
}
