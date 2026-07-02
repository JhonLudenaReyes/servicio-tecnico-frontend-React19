import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './auth-guard';
import LoginPage from '../pages/auth/login';
import DashboardLayout from '../layouts/dashboard-layout';
import DashboardPage from '../pages/dashboard';
import CiudadesPage from '../pages/ciudades';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/ordenes',
            element: <div>Módulo de Órdenes (En desarrollo)</div>,
          },
          {
            path: '/clientes',
            element: <div>Módulo de Clientes (En desarrollo)</div>,
          },
          {
            path: '/equipos',
            element: <div>Módulo de Equipos (En desarrollo)</div>,
          },
          {
            path: '/ciudades',
            element: <CiudadesPage />,
          },
          {
            path: '/configuracion',
            element: <div>Módulo de Configuración (En desarrollo)</div>,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
