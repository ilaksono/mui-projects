import React from 'react';
import usePlayer from 'hooks/usePlayer';
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const { play,
    togglePlay,
    setPlay
  } = usePlayer();
  return (
    <AppContext.Provider value={{
      play,
      togglePlay,
      setPlay
    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;