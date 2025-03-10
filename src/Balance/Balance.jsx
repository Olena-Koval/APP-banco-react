import React, { useState, useEffect } from 'react'; // Importamos React, useState y useEffect
import './Balance.css'; // Si tienes estilos específicos para Balance

const Balance = ({ movements }) => { // Asumimos que 'movements' se pasan como prop
  const [balance, setBalance] = useState(0); // Inicializamos el balance con 0

  // Función para actualizar el balance basado en transacciones
  const updateBalance = (movements) => {
    let currentBalance = 0;
    // Iteramos a través de las transacciones y calculamos el balance
    movements.forEach((movement) => {
      const value = parseFloat(String(movement.value).replace('€', '').replace(',', '.')); // Aseguramos que sea un string
      currentBalance += value;
    });
    setBalance(currentBalance);
  };

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
