import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './TableHeader.module.scss';

const titles = ['#', 'Имя', 'Фамилия', 'Телефон', 'E-mail', 'Пароль'];

export const TableHeader: React.FC = () => {
  return (
    <thead className={style.header}>
      <tr className={style.thead_tr}>
        {titles.map((el) => (
          <th scope="col" key={uuidv4()}>
            {el}
          </th>
        ))}
      </tr>
    </thead>
  );
};
