import { IInitialGlobalProps } from '../shared/types/IGlobalTypes';

export const initialGlobalState: IInitialGlobalProps = {
  tasks: {
    completed: [],
    inProgress: [],
    pending: [],
  },
  isCreateTaskModalOpen: false,
};
