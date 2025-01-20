export enum TaskEnumStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
}

export type TaskEnumKeys = keyof typeof TaskEnumStatus;
