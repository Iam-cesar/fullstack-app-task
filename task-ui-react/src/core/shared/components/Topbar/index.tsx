import { useCallback } from 'react';
import useGlobalContext from '../../../../core/hooks/useGlobalContext';
import CreateTaskButton from '../Button';

export const Topbar = () => {
  const { updateGlobalState, isCreateTaskModalOpen } = useGlobalContext();

  const closeModal = useCallback(() => {
    updateGlobalState('isCreateTaskModalOpen', false);
  }, [updateGlobalState]);

  const handleCreateTaskButton = useCallback(
    () => updateGlobalState('isCreateTaskModalOpen', !isCreateTaskModalOpen),
    [updateGlobalState, isCreateTaskModalOpen],
  );

  return (
    <header className="bg-white shadow-md z-20 relative">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600" href="">
          <h1 className="sr-only ">Home</h1>
        </a>

        <div className="flex flex-1 items-center justify-between">
          <nav aria-label="Global">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <button
                  className="text-gray-500 transition hover:text-gray-500/75"
                  onClick={closeModal}
                >
                  Tarefas
                </button>
              </li>
            </ul>
          </nav>

          <CreateTaskButton onClick={handleCreateTaskButton}>
            Criar tarefa
          </CreateTaskButton>
        </div>
      </div>
    </header>
  );
};
