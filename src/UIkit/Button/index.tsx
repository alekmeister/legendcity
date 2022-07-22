import React from 'react';
import cn from 'classnames';
import style from './Button.module.scss';

interface props {
  setModalActive: (arg: boolean) => void;
  modalActive: boolean;
}

export const Button: React.FC<props> = ({ setModalActive, modalActive }) => {
  return (
    <div className={style.btn}>
      <button type="button" data-testid="addNewUser-btn" className={cn(style.button, { [style.button_disabled]: modalActive })} onClick={() => setModalActive(true)}>
        Добавить
      </button>
    </div>
  );
};
