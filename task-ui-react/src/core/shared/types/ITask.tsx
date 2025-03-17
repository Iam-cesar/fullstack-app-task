export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatusKey;
  created_at: string;
  updated_at: string;
}

export interface TaskPayload {
  title: string;
  description: string;
}

export enum TaskStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
}

export interface IGetTaskParams {
  orderBy?: keyof Task;
  order?: 'ASC' | 'DESC' | 'asc' | 'desc' | -1 | 1;
  page?: number;
  per_page?: number;
  status?: TaskStatus;
}

export type TaskStatusKey = 'completed' | 'pending' | 'inProgress';
