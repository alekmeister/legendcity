import { jest } from '@jest/globals';
import { TableBody } from 'TableBody/TableBody';
import { render } from '@testing-library/react';
import * as reduxHooks from 'react-redux';

jest.mock('react-redux');
const mokedUseSelector = jest.spyOn(reduxHooks, 'useSelector');
describe('TableBody', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver as any;
  });
  it('should create TableBody with empty users', () => {
    mokedUseSelector.mockReturnValue({ users: [] });
    const component = render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <table>
        {/* eslint-disable-next-line react/react-in-jsx-scope,@typescript-eslint/no-empty-function */}
        <TableBody cb={() => {}} />
      </table>
    );
    expect(component).toMatchSnapshot();
  });
  it('should create TableBody with users', () => {
    mokedUseSelector.mockReturnValue({ users: [] });
    const component = render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <table>
        {/* eslint-disable-next-line react/react-in-jsx-scope,@typescript-eslint/no-empty-function */}
        <TableBody cb={() => {}} />
      </table>
    );
    expect(component).toMatchSnapshot();
  });
});
