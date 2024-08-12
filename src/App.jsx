import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import NotesList from './features/notes/NotesList';
import Note from './features/notes/Note';
import PopulateStoreWithTestData from './tests/generateTestData';
import useTagProcessing from './features/tags/useTagsProcessing';
import ErrorPage from './pages/Errorpage';

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
        element: <NotesList />,
      },
      {
        path: '/notes/:id',
        element: <Note />,
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
