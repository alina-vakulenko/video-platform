import { Outlet } from "react-router-dom";

import Header from "./Header";
import { SavedCoursesProvider } from "../context/SavedCoursesContext";

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="container">
        <SavedCoursesProvider>
          <Outlet />
        </SavedCoursesProvider>
      </main>
    </div>
  );
}
