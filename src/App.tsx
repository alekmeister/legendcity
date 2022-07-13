import style from './App.scss'
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/types";
import {getUsers} from "store/users/actionCreators/getUsers";
import {v4 as uuidv4} from 'uuid';
import Modal from "modal/Modal";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {validPassword, validPhone} from "general/Variables";
import cn from "classnames";

type userInfo = {name: string, placeholder: string}

const Info: userInfo[] = [
    { name: 'firstName', placeholder: 'Имя' },
    { name: 'secondName', placeholder: 'Фамилия' },
    { name: 'phone', placeholder: 'Телефон в формате +7' },
    { name: 'email', placeholder: 'E-mail' },
    { name: 'password', placeholder: 'Пароль' }
];

const titles = ['#', 'Имя', 'Фамилия', 'Телефон', 'E-mail','Пароль' ]

const App: React.FC = () => {
  const [modalActive, setModalActive] = useState(true)
  // const [loadedUsers, setLoadedUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1); // У апишки нету параметра offset, поэтому реализация через page
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUsers({ page: currentPage }));
    // window.addEventListener('scroll', handleScroll)
  }, []);
  const data = useAppSelector((state) => state.users.users);

  // const loadMoreUsers = () => {
  //   setCurrentPage((currentPage)=> currentPage + 1)
  //   dispatch(getUsers({ page: currentPage }))
  // }
  // const handleScroll =  (e : any) =>  {
  //   if(window.innerHeight + e.target.documentElement.scrollTop >=  e.target.documentElement.scrollHeight) {
  //     loadMoreUsers()
  //
  //   }
  // }


  return (
    <div className="App">
      <div className="button" onClick={()=> setModalActive(true)}>
        <div className="button__text">Добавить</div>
        <div className="button__wrapper">
          <div className="button__arrow"></div>
          <div className="button__border-circle"></div>
          <div className="button__mask-circle">
            <div className="button__small-circle"></div>
          </div>
        </div>
      </div>

      <table className="table">
        <thead className='header'>
        <tr>
          {titles.map((el) => (<th scope="col" key={uuidv4()}>{el}</th>))}
        </tr>
        </thead>
        <tbody>
          {data.map(({id, firstName, secondName, email, password, phone})=>(
              <tr key={uuidv4()}>
                <th scope="row">{id}</th>
                <td>{secondName}</td>
                <td>{firstName}</td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>{password}</td>
              </tr>
          ))}
        </tbody>
      </table>
      <Modal active={modalActive} setActive={setModalActive}>
        <Formik
            initialValues={{
              firstName: '',
              secondName: '',
              phone: '',
              email: '',
                password: '',
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
              secondName: Yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
              phone: Yup.string().matches(validPhone, 'Неверный номер').required('Обязательное поле'),
              email: Yup.string().email('Неправильный email').required('Обязательное поле'),
              password: Yup.string().matches( validPassword, "Пароль должен быть на латинице, содержать не менее 8 символов, один в верхнем регистре, одну цифру и один символ").required('Обязательное поле'),
            })}
            onSubmit={(values) => {
              console.log(values);
            }}
        >
          {({ isSubmitting }) => (
              <Form className={style.form}>
                  {Info.map(({placeholder, name})=>
                      <div>
                      <Field className="field" placeholder={placeholder} name={name} />
                      <ErrorMessage className="valid" name={name} component="div" />
                      </div>
                      )}
                <button className={cn("btn", { ["disabled"]: isSubmitting })} type="submit" disabled={isSubmitting}>
                  Отправить
                </button>
              </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}

export default App;
