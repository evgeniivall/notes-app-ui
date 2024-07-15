import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import MainLayout from './MainLayout';
import NotesList from './notes/NotesList';
import Note from './notes/Note';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
