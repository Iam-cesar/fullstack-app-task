import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RepositoryResponseInterface } from '../../core/shared/types/repository-response.interface';
import { Task } from './task.interface';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  httpClient = inject(HttpClient);
  tasks: Task[] = [];

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.httpClient
      .get<RepositoryResponseInterface<Task[]>>('http://localhost:3000/task')
      .subscribe(({ data }) => {
        this.tasks = data;
      });
  }
}
