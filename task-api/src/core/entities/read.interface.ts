import { HttpException } from '@nestjs/common';

export interface IRead<T> {
  findAll(): Promise<T[] | HttpException>;

  findOne(id: string): Promise<T | HttpException>;

  remove(id: string): Promise<T | HttpException>;
}
