import { initialGlobalState } from '../../states/initialGlobalState';
import { Task } from './ITask';

export interface IGlobalContextProps {
  tasks: Task[];
  isCreateTaskModalOpen: boolean;
  updateGlobalState: (key: TInitialGlobalContextKeys, value: unknown) => void;
}

export type TInitialGlobalContextKeys = keyof typeof initialGlobalState;

export interface IApiResponse<T> {
  meta: {
    page: number;
    take: number;
    items_count: number;
    page_count: number;
    has_previous_page: boolean;
    has_next_page: boolean;
  };
  data: T;
}
