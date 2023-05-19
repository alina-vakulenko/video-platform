import { useEffect } from "react";

export const useVideoPosition = (videoRef, courseSlug, lessonId) => {
  // Load progress for current video from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`[${courseSlug}]${lessonId}`);

    if (savedProgress && videoRef.current) {
      videoRef.current.currentTime = parseFloat(savedProgress);
    }
  }, [videoRef, courseSlug, lessonId]);

  // Save progress to local storage on page unload
  useEffect(() => {
    const handleUnload = () => {
      if (videoRef.current) {
        localStorage.setItem(
          `[${courseSlug}]${lessonId}`,
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
        `[${courseSlug}]${lessonId}`,
        videoRef.current.currentTime
      );
    }
  };

  // Remove progress for current video from local storage on video end
  const handleEnded = () => {
    if (videoRef.current) {
      localStorage.setItem(
        `[${courseSlug}]${lessonId}`,
        videoRef.current.currentTime
      );
    }
  };

  return [handlePause, handleEnded];
};
