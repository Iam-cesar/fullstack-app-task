import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './core/config/typeorm/typeOrmConfig';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TaskModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
