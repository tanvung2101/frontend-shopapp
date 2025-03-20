import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import Login from './pages/login';
import AuthHeader from './components/AuthHeader';
import Register from './pages/register';
import ForgotPassword from './pages/forgot-password';
import RestPassword from './pages/reset-password';
import MainLayout from './components/MainLayout';
import HomePage from './pages/home/HomePage';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function NotRequireAuth() {
  const { token } = useSelector((state: RootState) => state.account);
  const location = useLocation();

  if (token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet/>;
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
    },
    {
      path: "",
      element: (<NotRequireAuth/>),
      children: [
        {
          path: "/login",
          element: (
            <AuthHeader>
              <Login />
            </AuthHeader>
          ),
        },
        {
          path: "/register",
          element: (
            <AuthHeader>
              <Register />
            </AuthHeader>
          ),
        },
      ],
    },
    {
      path: "/forgot-password",
      element: (
        <AuthHeader>
          <ForgotPassword />
        </AuthHeader>
      ),
    },
    {
      path: "/reset-password",
      element: (
        <AuthHeader>
          <RestPassword />
        </AuthHeader>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
