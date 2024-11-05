import { UUID } from "crypto";
import { TaskRepository } from "../persistence/task.repository.interface";
import { Injectable } from "@nestjs/common";

export class FindOnetaskUseCase {
  constructor(private readonly repo: TaskRepository) {}

  execute(id:UUID) {
    return this.repo.findOne(id);
  }
}
