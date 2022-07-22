import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from 'store/types';

export const TableBody: React.FC = () => {
  const data = useAppSelector((state) => state.users.users);
  return (
    <tbody>
      {data.map((user) => (
        <tr className="tbody_tr" key={uuidv4()}>
          {(Object.keys(user) as (keyof typeof user)[]).map((key) => (
            <td className="tbody_td" key={uuidv4()}>
              {user[key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
