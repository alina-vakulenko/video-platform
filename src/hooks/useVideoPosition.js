import { useEffect } from "react";

export const useVideoPosition = (videoRef, videoUrl) => {
  // Load progress for current video from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress:${videoUrl}`);

    if (savedProgress && videoRef.current) {
      videoRef.current.currentTime = parseFloat(savedProgress);
    }
  }, [videoUrl, videoRef]);

  // Save progress to local storage on page unload
  useEffect(() => {
    const handleUnload = () => {
      if (videoRef.current) {
        localStorage.setItem(
          `progress:${videoUrl}`,
          videoRef.current.currentTime
        );
      }
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => window.removeEventListener("beforeunload", handleUnload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save progress to local storage on pause
  const handlePause = () => {
    if (videoRef.current) {
      localStorage.setItem(
        `progress:${videoUrl}`,
        videoRef.current.currentTime
      );
    }
  };

  // Remove progress for current video from local storage on video end
  const handleEnded = () => {
    localStorage.removeItem(`progress:${videoUrl}`);
  };

  return [handlePause, handleEnded];
};
