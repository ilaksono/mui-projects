import { useState } from 'react';
const usePlayer = () => {
  const [play, setPlay] = useState(false);
  const togglePlay = () => {
    setPlay(prev => !prev);
  };
  return {
    play,
    togglePlay,
    setPlay
  };

};

export default usePlayer;