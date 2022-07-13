import {REQUEST_STATUS} from 'types/RequestStatuses';
import {createSlice} from '@reduxjs/toolkit';
import {SLICE_NAME} from "store/users/constants";
import {State} from "store/users/types";
import {getUsers} from "store/users/actionCreators/getUsers";

const getInitialState = (): State => ({
    users:[],
    status: REQUEST_STATUS.PENDING,
});

const slice = createSlice({
    name: SLICE_NAME,
    initialState: getInitialState(),
    reducers: {},
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
    },
});

export const {} = slice.actions;
export default slice.reducer;
