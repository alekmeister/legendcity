import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {Page, User} from "store/users/types";
import {SLICE_NAME} from "store/users/constants";



export const getUsers = createAsyncThunk<User[], Page>(`${SLICE_NAME}/fetchUsers`, async ({ page }) => {
    try {
        const response = await axios.get(`https://62b0b45e196a9e9870296581.mockapi.io/users/?p=${page}&l=20`);
        return response.data;
    } catch (e) {
        throw new Error('Ошибка загрузки пользователей');
    }
});