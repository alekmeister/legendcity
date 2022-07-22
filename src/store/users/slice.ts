import { REQUEST_STATUS } from 'types/RequestStatuses';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from 'store/users/constants';
import type { State } from 'store/users/types';
import { getUsers } from 'store/users/actionCreators/getUsers';
import { postUserServer } from 'store/users/actionCreators/postUser';

const getInitialState = (): State => ({
  users: [],
  status: REQUEST_STATUS.PENDING,
  creatingStatus: REQUEST_STATUS.PENDING,
});

const slice = createSlice({
  name: SLICE_NAME,
  initialState: getInitialState(),
  reducers: {
    setCreatingStatus: (state, action: PayloadAction<REQUEST_STATUS>) => {
      state.creatingStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Получение пользователей
    builder.addCase(getUsers.pending, (state) => {
      state.status = REQUEST_STATUS.LOADING;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = REQUEST_STATUS.SUCCESS;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.status = REQUEST_STATUS.ERROR;
    });
    // Создание строки
    builder.addCase(postUserServer.pending, (state) => {
      state.creatingStatus = REQUEST_STATUS.LOADING;
    });
    builder.addCase(postUserServer.fulfilled, (state, action) => {
      state.users = [...state.users, action.payload];
      state.creatingStatus = REQUEST_STATUS.SUCCESS;
    });
    builder.addCase(postUserServer.rejected, (state) => {
      state.creatingStatus = REQUEST_STATUS.ERROR;
    });
  },
});
export const { setCreatingStatus } = slice.actions;
export default slice.reducer;
