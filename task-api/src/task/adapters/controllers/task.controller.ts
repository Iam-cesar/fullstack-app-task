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
} from '@nestjs/common';
import { CRUD } from 'src/core/entities/crud.interface';
import { FindOptionsOrder, Like } from 'typeorm';
import { CreateTaskUseCase } from '../../../task/usecases/create-task.use-case';
import { FindAllTaskUseCase } from '../../../task/usecases/find-all-task.use-case';
import { FindOneTaskUseCase } from '../../../task/usecases/find-one-task.use-case';
import { RemoveTaskUseCase } from '../../../task/usecases/remove-task.use-case';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { Task } from '../../entities/task.entity';

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
    @Query('order') order?: FindOptionsOrder<Task>,
  ) {
    try {
      const take = Number(perPage) || 15;
      const skip = (Number(page) - 1) * take || 0;
      const where = search ? { title: Like(`%${search}%`) } : {};

      return await this.findAllTaskUseCase.execute({
        take,
        skip,
        cache: 5000,
        where,
        order,
      });
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
    try {
      if (isNaN(+id)) {
        throw new HttpException(
          'Id attribute must be a number',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.findOneTaskUseCase.execute(+id);
    } catch (error) {
      throw new HttpException(`Task ${id} not found.`, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: Partial<Partial<Task>>,
  ) {
    try {
      if (isNaN(+id)) {
        throw new HttpException(
          'Id attribute must be a number',
          HttpStatus.BAD_REQUEST,
        );
      }
      const input = { id: +id, ...updateTaskDto };
      return await this.createTaskUseCase.execute(input);
    } catch (error) {
      throw new HttpException(`Task ${id} not found.`, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      if (isNaN(+id)) {
        throw new HttpException(
          'Id attribute must be a number',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.removeTaskUseCase.execute(+id);
    } catch (error) {
      throw new HttpException(`Task ${id} not found.`, HttpStatus.NOT_FOUND);
    }
  }
}
