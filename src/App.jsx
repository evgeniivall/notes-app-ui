import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import PopulateStoreWithTestData from './tests/generateTestData';
import useTagProcessing from './features/tags/useTagsProcessing';
import ErrorPage from './pages/Errorpage';
import NotesDisplay from './features/notes/NotesDisplay';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/notes" />,
      },
      {
        path: '/notes',
        element: <NotesDisplay />,
      },
      {
        path: '/notes/:noteId',
        element: <NotesDisplay />,
      },
      {
        path: '/testData',
        element: <PopulateStoreWithTestData />,
      },
    ],
  },
]);

function App() {
  useTagProcessing();

  return <RouterProvider router={router} />;
}

export default App;
