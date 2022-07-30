import { lazy } from 'react';

export const HomePage = lazy(() => import('./Home'));
export const LoginPage = lazy(() => import('./Login'));
export const RegisterPage = lazy(() => import('./Register'));
