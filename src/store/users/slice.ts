import { REQUEST_STATUS } from 'types/RequestStatuses';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from 'store/users/constants';
import type { State } from 'store/users/types';
import { getUsers } from 'store/users/actionCreators/getUsers';
// eslint-disable-next-line import/no-cycle
import { postUserServer } from 'store/users/actionCreators/postUser';

const getInitialState = (): State => ({
  users: [],
  status: REQUEST_STATUS.PENDING,
  creatingStatus: REQUEST_STATUS.PENDING,
  isEmptyMoreData: false,
  page: 1,
  isOpenModal: false,
});

const slice = createSlice({
  name: SLICE_NAME,
  initialState: getInitialState(),
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetState: () => {
      return getInitialState();
    },
  },
  extraReducers: (builder) => {
    // Получение пользователей
    builder.addCase(getUsers.pending, (state) => {
      state.status = REQUEST_STATUS.LOADING;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      if (action.payload.length) {
        state.users = [...state.users, ...action.payload];
        state.status = REQUEST_STATUS.SUCCESS;
      } else {
        state.status = REQUEST_STATUS.SUCCESS;
        state.isEmptyMoreData = true;
      }
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.status = REQUEST_STATUS.ERROR;
    });
    // Создание строки
    builder.addCase(postUserServer.pending, (state) => {
      state.creatingStatus = REQUEST_STATUS.LOADING;
    });
    builder.addCase(postUserServer.rejected, (state) => {
      state.creatingStatus = REQUEST_STATUS.ERROR;
    });
  },
});
export const { resetState, setPage, setOpenModal } = slice.actions;
export default slice.reducer;
