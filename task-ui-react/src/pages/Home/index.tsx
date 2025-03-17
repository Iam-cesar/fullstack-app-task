import { GlobalContextProvider } from '../../core/providers/GlobalProvider';
import CreateTaskFormModal from '../../core/shared/components/CreateTaskFormModal';
import ListTasksSection from '../../core/shared/components/ListTasksSection';
import { Topbar } from '../../core/shared/components/Topbar';

const Home = () => {
  return (
    <GlobalContextProvider>
      <section>
        <Topbar />

        <CreateTaskFormModal />

        <ListTasksSection />
      </section>
    </GlobalContextProvider>
  );
};

export default Home;
