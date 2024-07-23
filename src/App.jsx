import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import MainLayout from './pages/MainLayout';
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
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
