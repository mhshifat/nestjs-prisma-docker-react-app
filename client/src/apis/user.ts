import { http } from "../lib/axios"

export interface CreateUserValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const CREATE_USER = (values: CreateUserValues) => {
  return http({
    method: "POST",
    url: "/users",
    data: values,
  })
}