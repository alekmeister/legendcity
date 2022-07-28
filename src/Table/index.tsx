import React from 'react';
import { TableHeader } from 'TableHeader';
import { TableBody } from 'TableBody/TableBody';

interface Props {
  cb: () => void;
}

export const Table: React.FC<Props> = ({ cb }) => {
  return (
    <table className="table">
      <TableHeader />
      <TableBody cb={cb} />
    </table>
  );
};
