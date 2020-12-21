import React from 'react';
import usePlayer from 'hooks/usePlayer';
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const { play, togglePlay } = usePlayer();
  return (
    <AppContext.Provider value={{
      play,
      togglePlay
    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;