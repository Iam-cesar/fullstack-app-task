import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../persistence/task.repository.interface";

export class FindAlltaskUseCase {
  constructor(private readonly repo: TaskRepository) {}

  execute() {
    return this.repo.findAll();
  }
}
