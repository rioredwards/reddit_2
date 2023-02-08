import { useState, createContext, useContext } from 'react';
import { getUser } from '../services/auth.js';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser);

  const parseUsername = (email) => {
    return email.split('@')[0];
  };

  return (
    <UserContext.Provider value={{ user, setUser, parseUsername }}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const data = useContext(UserContext);

  if (!data) {
    throw new Error('useUser must be wrapped in a UserProvider');
  }
  return data;
};

export { UserProvider, useUser };
