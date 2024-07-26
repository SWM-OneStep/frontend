import { createContext, useState } from 'react';

export const DateContext = createContext();

const DateProvider = ({ children }) => {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  return (
    <DateContext.Provider
      value={{
        date,
        setDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;
