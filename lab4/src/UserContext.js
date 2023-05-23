import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);

  const updateUser = (newUserId) => {
    setUserId(newUserId);
  };

  return (
    <UserContext.Provider value={{ userId, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}