import { GlobalContextProvider } from '../../core/providers/GlobalProvider';
import CreateTaskFormModal from './components/CreateTaskFormModal';
import ListTasksSection from './components/ListTasksSection';
import { Topbar } from './components/Topbar';

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
