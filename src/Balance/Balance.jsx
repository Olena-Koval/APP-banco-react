import React, { useState, useEffect } from 'react'; // Importamos React, useState y useEffect
import './Balance.css'; // Si tienes estilos específicos para Balance

const Balance = () => {
  const [balance, setBalance] = useState(0); // Inicializamos el balance con 0

  // Función para actualizar el balance basado en transacciones
  const updateBalance = (movements) => {
    let currentBalance = 0;
    // Iteramos a través de las transacciones y calculamos el balance
    movements.forEach((movement) => {
      const value = parseFloat(movement.value.replace('€', '').replace(',', '.'));
      currentBalance += value;
    });
    setBalance(currentBalance);
  };

  // Supongamos que los movimientos se pasan como prop, o los definimos aquí
  const movements = [
    { type: 'deposit', date: '3 days ago', value: '4,000€' },
    { type: 'withdrawal', date: '24/01/2037', value: '-378€' },
    { type: 'deposit', date: '12/01/2037', value: '1,500€' },
    { type: 'withdrawal', date: '01/01/2037', value: '-200€' },
  ];

  useEffect(() => {
    updateBalance(movements); // Actualizamos el balance cada vez que los movimientos cambian
  }, [movements]);

  // Función para formatear el balance como moneda
  const formatCurrency = (amount) => {
    return `${amount.toFixed(2)}€`; // Formatear el balance con 2 decimales
  };

  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of <span className="date">05/03/2037</span> {/* Puedes cambiar la fecha estática */}
        </p>
      </div>
      {/* Mostrar el balance dinámico */}
      <p className="balance__value">{formatCurrency(balance)}</p>
    </div>
  );
};

export default Balance;
