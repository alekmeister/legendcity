import { REQUEST_STATUS } from 'types/RequestStatuses';

export interface User {
  id?: string;
  firstName: string;
  secondName: string;
  phone: string;
  email: string;
  password: string;
}

export interface State {
  users: User[];
  status: REQUEST_STATUS;
  creatingStatus: REQUEST_STATUS;
}

export type Page = { page: number };
