import { useState } from "react";

export const usePlayOnHover = (playerRef) => {
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(true);

  const handleMouseEnter = () => {
    if (loaded && paused) {
      setPaused(false);
      playerRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (!paused) {
      setPaused(true);
      playerRef.current.pause();
      playerRef.current.currentTime = 0;
    }
  };

  const handleLoadMetadata = () => {
    setLoaded(true);
    setPaused(true);
  };

  return [handleLoadMetadata, handleMouseEnter, handleMouseLeave, paused];
};
