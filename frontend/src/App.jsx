import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Checkout from './pages/Checkout';
import Details from './pages/Details';
import Home from './pages/Home';
import Result from './pages/Result';

function App() {
 const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/details/:id",
          element: <Details />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/result",
          element: <Result />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
