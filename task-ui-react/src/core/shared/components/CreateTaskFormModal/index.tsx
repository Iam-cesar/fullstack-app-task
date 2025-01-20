import { useCallback, useState } from 'react';
import useGlobalContext from '../../../../core/hooks/useGlobalContext';
import useTaskService from '../../../../core/shared/hooks/useTaskService';
import { TaskPayload } from '../../../../core/shared/types/ITask';
import Button from '../Button';

const MIN_VALID_LENGTH = 4;
const initialPayloadValue = {
  description: '',
  title: '',
};
const CreateTaskFormModal = () => {
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

  return (
    <div
      className={`${showCreateFormModal} mt-1 z-20 absolute top-16 left-0 bg-white size-full transition mx-auto  px-4 py-16 sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Crie uma nova tarefa!
        </h1>

        <p className="mt-4 text-gray-500">
          Certifique-se de que o título e a descrição da tarefa tenham pelo
          menos 5 caracteres.
        </p>
      </div>

      <form
        action="#"
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        onSubmit={onFormSubmit}
      >
        <input
          type="text"
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Task title"
          value={payload.title}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <textarea
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Task description"
          value={payload.description}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, description: e.target.value }))
          }
        />

        <div className="flex items-center justify-end">
          <Button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white relative"
            disabled={isLoading.CREATING || !isPayloadValid}
          >
            criar tarefa
            {isLoading.CREATING ? (
              <span className="absolute size-5 rounded-full block border-4 bg-white border-black border-e-transparent -top-2 -right-2 animate-spin" />
            ) : null}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskFormModal;
