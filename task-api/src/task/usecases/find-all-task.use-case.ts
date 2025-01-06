import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/core/dto/Page.dto';
import { PageMetaDto } from 'src/core/dto/PageMeta.dto';
import { PageOptionsDto } from 'src/core/dto/PageOptions.dto';
import { FindManyOptions } from 'typeorm';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../persistence/task.repository';

@Injectable()
export class FindAllTaskUseCase {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(params?: FindManyOptions<Task>): Promise<PageDto<Task>> {
    const pageOptionsDto = new PageOptionsDto<Task>(params);

    const [entities, totalItems] = await this.taskRepository.findAndCount({
      ...pageOptionsDto,
    });

    const pageMetaDto = new PageMetaDto({
      items_count: totalItems,
      pageOptions: params,
    });

    return new PageDto(entities, pageMetaDto);
  }
}
