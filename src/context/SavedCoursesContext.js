import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const SavedCoursesContext = createContext();
export const useSavedCoursesContext = () => useContext(SavedCoursesContext);
const courseLocalStoragePrefix = "lastViewd:";

export const SavedCoursesProvider = ({ children }) => {
  const [savedCourseIds, setSavedCourseIds] = useState([]);

  useEffect(() => {
    const getMyCoursesIds = () => {
      const lsKeys = Object.keys(localStorage);
      return lsKeys
        .filter((item) => item.startsWith("lastViewed"))
        .map((filteredItem) =>
          filteredItem.slice(courseLocalStoragePrefix.length + 1)
        );
    };

    setSavedCourseIds(getMyCoursesIds());
  }, []);

  return (
    <SavedCoursesContext.Provider value={{ savedCourseIds, setSavedCourseIds }}>
      {children}
    </SavedCoursesContext.Provider>
  );
};
