import { Suspense } from 'react';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage } from '../pages';
import { Loader } from '../components/common';
// @ts-ignore
import { useQuery } from 'react-query';
import { API } from '../apis';
import { useAppDispatch } from '../hooks';
import { setUser } from '../store/slices/auth';

export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
};

const ALL_ROUTES = [
  {
    name: 'Home',
    path: ROUTE_PATHS.HOME,
    component: <HomePage />,
    children: [
      {
        name: 'Login',
        path: ROUTE_PATHS.LOGIN,
        component: <LoginPage />,
      },
      {
        name: 'Register',
        path: ROUTE_PATHS.REGISTER,
        component: <RegisterPage />,
      },
    ],
  },
];

export default function Routes() {
  const dispatch = useAppDispatch();
  useQuery([API.AUTH.GET_ME.name, {}], API.AUTH.GET_ME, {
    onSuccess: ({ data }: any) => {
      dispatch(setUser(data));
    },
    onError: ({ data }: any) => {
      dispatch(setUser(null));
    },
  });

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ReactRoutes>
          {ALL_ROUTES.map((route) =>
            route?.children?.length ? (
              <Route key={route.name} path={route.path}>
                <Route index element={route.component} />
                {route.children.map((r) => (
                  <Route key={r.name} path={r.path} element={r.component} />
                ))}
              </Route>
            ) : (
              <Route
                key={route.name}
                path={route.path}
                element={route.component}
              />
            ),
          )}
        </ReactRoutes>
      </Suspense>
    </BrowserRouter>
  );
}
