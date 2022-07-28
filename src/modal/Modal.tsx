import React from 'react';
import cn from 'classnames';
import style from './Modal.module.scss';

type Props = {
  active: boolean;
  setActive: (arg: boolean) => void;
  children: React.ReactNode;
  cb?: () => void;
};
const Modal: React.FC<Props> = ({ active, setActive, children, cb }) => {
  const handleCloseModal = () => {
    setActive(false);
    if (cb) {
      cb();
    }
  };
  return (
    <div role="presentation" className={cn(style.modal, { [style.modal_active]: active })} onClick={handleCloseModal}>
      <div role="presentation" className={cn(style.content, { [style.content_active]: active })} onClick={(e) => e.stopPropagation()}>
        {children && children}
      </div>
    </div>
  );
};

export default Modal;
