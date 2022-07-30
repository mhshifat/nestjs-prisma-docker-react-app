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
import { CreateUserValues } from '../apis/user';

const schema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserValues>({
    resolver: yupResolver(schema),
  });
  const { mutateAsync: handleUserRegistration, isLoading } = useMutation(
    API.USER.CREATE_USER,
  );

  const handleRegistration = useCallback(
    async (formValues: CreateUserValues) => {
      try {
        await promisedToast(handleUserRegistration(formValues));
        navigate(ROUTE_PATHS.LOGIN);
      } catch (err) {
        console.error(err);
      }
    },
    [handleUserRegistration, navigate],
  );

  return (
    <Layout
      route_type="public"
      width="clamp(40rem, 10vw, 100%)"
      title="Register"
      description="Hey, Enter your details to sign up for an account"
    >
      <form onSubmit={handleSubmit(handleRegistration)} className="auth">
        <Group direction="column" spacing="1rem">
          <Group direction="row" spacing="1rem">
            <Input
              placeholder="First Name"
              {...register('first_name')}
              error={errors?.first_name?.message}
            />
            <Input
              placeholder="Last Name"
              {...register('last_name')}
              error={errors?.last_name?.message}
            />
          </Group>
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
            {isLoading ? 'Loading...' : 'Sign Up'}
          </Button>
        </Group>
        <Text size="sm" center style={{ margin: '2rem 0 0 0' }}>
          <>Already have an account? </>
          <Link to={ROUTE_PATHS.LOGIN}>Login</Link>
        </Text>
      </form>
    </Layout>
  );
}
