import { http } from "../lib/axios"

export interface CreateMovieValues {
  name: string;
  genra: string;
}

export const CREATE_MOVIE = (values: CreateMovieValues) => {
  return http({
    method: "POST",
    url: "/movies",
    data: values,
  })
}

export const UPDATE_MOVIE = ({ id, values }: any) => {
  return http({
    method: "PATCH",
    url: `/movies/${id}`,
    data: values,
  })
}

export const DELETE_MOVIE = ({ id }: any) => {
  return http({
    method: "DELETE",
    url: `/movies/${id}`,
  })
}

export const GET_MOVIES = ({ queryKey }: any) => {
  const [, args] = queryKey;
  return http({
    method: "GET",
    url: "/movies",
    params: args,
  })
}