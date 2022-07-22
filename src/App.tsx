import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/types';
import { getUsers } from 'store/users/actionCreators/getUsers';
import { Table } from 'Table';
import { ModalMain } from 'ModalMain';
import { Button } from 'UIkit/Button/';
import 'App.scss';
import { REQUEST_STATUS } from 'types/RequestStatuses';
import { Preloader } from 'preloader/Preloader';

const App: React.FC = () => {
  const [modalActive, setModalActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // У апишки нету параметра offset, поэтому реализация через page
  const dispatch = useAppDispatch();
  const tableLoadingStatus = useAppSelector((state) => state.users.status);
  const isLoading = tableLoadingStatus === REQUEST_STATUS.LOADING;
  useEffect(() => {
    dispatch(getUsers({ page: currentPage }));
  }, []);
  return (
    <div className="App">
      <Button setModalActive={setModalActive} modalActive={modalActive} />
      {isLoading ? <Preloader /> : <Table />}
      <ModalMain modalActive={modalActive} setModalActive={setModalActive} />
    </div>
  );
};

export default App;
