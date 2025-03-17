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
  const { usePostTask } = useTaskService();
  const { isCreateTaskModalOpen, updateGlobalState } = useGlobalContext();

  const { mutateAsync, isPending } = usePostTask();

  const [payload, setPayload] = useState<TaskPayload>(initialPayloadValue);

  const showCreateFormModal =
    !isCreateTaskModalOpen && 'opacity-0 pointer-events-none -z-10 ';

  const isPayloadTitleLengthValid = payload.title.length > MIN_VALID_LENGTH;
  const isPayloadDescriptionLengthValid =
    payload.description.length > MIN_VALID_LENGTH;

  const isPayloadValid =
    isPayloadTitleLengthValid && isPayloadDescriptionLengthValid;

  const clearInputValue = useCallback(
    () => setPayload(initialPayloadValue),
    [],
  );

  const onFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await mutateAsync(payload);
      clearInputValue();
    },
    [mutateAsync, payload, clearInputValue],
  );

  const closeModal = useCallback(() => {
    updateGlobalState('isCreateTaskModalOpen', false);
    clearInputValue();
  }, [updateGlobalState, clearInputValue]);

  return {
    showCreateFormModal,
    isPayloadValid,
    isPending,
    payload,
    onFormSubmit,
    setPayload,
    closeModal,
  };
};

export default useCreateTaskFormModal;
