import { createContext, useState } from 'react';

export const LoginContext = createContext();

const LoginProviderComponent = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtAccessToken, setJwtAccessToken] = useState(null);
  const [jwtRefreshToken, setJwtRefreshToken] = useState(null);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        jwtAccessToken,
        setJwtAccessToken,
        jwtRefreshToken,
        setJwtRefreshToken,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProviderComponent;
