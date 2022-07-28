import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from 'store/types';
import style from './TableHeader.module.scss';

export const TableHeader: React.FC = () => {
  const users = useAppSelector((state) => state.users.users);
  const headerItems = users.length ? Object.keys(users[0]) : [];
  return (
    <thead className={style.header}>
      <tr className={style.thead_tr}>
        {headerItems.map((el) => (
          <th scope="col" key={uuidv4()}>
            {el}
          </th>
        ))}
      </tr>
    </thead>
  );
};
