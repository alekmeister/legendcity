import React from 'react';
import cn from 'classnames';
import style from './Button.module.scss';

interface Props {
  setModalActive: (arg: boolean) => void;
  modalActive: boolean;
  disabled: boolean;
}

export const Button: React.FC<Props> = ({ setModalActive, modalActive, disabled }) => {
  return (
    <div className={style.btn}>
      <button type="button" disabled={disabled} data-testid="addNewUser-btn" className={cn(style.button, { [style.button_disabled]: modalActive || disabled })} onClick={() => setModalActive(true)}>
        Добавить
      </button>
    </div>
  );
};
