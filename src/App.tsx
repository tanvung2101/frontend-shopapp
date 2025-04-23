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
import path from './constants/path';
import ProductDetail from './pages/ProductDetail';
import UserLayout from './components/UserLayout/UserLayout';
import Profile from './pages/Profile/Profile';
import CartLayout from './components/CartLayout';
import Cart from './pages/Cart';
import ChangePassword from './pages/ChangePassword/index.ts/ChangePassword';
import HistoryPurchase from './pages/HistoryPurchase';

function NotRequireAuth() {
  const { token } = useSelector((state: RootState) => state.account);
  const location = useLocation();

  if (token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet/>;
}

function ProtectedRoute() {
  const { token } = useSelector((state: RootState) => state.account);
  console.log(token)
  return token ? <Outlet /> : <Navigate to={path.login} />;
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
      index: true,
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
