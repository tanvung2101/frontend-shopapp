import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from './pages/login';
import AuthHeader from './components/AuthHeader';
import Register from './pages/register';
import ForgotPassword from './pages/forgot-password';
import RestPassword from './pages/reset-password';
import MainLayout from './components/MainLayout';
import HomePage from './pages/home/HomePage';
import path from './constants/path';
import ProductDetail from './pages/ProductDetail';
import UserLayout from './components/UserLayout/UserLayout';
import Profile from './pages/Profile/Profile';
import CartLayout from './components/CartLayout';
import Cart from './pages/Cart';
import ChangePassword from './pages/ChangePassword/index.ts/ChangePassword';
import HistoryPurchase from './pages/HistoryPurchase';
import { useContext } from 'react';
import { AppContext } from './contexts/app.context';

function NotRequireAuth() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />;
}


function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
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
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          ),
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />,
            },
            {
              path: path.changePassword,
              element: <ChangePassword />,
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />,
            },
          ],
        },
      ],
    },
    {
      path: "",
      element: <NotRequireAuth />,
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
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
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
