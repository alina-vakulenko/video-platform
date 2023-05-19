import { useState, useEffect } from "react";

export const useCourseProgress = (localStoragePrefix, courseDuration) => {
  const [courseProgress, setCourseProgress] = useState(0);

  useEffect(() => {
    const lsEntries = Object.entries(localStorage);
    const progress = lsEntries
      .filter(([key, value]) => key.startsWith(localStoragePrefix))
      .reduce((sum, [key, value]) => sum + parseFloat(value), 0);
    if (progress > 0 && courseDuration > 0) {
      setCourseProgress((progress / courseDuration) * 100);
    }
  }, [localStoragePrefix, courseDuration]);

  return courseProgress;
};
