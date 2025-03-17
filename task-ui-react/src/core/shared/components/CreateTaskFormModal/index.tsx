import Button from '../Button';
import useCreateTaskFormModal from './useCreateTaskFormModal';

const CreateTaskFormModal = () => {
  const {
    isPending,
    isPayloadValid,
    onFormSubmit,
    showCreateFormModal,
    payload,
    setPayload,
    closeModal,
  } = useCreateTaskFormModal();

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
          placeholder="Titulo da tarefa"
          value={payload.title}
          pattern=".{3,}"
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm invalid:outline-pink-500 invalid:text-pink-600"
          required
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <textarea
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm invalid:outline-pink-500 invalid:text-pink-600"
          placeholder="Descrição da tarefa"
          value={payload.description}
          minLength={3}
          required
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, description: e.target.value }))
          }
        />

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            className="inline-block rounded-lg px-5 py-3 text-sm font-medium text-white relative"
            disabled={isPending}
            onClick={closeModal}
          >
            Cancelar
            {isPending ? (
              <span className="absolute size-5 rounded-full block border-4 bg-white border-black border-e-transparent -top-2 -right-2 animate-spin" />
            ) : null}
          </Button>

          <Button
            type="submit"
            className="inline-block rounded-lg  px-5 py-3 text-sm font-medium text-white relative"
            disabled={isPending || !isPayloadValid}
          >
            criar tarefa
            {isPending ? (
              <span className="absolute size-5 rounded-full block border-4 bg-white border-black border-e-transparent -top-2 -right-2 animate-spin" />
            ) : null}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskFormModal;
