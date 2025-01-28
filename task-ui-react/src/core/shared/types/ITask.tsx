export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatusKey;
  createdAt: string;
  updatedAt: string;
}

export interface TaskPayload {
  title: string;
  description: string;
}

export enum TaskStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
}

export type TaskStatusKey = keyof typeof TaskStatus;
