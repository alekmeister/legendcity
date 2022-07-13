import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {User} from "store/users/types";
import {SLICE_NAME} from "store/users/constants";

export const postUserServer = createAsyncThunk<string, User>(`${SLICE_NAME}/postUser`, async(newUser)=> {
    try {
       const response = await axios.post('https://62b0b45e196a9e9870296581.mockapi.io/users/', {...newUser})
        return response.data
    }
    catch (e) {
        throw new Error('Ошибка добавления пользователя')
    }
})