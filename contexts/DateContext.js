import { createContext, useState } from 'react';
import moment from 'moment';
export const DateContext = createContext();

const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(moment.utc());

  return (
    <DateContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;
