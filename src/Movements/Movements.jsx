import React from 'react';
import './Movements.css';
import dayjs from 'dayjs'; // Importamos dayjs

const Movements = ({ movements }) => {
  // Función para mostrar la fecha con el formato "hace X días" y también el formato estándar
  const formatDate = (date) => {
    const today = dayjs(); // Obtiene la fecha actual
    const movementDate = dayjs(date); // Convierte la fecha del movimiento
    const diffInDays = today.diff(movementDate, 'day'); // Calcula la diferencia en días

    const relativeDate = diffInDays === 0 
      ? "Hoy" 
      : `Hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;

    const standardDate = movementDate.format('YYYY-MM-DD'); // Formato estándar 'YYYY-MM-DD'

    return { relativeDate, standardDate };
  };

  return (
    <div className="movements">
      {movements.map((movement, index) => {
        const { relativeDate, standardDate } = formatDate(movement.date);

        return (
          <div key={index} className="movements__row">
            <div className={`movements__type movements__type--${movement.type}`}>
              {movement.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
            </div>
            <div className="movements__date">
              <span>{relativeDate} </span> | <span>{standardDate}</span>
            </div> 
            <div className="movements__value">{movement.value}€</div>
          </div>
        );
      })}
    </div>
  );
};

export default Movements;
