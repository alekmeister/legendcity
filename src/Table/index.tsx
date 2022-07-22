import React from 'react';
import { TableHeader } from 'TableHeader';
import { TableBody } from 'TableBody/TableBody';

export const Table: React.FC = () => {
  return (
    <table className="table">
      <TableHeader />
      <TableBody />
    </table>
  );
};
