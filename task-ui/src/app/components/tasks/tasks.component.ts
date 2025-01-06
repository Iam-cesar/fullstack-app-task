import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { BASE_URL } from '../../../core/http/constants';
import { APIResponse } from '../../../core/interfaces/ApiResponseDto';
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
      .get<APIResponse<Task>>(`${BASE_URL}/task?order=asc`)
      .subscribe((data) => (this.tasks = data.data));
  }
}
