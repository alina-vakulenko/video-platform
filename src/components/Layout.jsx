import { Outlet } from "react-router-dom";

import Breadcrumb from "./Breadcrumb";

import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <Breadcrumb />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
