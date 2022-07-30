import { Link, useNavigate } from 'react-router-dom';
import { Button, Group, Input, Layout, Text } from '../components/common';
import { ROUTE_PATHS } from '../routes';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { promisedToast } from '../lib/toast';
// @ts-ignore
import { useMutation } from 'react-query';
import { API } from '../apis';
import { LoginValues } from '../apis/auth';
import { useAppDispatch } from '../hooks';
import { setUser } from '../store/slices/auth';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: yupResolver(schema),
  });
  const { mutateAsync: handleUserLogin, isLoading } = useMutation(
    API.AUTH.LOGIN_USER,
  );
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(
    async (formValues: LoginValues) => {
      try {
        const res: any = await promisedToast(handleUserLogin(formValues));
        localStorage.setItem('tid', res.data?.token);
        dispatch(setUser(res.data?.user));
        navigate(ROUTE_PATHS.HOME);
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch, handleUserLogin, navigate],
  );

  return (
    <Layout route_type="public" width="clamp(40rem, 10vw, 100%)">
      <form onSubmit={handleSubmit(handleLogin)} className="auth">
        <Group direction="column" spacing="1rem">
          <Input
            placeholder="Enter email"
            {...register('email')}
            error={errors?.email?.message}
          />
          <Input
            type="password"
            placeholder="Passcode"
            {...register('password')}
            error={errors?.password?.message}
          />
          <Button
            type="submit"
            variant="primary"
            full
            style={{ marginTop: '1rem' }}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </Button>
        </Group>
        <Text size="sm" center style={{ margin: '2rem 0 0 0' }}>
          <>Don't have an account? </>
          <Link to={ROUTE_PATHS.REGISTER}>Register Now</Link>
        </Text>
      </form>
    </Layout>
  );
}
