import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/types';
import { getUsers } from 'store/users/actionCreators/getUsers';
import { Table } from 'Table';
import { ModalMain } from 'ModalMain';
import { Button } from 'UIkit/Button/';
import 'App.scss';
import { REQUEST_STATUS } from 'types/RequestStatuses';
import { setOpenModal, setPage } from 'store/users/slice';
import { ReactComponent as Loader } from './preloader/preloader.svg';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { status: tableLoadingStatus, page, isOpenModal } = useAppSelector((state) => state.users);
  const isLoading = tableLoadingStatus === REQUEST_STATUS.LOADING;

  const getMoreUsers = () => {
    const nextPage = page + 1;
    dispatch(setPage(nextPage));
    dispatch(getUsers({ page: nextPage }));
  };

  const setModalStatus = (status: boolean) => {
    dispatch(setOpenModal(status));
  };

  useEffect(() => {
    dispatch(getUsers({ page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Button disabled={isLoading} setModalActive={setModalStatus} modalActive={isOpenModal} />
      <Table cb={getMoreUsers} />
      {isLoading && <Loader />}
      {isOpenModal && <ModalMain modalActive={isOpenModal} setModalActive={setModalStatus} />}
    </div>
  );
};

export default App;
