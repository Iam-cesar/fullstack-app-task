import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { BASE_URL } from '../../../core/http/constants';
import { Task } from './task.interface';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
  httpClient = inject(HttpClient);
  tasks: Task[] = [];

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.httpClient
      .get<Task[]>(`${BASE_URL}/task`)
      .subscribe((data) => (this.tasks = data));
  }
}
