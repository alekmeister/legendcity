import { jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'store/users/types';
import { SLICE_NAME } from 'store/users/constants';
import { postUserServer } from 'store/users/actionCreators/postUser';

describe('post', () => {
  test('should pass', async () => {
    const user: User = {
      firstName: 'Сергей',
      secondName: 'Валов',
      phone: '+79524216936',
      email: 'val321@mail.ru',
      password: '147852963.Qwe',
    };
    const postSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: { user } });
    const store = configureStore({
      // eslint-disable-next-line default-param-last
      reducer(state = {}, action) {
        switch (action.type) {
          case `${SLICE_NAME}/postUser/fulfilled`:
            return action.payload;
          default:
            return state;
        }
      },
    });
    await store.dispatch(postUserServer(user));
    expect(postSpy).toBeCalledWith('https://62b0b45e196a9e9870296581.mockapi.io/users/', user);
    const state = store.getState();
    expect(state).toEqual({ user });
  });
});
