import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import NotesList from './features/notes/NotesList';
import PopulateStoreWithTestData from './tests/generateTestData';
import useTagProcessing from './features/tags/useTagsProcessing';
import ErrorPage from './pages/Errorpage';
import NoteView from './features/notes/NoteView';

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
        path: '/notes/:noteId',
        element: <NoteView />,
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
