import React from 'react';
import './Movements.css';

const Movements = ({ movements, onUpdateBalance }) => {
  // Función para manejar el cambio de balance cuando hay una nueva transacción
  const handleTransaction = (movement) => {
    onUpdateBalance(movement);
  };

  return (
    <div className="movements">
      {movements.map((movement, index) => (
        <div key={index} className="movements__row">
          <div className={`movements__type movements__type--${movement.type}`}>
            {movement.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
          </div>
          <div className="movements__date">{movement.date}</div>
          <div className="movements__value">{movement.value}€</div>
        </div>
      ))}
    </div>
  );
};

export default Movements;
