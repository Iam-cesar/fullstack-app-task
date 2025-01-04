import { HttpException } from '@nestjs/common';

export interface IWrite<T> {
  create(createDto: Partial<T>): Promise<T | HttpException>;

  update(id: string, updateDTO: Partial<T>): Promise<T | HttpException>;
}
