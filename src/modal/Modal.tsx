import React from 'react';
import style from './Modal.module.scss'
import cn from 'classnames';

type Props = {
    active: boolean
    setActive: (arg : boolean) => void
    children: any
}
const Modal: React.FC<Props> = ({active, setActive, children}) => {
    return (
        <div className={cn(style.modal, { [style.modal_active]: active })} onClick={()=> setActive(false)}>
            <div className={cn(style.content, { [style.content_active]: active })} onClick={(e)=> e.stopPropagation()}>{children}</div>

        </div>
    );
};

export default Modal;
