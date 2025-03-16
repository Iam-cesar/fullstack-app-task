import { IApiResponse } from '../../core/shared/types/IGlobalTypes';
import { Task, TaskPayload } from '../../core/shared/types/ITask';
import { httpClient } from '../http';

const objectToReturn: IApiResponse<Task[]> = {
  meta: {
    page: 0,
    take: 0,
    items_count: 0,
    page_count: 0,
    has_previous_page: false,
    has_next_page: false,
  },
  data: [],
  links: {
    first_page: '',
    last_page: '',
    previous_page_link: '',
    next_page_link: '',
  },
};

export const taskService = {
  getTasks: async (
    orderBy?: keyof Task,
    order?: 'ASC' | 'DESC' | 'asc' | 'desc' | -1 | 1,
    page?: number,
    per_page?: number,
  ): Promise<IApiResponse<Task[]>> => {
    const {
      data: { data, meta },
    } = await httpClient.get<IApiResponse<Task[]>>('/task', {
      params: {
        orderBy,
        order,
        page,
        per_page,
      },
    });

    objectToReturn.data = data;
    objectToReturn.meta = meta;

    return objectToReturn;
  },

  postTask: async (payload: TaskPayload): Promise<Task> => {
    const { data } = await httpClient.post<Task>('/task', payload);
    return data;
  },

  patchTask: async (payload: Task): Promise<Task> => {
    const { data } = await httpClient.post<Task>('/task', payload);
    return data;
  },
};
