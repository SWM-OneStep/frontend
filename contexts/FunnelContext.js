import { createContext, useState } from 'react';

export const FunnelContext = createContext();

const FunnelProvider = ({ children }) => {
  const [FunnelDone, setFunnelDone] = useState(false);

  return (
    <FunnelContext.Provider value={{ FunnelDone, setFunnelDone }}>
      {children}
    </FunnelContext.Provider>
  );
};

export default FunnelProvider;
