import { createContext, useState } from 'react';

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [accessToken, setAccessToken] = useState();
  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
