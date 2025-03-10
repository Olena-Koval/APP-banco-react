import React from 'react';
import './Movements.css';
import dayjs from 'dayjs'; // Importamos dayjs para manejar las fechas

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
      {movements.length === 0 ? (
        <p>No hay movimientos recientes.</p> // Mensaje en caso de que no haya movimientos
      ) : (
        movements.map((movement, index) => {
          const { relativeDate, standardDate } = formatDate(movement.date); // Obtenemos la fecha formateada

          return (
            <div key={index} className="movements__row">
              <div className={`movements__type movements__type--${movement.type}`}>
                {movement.type === 'deposit' ? 'Depósito' : 'Retiro'} {/* Traducción de tipo de movimiento */}
              </div>
              <div className="movements__date">
                <span>{relativeDate} </span> | <span>{standardDate}</span> {/* Mostrar fechas relativa y estándar */}
              </div> 
              <div className="movements__value">{movement.value}€</div> {/* Mostrar valor del movimiento */}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Movements;
