import React, { createContext, useContext, useState } from 'react';

const LevelContext = createContext();
export const useLevel = () => {
  return useContext(LevelContext);
};

export const LevelProvider = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState(1);

  const setLevel = (level) => {
    setCurrentLevel(level);
  };

  return (
    <LevelContext.Provider value={{ currentLevel, setLevel }}>
      {children}
    </LevelContext.Provider>
  );
};
