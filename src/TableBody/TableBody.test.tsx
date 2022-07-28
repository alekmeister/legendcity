// @ts-ignore
import { jest } from '@jest/globals';
import { TableBody } from 'TableBody/TableBody';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';

const users = [
  {
    id: '1',
    firstName: 'Сергей',
    secondName: 'Валов',
    phone: '+79524216936',
    email: 'val321@mail.ru',
    password: '147852963.Qwe',
  },
  {
    id: '2',
    firstName: 'Иван',
    secondName: 'Архипов',
    phone: '+79528529647',
    email: 'ivan321q@mail.ru',
    password: '147852963.Qwe',
  },
];
jest.mock('react-redux');
const mokedUseSelector = jest.spyOn(reduxHooks, 'useSelector');
describe('TableBody', () => {
  it('should create TableBody with empty users', () => {
    mokedUseSelector.mockReturnValue([]);
    const component = render(<TableBody />);
    expect(component).toMatchSnapshot();
  });
  it('should create TableBody with users', () => {
    mokedUseSelector.mockReturnValue(users);
    const component = render(<TableBody />);
    expect(component).toMatchSnapshot();
  });
});
