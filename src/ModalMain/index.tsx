import React, { useEffect, useRef } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { validPassword, validPhone } from 'RegularExpressions';
import { postUserServer } from 'store/users/actionCreators/postUser';
import cn from 'classnames';
import { REQUEST_STATUS } from 'types/RequestStatuses';
import Modal from 'modal/Modal';
import { useAppDispatch, useAppSelector } from 'store/types';
import { v4 as uuidv4 } from 'uuid';
import style from './ModalMain.module.scss';

interface props {
  setModalActive: (arg: boolean) => void;
  modalActive: boolean;
}
type userInfo = { name: string; placeholder: string };

const Info: userInfo[] = [
  { name: 'firstName', placeholder: 'Имя' },
  { name: 'secondName', placeholder: 'Фамилия' },
  { name: 'phone', placeholder: 'Телефон в формате +7' },
  { name: 'email', placeholder: 'E-mail' },
  { name: 'password', placeholder: 'Пароль' },
];

interface IForm {
  firstName: string;
  secondName: string;
  phone: string;
  email: string;
  password: string;
}

const FORM_VALUES: IForm = {
  firstName: '',
  secondName: '',
  phone: '',
  email: '',
  password: '',
};

export const ModalMain: React.FC<props> = ({ setModalActive, modalActive }) => {
  const closeModal = () => setModalActive(false);
  const ref = useRef<FormikProps<IForm>>(null);
  const dispatch = useAppDispatch();
  const creatingStatus = useAppSelector((state) => state.users.creatingStatus);

  useEffect(() => {
    if (creatingStatus === REQUEST_STATUS.SUCCESS) {
      closeModal();
    }
  }, [creatingStatus]);

  const switchBtnState = () => {
    switch (creatingStatus) {
      case REQUEST_STATUS.LOADING:
        return 'Отправляем';
      case REQUEST_STATUS.PENDING:
        return 'Отправить';
      case REQUEST_STATUS.SUCCESS:
        return 'Отправлено';
      case REQUEST_STATUS.ERROR:
        return 'Ошибка отправки, попробуйте позже';
      default:
        return 'Отправить';
    }
  };

  const handleResetForm = () => {
    ref?.current?.resetForm();
  };

  if (!modalActive) return null;

  return (
    <Modal active={modalActive} setActive={setModalActive} cb={handleResetForm}>
      <Formik
        initialValues={FORM_VALUES}
        validationSchema={Yup.object({
          firstName: Yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
          secondName: Yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
          phone: Yup.string().matches(validPhone, 'Неверный номер').required('Обязательное поле'),
          email: Yup.string().email('Неправильный email').required('Обязательное поле'),
          password: Yup.string().matches(validPassword, 'Пароль должен быть на латинице, содержать не менее 8 символов, один в верхнем регистре, одну цифру и один символ').required('Обязательное поле'),
        })}
        onSubmit={(user, { resetForm }) => {
          dispatch(postUserServer(user));
          resetForm();
        }}
        innerRef={ref}
      >
        <Form className={style.form}>
          {Info.map(({ placeholder, name }) => (
            <div className={style.form_inner} key={uuidv4()}>
              <Field className={style.field} placeholder={placeholder} name={name} />
              <ErrorMessage className={style.valid} name={name} component="div" />
            </div>
          ))}
          <button className={cn(style.button, { disabled: creatingStatus === REQUEST_STATUS.LOADING })} type="submit" disabled={creatingStatus === REQUEST_STATUS.LOADING} onClick={() => switchBtnState()}>
            {switchBtnState()}
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};
