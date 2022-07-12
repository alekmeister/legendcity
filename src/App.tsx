
import './App.css';
import React from "react";



const App: React.FC = () => {
  return (
    <div className="App">
      <table className="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Имя</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Телефон</th>
          <th scope="col">E-mail</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Сергеев</td>
          <td>Вадим</td>
          <td>+79524216936</td>
          <td>serg@mail.ru</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>serg@mail.ru</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
          <td>serg@mail.ru</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
