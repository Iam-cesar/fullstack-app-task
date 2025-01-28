import React, { useCallback, useState } from 'react';
import useGlobalContext from '../../../hooks/useGlobalContext';
import useTaskService from '../../hooks/useTaskService';
import { TaskPayload } from '../../types/ITask';

const MIN_VALID_LENGTH = 4;
const initialPayloadValue = {
  description: '',
  title: '',
};

const useCreateTaskFormModal = () => {
  const { postTask, isLoading } = useTaskService();
  const { isCreateTaskModalOpen, tasks, updateGlobalState } =
    useGlobalContext();

  const [payload, setPayload] = useState<TaskPayload>(initialPayloadValue);

  const showCreateFormModal =
    !isCreateTaskModalOpen && 'opacity-0 pointer-events-none -z-10 ';

  const isPayloadTitleLengthValid = payload.title.length > MIN_VALID_LENGTH;
  const isPayloadDescriptionLengthValid =
    payload.description.length > MIN_VALID_LENGTH;

  const isPayloadValid =
    isPayloadTitleLengthValid && isPayloadDescriptionLengthValid;

  const handleCreateTask = useCallback(
    async () => await postTask(payload),
    [payload, postTask],
  );

  const clearInputValue = useCallback(
    () => setPayload(initialPayloadValue),
    [],
  );

  const onFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const task = await handleCreateTask();
      if (task?.id) updateGlobalState('tasks', tasks.pending.concat(task));
      updateGlobalState('isCreateTaskModalOpen', false);
      clearInputValue();
    },
    [handleCreateTask, updateGlobalState, clearInputValue, tasks],
  );

  return {
    isLoading,
    showCreateFormModal,
    isPayloadValid,
    onFormSubmit,
    payload,
    setPayload,
  };
};

export default useCreateTaskFormModal;
