import {
  Button,
  Group,
  Input,
  Layout,
  Loader,
  Modal,
  Select,
  Table,
  Text,
} from '../components/common';
import {
  BsChevronLeft,
  BsChevronRight,
  BsPencil,
  BsSearch,
  BsTrash,
} from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
// @ts-ignore
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { API } from '../apis';
import { useAppDispatch, useAppSelector, useDebounce } from '../hooks';
import { useCallback, useState } from 'react';
import CreateEditMovie from '../components/modals/CreateEditMovie/CreateEditMovie';
import { promisedToast } from '../lib/toast';
import { FaPowerOff } from 'react-icons/fa';
import { setUser } from '../store/slices/auth';

export interface Movie {
  id: string;
  name: string;
  genra: string;
  created_at: string;
}

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | null>(null);
  const user = useAppSelector((state) => state.auth.user);
  const initialized = useAppSelector((state) => state.auth.initialized);
  const [sort, setSort] = useState('created_at|desc');
  const debouncedValue = useDebounce<string>(search || '', 500);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { mutateAsync: handleDeleteMovie } = useMutation(
    API.MOVIE.DELETE_MOVIE,
  );
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const {
    data: moviesData,
    isFetching,
    error,
  } = useQuery(
    [
      API.MOVIE.GET_MOVIES.name,
      {
        page,
        ...(debouncedValue ? { search: debouncedValue } : {}),
        ...(sort ? { sort } : {}),
      },
    ],
    API.MOVIE.GET_MOVIES,
    {
      enabled: !!user?.id && initialized,
    },
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await promisedToast(
          handleDeleteMovie({
            id: id,
          }),
        );
        await queryClient.refetchQueries([API.MOVIE.GET_MOVIES.name, {}]);
      } catch (err) {
        console.error(err);
      }
    },
    [handleDeleteMovie, queryClient],
  );

  const handleLogout = useCallback(async () => {
    try {
      localStorage.removeItem('tid');
      dispatch(setUser(null));
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  if (isFetching) return <Loader />;
  if (error) return <div className="error">{error}</div>;
  return (
    <Layout
      route_type="private"
      width="clamp(70rem, 10vw, 100%)"
      title={
        <Text size="xl">
          <>🦄</>
        </Text>
      }
      description="Document your Favourite Movies"
    >
      <div className="home">
        <Group direction="row" justify="space-between">
          <Input
            placeholder="Search..."
            defaultValue={debouncedValue || ''}
            onChange={({ target }) => setSearch(target.value)}
            width={200}
            icon={<BsSearch />}
          />

          <Select
            width="200px"
            defaultValue={sort}
            onChange={({ target }) => setSort(target.value)}
            options={[
              { label: 'Latest', value: 'created_at|desc' },
              { label: 'Oldest', value: 'created_at|asc' },
              { label: 'Name (A - Z)', value: 'name|asc' },
              { label: 'Name (Z - A)', value: 'name|desc' },
              { label: 'Gnera (A - Z)', value: 'genra|asc' },
              { label: 'Gnera (Z - A)', value: 'genra|desc' },
            ]}
          />
          <Modal
            title="Add Favourite Movie"
            description="Fill up the forms to add your favourite movie"
            body={({ setOpen }) => (
              <CreateEditMovie onClose={() => setOpen(false)} />
            )}
          >
            <Button
              variant="primary"
              style={{ height: '40px', width: '40px', padding: '0 10px' }}
            >
              <AiOutlinePlus />
            </Button>
          </Modal>
          <Button
            variant="primary"
            style={{ height: '40px', width: '40px', padding: '0 10px' }}
            onClick={handleLogout}
          >
            <FaPowerOff />
          </Button>
        </Group>

        <Table
          headers={[
            { name: 'Name', key: 'name', width: '100%', align: 'left' },
            { name: 'Genra', key: 'genra', width: '100%', align: 'left' },
          ]}
          data={moviesData?.data?.items?.map((item: Movie) => ({
            ...item,
            components: {
              ...item,
            },
          }))}
          quickActions={[
            {
              name: (
                <Group direction="row" spacing="1rem">
                  <BsPencil />
                  <span>Edit</span>
                </Group>
              ) as any,
              onClick: (data) => setSelectedMovie(data),
            },
            {
              name: (
                <Group direction="row" spacing="1rem">
                  <BsTrash />
                  <span>Delete</span>
                </Group>
              ) as any,
              onClick: (data) => handleDelete(data.id),
            },
          ]}
        />

        <ReactPaginate
          forcePage={moviesData?.data?.page_info?.current_page - 1}
          breakLabel="..."
          nextLabel={<BsChevronRight />}
          onPageChange={(newPage) => setPage(+newPage.selected + 1)}
          pageRangeDisplayed={5}
          pageCount={moviesData?.data?.page_info?.total_page}
          previousLabel={<BsChevronLeft />}
          className="pagination"
        />

        <Modal
          open={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
          title="Edit Movie"
          description="Change form values update this favourite movie"
          body={({ setOpen }) => (
            <CreateEditMovie
              defaultValue={selectedMovie}
              onClose={() => setSelectedMovie(null)}
            />
          )}
        />
      </div>
    </Layout>
  );
}
