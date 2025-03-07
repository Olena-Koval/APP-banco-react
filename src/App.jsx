import React, { useState } from "react";
import "./App.css";
import Welcome from "./Welcome/Welcome";
import Login from "./Login/Login";
import Balance from "./Balance/Balance";
import Movements from "./Movements/Movements";
import dayjs from 'dayjs'; // Importamos dayjs

function App() {
  // Estado para manejar el balance y las transacciones
  const [movements, setMovements] = useState([
    { type: "deposit", date: dayjs().subtract(3, 'days').format('YYYY-MM-DD'), value: 4000 },
    { type: "withdrawal", date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), value: -378 },
    { type: "deposit", date: dayjs().subtract(12, 'days').format('YYYY-MM-DD'), value: 1500 },
    { type: "withdrawal", date: dayjs().subtract(20, 'days').format('YYYY-MM-DD'), value: -200 }
  ]);

  // Función para ordenar los movimientos por fecha
  const sortMovementsByDate = (movements) => {
    return movements.sort((a, b) => {
      return dayjs(b.date).isBefore(dayjs(a.date)) ? 1 : -1;  // Orden descendente por fecha
    });
  };

  // Función para agregar un nuevo movimiento
  const updateBalance = (movement) => {
    const updatedMovements = [...movements, movement];
    // Ordenar los movimientos cada vez que se agrega un movimiento
    setMovements(sortMovementsByDate(updatedMovements));
  };

  // Calcular "In", "Out" e "Interest" cuando los movimientos cambian
  const calculateSummary = () => {
    let totalIn = 0;
    let totalOut = 0;
    let totalInterest = 0;

    // Calcular total de "In" (depósitos) y "Out" (retiros)
    movements.forEach((movement) => {
      if (movement.type === "deposit") {
        totalIn += movement.value;
      } else if (movement.type === "withdrawal") {
        totalOut += Math.abs(movement.value); // Asegurarnos de que "Out" sea positivo
      }
    });

    // Calcular el interés (5% de los depósitos)
    totalInterest = totalIn * 0.05;

    return { totalIn, totalOut, totalInterest };
  };

  // Llamamos a la función calculateSummary cada vez que los movimientos cambian
  const { totalIn, totalOut, totalInterest } = calculateSummary();

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
          <p className="summary__value summary__value--in">{totalIn}€</p>
          <p className="summary__label">Out</p>
          <p className="summary__value summary__value--out">{totalOut}€</p>
          <p className="summary__label">Interest</p>
          <p className="summary__value summary__value--interest">{totalInterest.toFixed(2)}€</p>
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
            <input type="password" maxLength="6" className="form__input form__input--pin" />
            <button className="form__btn form__btn--close">&rarr;</button>
            <label className="form__label">Confirm user</label>
            <label className="form__label">Confirm PIN</label>
          </form>
        </div>

        <p className="logout-timer">
          You will be logged out in <span className="timer">05:00</span>
        </p>
      </main>
    </>
  );
}

export default App;
