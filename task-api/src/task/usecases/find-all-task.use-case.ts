import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import {
  DataSource,
  FindManyOptions,
  FindOperator,
  FindOptionsOrder,
  FindOptionsWhere,
} from 'typeorm';
import { PageLinkDto } from '../../core/dto/page-link.dto';
import { PageMetaDto } from '../../core/dto/page-meta.dto';
import { PageOptionsDto } from '../../core/dto/page-options.dto';
import { PageDto } from '../../core/dto/page.dto';
import {
  buildSelectClause,
  toColumnName,
} from '../../core/utils/entity-columns';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../persistence/task.repository';

@Injectable()
export class FindAllTaskUseCase {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
    private readonly dataSource: DataSource,
  ) {}

  async execute(
    params?: FindManyOptions<Task>,
    req?: Request,
  ): Promise<PageDto<Task>> {
    const pageOptionsDto = new PageOptionsDto<Task>(params);

    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();

    const queryParams: unknown[] = [];
    const selectClause = buildSelectClause(this.dataSource, Task);
    const whereClause = this.buildWhereClause(
      pageOptionsDto.where,
      queryParams,
    );
    const orderClause = this.buildOrderClause(pageOptionsDto.order);
    const limitClause = this.buildLimitClause(pageOptionsDto.take);
    const offsetClause = this.buildOffsetClause(pageOptionsDto.skip);

    const query = `
      SELECT ${selectClause}
      FROM task ${whereClause} ${orderClause} ${limitClause}
        ${offsetClause}
    `;

    const countQuery = `
      SELECT COUNT(*)
      FROM task ${whereClause}
    `;

    const [entities, totalItems] = await Promise.all([
      queryRunner.query(query, queryParams),
      queryRunner.query(countQuery, queryParams),
    ]);

    const pageMetaDto = new PageMetaDto({
      items_count: Number(totalItems[0].count),
      pageOptions: params,
    });

    const pageLinkDto = new PageLinkDto(pageMetaDto, req);

    return new PageDto(entities, pageMetaDto, pageLinkDto);
  }

  private buildWhereClause(
    whereOptions: FindOptionsWhere<Task> | FindOptionsWhere<Task>[],
    queryParams: unknown[],
  ) {
    if (!whereOptions) return '';

    const conditions = Object.keys(whereOptions)
      .map((key) => {
        const columnName = toColumnName(this.dataSource, Task, key);
        if (!columnName) return null;

        const option = whereOptions[key];
        queryParams.push(
          option instanceof FindOperator ? option.value : option,
        );

        return `${columnName} ILIKE $${queryParams.length}`;
      })
      .filter(Boolean);

    return conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  }

  private buildOrderClause(
    orderOptions: FindOptionsOrder<Task> | FindOptionsOrder<Task>[],
  ) {
    if (!orderOptions) return '';

    const conditions = Object.keys(orderOptions)
      .map((key) => {
        const columnName = toColumnName(this.dataSource, Task, key);
        if (!columnName) return null;

        return `${columnName} ${this.toSortDirection(orderOptions[key])}`;
      })
      .filter(Boolean);

    return conditions.length ? `ORDER BY ${conditions.join(', ')}` : '';
  }

  private toSortDirection(direction: unknown) {
    return String(direction).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  }

  private buildLimitClause(limitOptions: number) {
    const limitQuery = `LIMIT ${limitOptions}`;
    return limitOptions ? limitQuery : '';
  }

  private buildOffsetClause(limitOptions: number) {
    const offsetQuery = `OFFSET ${limitOptions}`;
    return limitOptions ? offsetQuery : '';
  }
}
