import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Page, User } from 'store/users/types';
import { SLICE_NAME } from 'store/users/constants';

const LIMIT = 25;

export const getUsers = createAsyncThunk<User[], Page>(`${SLICE_NAME}/fetchUsers`, async ({ page, limit = LIMIT }) => {
  try {
    const response = await axios.get(`https://62b0b45e196a9e9870296581.mockapi.io/users/?p=${page}&l=${limit}`);
    const data: User[] = await response.data;
    return data;
  } catch (e) {
    throw new Error('Ошибка загрузки пользователей');
  }
});
