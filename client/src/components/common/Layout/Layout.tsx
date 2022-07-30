import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { ROUTE_PATHS } from '../../../routes';
import Loader from '../Loader/Loader';
import styles from './Layout.module.css';

interface LayoutProps {
  route_type?: 'private' | 'public';
  width?: string;
  title?: string | JSX.Element;
  description?: string;
  children?: ReactElement | ReactElement[];
}

export default function Layout({
  width,
  route_type,
  title = 'Login',
  description = 'Hey, Enter your details to get signin to your account',
  children,
}: LayoutProps) {
  const initialized = useAppSelector((state) => state.auth.initialized);
  const user = useAppSelector((state) => state.auth.user);

  if (!initialized) return <Loader />;
  if (route_type === 'private' && !user?.id)
    return <Navigate to={ROUTE_PATHS.LOGIN} />;
  if (route_type === 'public' && user?.id)
    return <Navigate to={ROUTE_PATHS.HOME} />;
  return (
    <div className={styles.layout}>
      {typeof title === 'string' ? <h2>{title}</h2> : title}
      <p>{description}</p>

      <div className={styles.container} style={{ width }}>
        {children}
      </div>
    </div>
  );
}
