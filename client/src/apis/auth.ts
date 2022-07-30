import { http } from "../lib/axios"

export interface LoginValues {
  email: string;
  password: string;
}

export const LOGIN_USER = (values: LoginValues) => {
  return http({
    method: "POST",
    url: "/auth",
    data: values,
  })
}

export const GET_ME = ({ queryKey }: any) => {
  const [, args] = queryKey;
  return http({
    method: "GET",
    url: "/auth/me",
    params: args,
  })
}