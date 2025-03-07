import React from 'react';
import './Movements.css';

const Movements = () => {
  const movements = [
    { type: 'deposit', date: '3 days ago', value: '4,000€' },
    { type: 'withdrawal', date: '24/01/2037', value: '-378€' },
    { type: 'deposit', date: '12/01/2037', value: '1,500€' },
    { type: 'withdrawal', date: '01/01/2037', value: '-200€' },
  ];

  return (
    <div className="movements">
      {movements.map((movement, index) => (
        <div key={index} className="movements__row">
          <div className={`movements__type movements__type--${movement.type}`}>
            {movement.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
          </div>
          <div className="movements__date">{movement.date}</div>
          <div className="movements__value">{movement.value}</div>
        </div>
      ))}
    </div>
  );
};

export default Movements;