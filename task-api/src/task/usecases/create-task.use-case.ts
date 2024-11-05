import { Injectable,  } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TaskRepository } from "../persistence/task.repository.interface";

export class CreateTaskUseCase {
  constructor(
     private readonly repo: TaskRepository) {}

  execute(input: CreateTaskDto) {
    return this.repo.create(input);
  }
}
