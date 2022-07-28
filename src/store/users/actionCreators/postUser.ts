import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'store/users/types';
import { SLICE_NAME } from 'store/users/constants';
// eslint-disable-next-line import/no-cycle
import { resetState, setOpenModal } from 'store/users/slice';
import { getUsers } from './getUsers';

export const postUserServer = createAsyncThunk<User, User>(`${SLICE_NAME}/postUser`, async (newUser, { dispatch }) => {
  try {
    const response = await axios.post('https://62b0b45e196a9e9870296581.mockapi.io/users/', { ...newUser });
    dispatch(resetState());
    dispatch(getUsers({ page: 1 }));
    dispatch(setOpenModal(false));
    return response.data;
  } catch (e) {
    throw new Error('Ошибка добавления пользователя');
  }
});
