import { initialGlobalState } from '../../states/initialGlobalState';
import { Task } from './ITask';

export interface IGlobalContextProps {
  tasks: IFilteredTaskPerStatus;
  isCreateTaskModalOpen: boolean;
  updateGlobalState: (key: TInitialGlobalContextKeys, value: unknown) => void;
}

export interface IInitialGlobalProps {
  tasks: IFilteredTaskPerStatus;
  isCreateTaskModalOpen: boolean;
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
  links: {
    first_page: string;
    last_page: string;
    previous_page_link: string;
    next_page_link: string;
  };
}

export interface IFilteredTaskPerStatus {
  completed: Task[];
  inProgress: Task[];
  pending: Task[];
}
