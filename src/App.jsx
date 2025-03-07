import React, { useState } from 'react';
import './App.css';
import Welcome from './Welcome/Welcome';
import Login from './Login/Login';
import Balance from './Balance/Balance';
import Movements from './Movements/Movements';

function App() {
  // Estado para manejar el balance y las transacciones
  const [movements, setMovements] = useState([
    { type: 'deposit', date: '3 days ago', value: '4,000€' },
    { type: 'withdrawal', date: '24/01/2037', value: '-378€' },
    { type: 'deposit', date: '12/01/2037', value: '1,500€' },
    { type: 'withdrawal', date: '01/01/2037', value: '-200€' },
  ]);

  const updateBalance = (movement) => {
    setMovements([...movements, movement]); // Agregamos la nueva transacción al estado de movimientos
  };

  return (
    <>
      <nav>
        <Welcome />
        <img src="logo.png" alt="Logo" className="logo" />
        <Login />
      </nav>

      <main className="app">
        {/* BALANCE */}
        <Balance movements={movements} />

        {/* MOVEMENTS */}
        <Movements movements={movements} onUpdateBalance={updateBalance} />

        {/* SUMMARY */}
        <div className="summary">
          <p className="summary__label">In</p>
          <p className="summary__value summary__value--in">0000€</p>
          <p className="summary__label">Out</p>
          <p className="summary__value summary__value--out">0000€</p>
          <p className="summary__label">Interest</p>
          <p className="summary__value summary__value--interest">0000€</p>
          <button className="btn--sort">&downarrow; SORT</button>
        </div>

        {/* OPERATION: TRANSFERS */}
        <div className="operation operation--transfer">
          <h2>Transfer money</h2>
          <form className="form form--transfer">
            <input type="text" className="form__input form__input--to" />
            <input type="number" className="form__input form__input--amount" />
            <button className="form__btn form__btn--transfer">&rarr;</button>
            <label className="form__label">Transfer to</label>
            <label className="form__label">Amount</label>
          </form>
        </div>

        {/* OPERATION: LOAN */}
        <div className="operation operation--loan">
          <h2>Request loan</h2>
          <form className="form form--loan">
            <input type="number" className="form__input form__input--loan-amount" />
            <button className="form__btn form__btn--loan">&rarr;</button>
            <label className="form__label form__label--loan">Amount</label>
          </form>
        </div>

        {/* OPERATION: CLOSE */}
        <div className="operation operation--close">
          <h2>Close account</h2>
          <form className="form form--close">
            <input type="text" className="form__input form__input--user" />
            <input
              type="password"
              maxLength="6"
              className="form__input form__input--pin"
            />
            <button className="form__btn form__btn--close">&rarr;</button>
            <label className="form__label">Confirm user</label>
            <label className="form__label">Confirm PIN</label>
          </form>
        </div>

        {/* LOGOUT TIMER */}
        <p className="logout-timer">
          You will be logged out in <span className="timer">05:00</span>
        </p>
      </main>
    </>
  );
}

export default App;
