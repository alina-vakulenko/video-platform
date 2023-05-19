import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const SavedCoursesContext = createContext();
export const useSavedCoursesContext = () => useContext(SavedCoursesContext);
const localStorageCoursePrefix = "lastViewd:";

export const SavedCoursesProvider = ({ children }) => {
  const [savedCoursesSlugs, setSavedCoursesSlugs] = useState([]);

  useEffect(() => {
    const getSavedCoursesSlugs = () => {
      const lsKeys = Object.keys(localStorage);
      return lsKeys
        .filter((item) => item.startsWith("lastViewed"))
        .map((filteredItem) =>
          filteredItem.slice(localStorageCoursePrefix.length + 1)
        );
    };

    setSavedCoursesSlugs(getSavedCoursesSlugs());
  }, []);

  return (
    <SavedCoursesContext.Provider
      value={{ savedCoursesSlugs, setSavedCoursesSlugs }}
    >
      {children}
    </SavedCoursesContext.Provider>
  );
};
