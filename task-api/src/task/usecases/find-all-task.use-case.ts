import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { PageLinkDto } from 'src/core/dto/page-link.dto';
import {
  DataSource,
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
} from 'typeorm';
import { PageMetaDto } from '../../core/dto/page-meta.dto';
import { PageOptionsDto } from '../../core/dto/page-options.dto';
import { PageDto } from '../../core/dto/page.dto';
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

    const whereClause = this.buildWhereClause(pageOptionsDto.where);
    const orderClause = this.buildOrderClause(pageOptionsDto.order);
    const limitClause = this.buildLimitClause(pageOptionsDto.take);
    const offsetClause = this.buildOffsetClause(pageOptionsDto.skip);

    const query = `
      SELECT *
      FROM task ${whereClause} ${orderClause} ${limitClause}
        ${offsetClause}
    `;

    const countQuery = `
      SELECT COUNT(*)
      FROM task ${whereClause}
    `;

    const [entities, totalItems] = await Promise.all([
      queryRunner.query(query),
      queryRunner.query(countQuery),
    ]);

    const pageMetaDto = new PageMetaDto({
      items_count: totalItems[0].count,
      pageOptions: params,
    });

    const pageLinkDto = new PageLinkDto(pageMetaDto, req);

    return new PageDto(entities, pageMetaDto, pageLinkDto);
  }

  private toSnakeCase(s: string) {
    return s.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }

  private buildWhereClause(
    whereOptions: FindOptionsWhere<Task> | FindOptionsWhere<Task>[],
  ) {
    if (!whereOptions) return '';

    const whereClauseObjectKeys = Object.keys(whereOptions);
    const shouldIncludeWhereClause = whereClauseObjectKeys.length > 0;
    const whereQuery = `WHERE ${whereClauseObjectKeys
      .map((key) => `${this.toSnakeCase(key)} LIKE %${whereOptions[key]}%`)
      .join(' AND ')}`;

    return shouldIncludeWhereClause ? whereQuery : '';
  }

  private buildOrderClause(
    orderOptions: FindOptionsOrder<Task> | FindOptionsOrder<Task>[],
  ) {
    if (!orderOptions) return '';
    const orderClauseObjectKeys = Object.keys(orderOptions);
    const shouldIncludeOrderClause = orderClauseObjectKeys.length > 0;
    const orderQuery = `ORDER BY ${Object.keys(orderOptions)
      .map((key) => `${this.toSnakeCase(key)} ${orderOptions[key]}`)
      .join(', ')}`;

    return shouldIncludeOrderClause ? orderQuery : '';
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
