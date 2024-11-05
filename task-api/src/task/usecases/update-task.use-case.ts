import { UUID } from "crypto";
import { TaskRepository } from "../persistence/task.repository.interface";
import { Injectable } from "@nestjs/common";
import { UpdateTaskDto } from "../dto/update-task.dto";

export class UpdateTaskUseCase {
  constructor(private readonly repo: TaskRepository) {}

  execute(id:UUID, updateDto: UpdateTaskDto) {
    return this.repo.update(id, updateDto);
  }
}
