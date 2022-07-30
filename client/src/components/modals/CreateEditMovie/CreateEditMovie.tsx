import styles from './CreateEditMovie.module.css';
import { Button, Group, Input } from './../../common';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
// @ts-ignore
import { useMutation, useQueryClient } from 'react-query';
import { CreateMovieValues } from '../../../apis/movie';
import { promisedToast } from '../../../lib/toast';
import { API } from '../../../apis';

const schema = yup.object().shape({
  name: yup.string().required(),
  genra: yup.string().required(),
});

export default function CreateEditMovie({ onClose, defaultValue }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateMovieValues>({
    resolver: yupResolver(schema),
  });
  const { mutateAsync: handleCreateMovie, isLoading } = useMutation(
    API.MOVIE.CREATE_MOVIE,
  );
  const { mutateAsync: handleUpdateMovie, isLoading: isLoadingUpdate } =
    useMutation(API.MOVIE.UPDATE_MOVIE);
  const queryClient = useQueryClient();

  const handleCreateMovieFn = useCallback(
    async (formValues: CreateMovieValues) => {
      try {
        await promisedToast(handleCreateMovie(formValues));
        await queryClient.refetchQueries([API.MOVIE.GET_MOVIES.name, {}]);
        onClose?.();
      } catch (err) {
        console.error(err);
      }
    },
    [handleCreateMovie, onClose, queryClient],
  );

  const handleUpdateMovieFn = useCallback(
    async (formValues: CreateMovieValues) => {
      try {
        await promisedToast(
          handleUpdateMovie({
            id: defaultValue?.id,
            values: formValues,
          }),
        );
        await queryClient.refetchQueries([API.MOVIE.GET_MOVIES.name, {}]);
        onClose?.();
      } catch (err) {
        console.error(err);
      }
    },
    [defaultValue?.id, handleUpdateMovie, onClose, queryClient],
  );

  useEffect(() => {
    if (!defaultValue) return;
    reset(defaultValue);
  }, [defaultValue, reset]);

  return (
    <form
      onSubmit={handleSubmit(
        defaultValue ? handleUpdateMovieFn : handleCreateMovieFn,
      )}
      className={styles.createEditMovie}
    >
      <Group direction="column" spacing="1rem">
        <Input
          placeholder="Enter name"
          {...register('name')}
          error={errors?.name?.message}
        />
        <Input
          placeholder="Enter genra"
          {...register('genra')}
          error={errors?.genra?.message}
        />
        <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
          {isLoading || isLoadingUpdate
            ? 'Loading...'
            : defaultValue
            ? 'Update'
            : 'Create'}
        </Button>
      </Group>
    </form>
  );
}
