import React, { useState } from "react";
import "./App.css";
import Welcome from "./Welcome/Welcome";
import Login from "./Login/Login";
import Balance from "./Balance/Balance";
import Movements from "./Movements/Movements";
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

function App() {
  const [movements, setMovements] = useState([
    { type: "deposit", date: dayjs().subtract(3, 'days').format('YYYY-MM-DD'), value: 4000 },
    { type: "withdrawal", date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), value: -378 },
    { type: "deposit", date: dayjs().subtract(12, 'days').format('YYYY-MM-DD'), value: 1500 },
    { type: "withdrawal", date: dayjs().subtract(20, 'days').format('YYYY-MM-DD'), value: -200 }
  ]);

  const [balance, setBalance] = useState(4000); // Balance inicial
  const [accountClosed, setAccountClosed] = useState(false); // Estado para verificar si la cuenta está cerrada

  // Función para ordenar los movimientos por fecha
  const sortMovementsByDate = (movements) => {
    return movements.sort((a, b) => dayjs(b.date).isBefore(dayjs(a.date)) ? 1 : -1);
  };

  // Función para actualizar el balance y movimientos
  const updateBalance = (movement) => {
    const updatedMovements = [...movements, movement];
    setMovements(sortMovementsByDate(updatedMovements));

    if (movement.type === "deposit") {
      setBalance(balance + movement.value);
    } else if (movement.type === "withdrawal") {
      setBalance(balance - Math.abs(movement.value)); // Asegurarse de que "Out" sea positivo
    }
  };

  // Función para realizar la transferencia
  const handleTransfer = (amount) => {
    if (amount <= 0) {
      alert("Por favor ingrese una cantidad válida.");
      return;
    }

    if (balance < amount) {
      alert("Saldo insuficiente para realizar la transferencia.");
      return;
    }

    // Realizar la transferencia (retiro de saldo)
    const withdrawal = {
      type: "withdrawal",
      date: dayjs().format('YYYY-MM-DD'),
      value: -amount
    };

    // Actualizar el saldo y los movimientos
    updateBalance(withdrawal);

    // Agregar el depósito a la cuenta de destino (en este caso, se asume que es el mismo usuario)
    const deposit = {
      type: "deposit",
      date: dayjs().format('YYYY-MM-DD'),
      value: amount
    };

    updateBalance(deposit);

    alert("Transferencia realizada con éxito.");
  };

  // Función para manejar la solicitud de préstamo
  const handleLoanRequest = (loanAmount) => {
    if (loanAmount <= 0) {
      alert("Por favor ingrese una cantidad válida.");
      return;
    }

    // Crear un nuevo "movimiento" para el préstamo
    const loanMovement = {
      type: "deposit", // El préstamo es un depósito
      date: dayjs().format('YYYY-MM-DD'),
      value: loanAmount
    };

    // Actualizar el balance y los movimientos
    updateBalance(loanMovement);

    alert("Préstamo solicitado con éxito.");
  };

  // Calcular total de "In", "Out" e "Interest"
  const calculateSummary = () => {
    let totalIn = 0;
    let totalOut = 0;
    let totalInterest = 0;

    movements.forEach((movement) => {
      if (movement.type === "deposit") {
        totalIn += movement.value;
      } else if (movement.type === "withdrawal") {
        totalOut += Math.abs(movement.value);
      }
    });

    totalInterest = totalIn * 0.05;

    return { totalIn, totalOut, totalInterest };
  };

  const { totalIn, totalOut, totalInterest } = calculateSummary();

  // Función para generar movimientos aleatorios con Faker.js
  const generateRandomMovement = () => {
    const randomType = Math.random() > 0.5 ? "deposit" : "withdrawal";
    const randomValue = faker.datatype.number({ min: 10, max: 5000 }); // Valor aleatorio entre 10 y 5000

    return {
      type: randomType,
      date: dayjs(faker.date.recent()).format('YYYY-MM-DD'), // Fecha aleatoria reciente
      value: randomType === "deposit" ? randomValue : -randomValue // Si es depósito, valor positivo, si es retiro, negativo
    };
  };

  // Generar 5 movimientos aleatorios
  const generateRandomMovements = () => {
    const randomMovements = [];
    for (let i = 0; i < 5; i++) {
      randomMovements.push(generateRandomMovement());
    }
    setMovements((prevMovements) => [...prevMovements, ...randomMovements]);
  };

  // Función para cerrar la cuenta
  const handleCloseAccount = (username, pin) => {
    const correctUser = "alumno";  // Ejemplo: nombre de usuario correcto
    const correctPin = "123456";   // Ejemplo: PIN correcto
    
    if (username === correctUser && pin === correctPin) {
      setAccountClosed(true);  // Cambiar el estado a "cerrado"
      alert("Cuenta cerrada con éxito.");
    } else {
      alert("Usuario o PIN incorrectos.");
    }
  };

  if (accountClosed) {
    return (
      <div className="account-closed">
        <h2>Cuenta Cerrada</h2>
        <p>Tu cuenta ha sido cerrada. Ya no puedes realizar más operaciones.</p>
      </div>
    );
  }

  return (
    <>
      <nav>
        <Welcome />
        <img src="logo.png" alt="Logo" className="logo" />
        <Login />
      </nav>

      <main className="app">
        {/* BALANCE */}
        <Balance balance={balance} movements={movements} />

        {/* MOVEMENTS */}
        <Movements movements={movements} />

        {/* SUMMARY */}
        <div className="summary">
          <p className="summary__label">In</p>
          <p className="summary__value summary__value--in">{totalIn}€</p>
          <p className="summary__label">Out</p>
          <p className="summary__value summary__value--out">{totalOut}€</p>
          <p className="summary__label">Interest</p>
          <p className="summary__value summary__value--interest">{totalInterest.toFixed(2)}€</p>
        </div>

        {/* OPERATION: TRANSFERS */}
        <div className="operation operation--transfer">
          <h2>Transfer money</h2>
          <form
            className="form form--transfer"
            onSubmit={(e) => {
              e.preventDefault();
              const amount = parseFloat(e.target.amount.value);
              handleTransfer(amount);
            }}
          >
            <input
              type="text"
              name="to"
              className="form__input form__input--to"
              placeholder="Transfer to"
              required
            />
            <input
              type="number"
              name="amount"
              className="form__input form__input--amount"
              placeholder="Amount"
              required
            />
            <button type="submit" className="form__btn form__btn--transfer">
              &rarr; Transfer
            </button>
          </form>
        </div>

        {/* OPERATION: LOAN */}
        <div className="operation operation--loan">
          <h2>Request loan</h2>
          <form
            className="form form--loan"
            onSubmit={(e) => {
              e.preventDefault();
              const loanAmount = parseFloat(e.target.loanAmount.value);
              handleLoanRequest(loanAmount);
            }}
          >
            <input
              type="number"
              name="loanAmount"
              className="form__input form__input--loan-amount"
              placeholder="Loan Amount"
              required
            />
            <button type="submit" className="form__btn form__btn--loan">
              &rarr; Request Loan
            </button>
          </form>
        </div>

        {/* OPERATION: CLOSE */}
        <div className="operation operation--close">
          <h2>Close account</h2>
          <form
            className="form form--close"
            onSubmit={(e) => {
              e.preventDefault();
              const username = e.target.user.value;
              const pin = e.target.pin.value;
              handleCloseAccount(username, pin);
            }}
          >
            <input
              type="text"
              name="user"
              className="form__input form__input--user"
              placeholder="Confirm user"
              required
            />
            <input
              type="password"
              maxLength="6"
              name="pin"
              className="form__input form__input--pin"
              placeholder="Confirm PIN"
              required
            />
            <button type="submit" className="form__btn form__btn--close">
              &rarr; Close Account
            </button>
          </form>
        </div>

        {/* BUTTON TO GENERATE RANDOM MOVEMENTS */}
        <div className="generate-movements">
          <button onClick={generateRandomMovements} className="generate-btn">
            Generate Random Movements
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
