import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="content p-5 d-flex flex-column align-items-center justify-content-center">
      <h1>Page not found</h1>
      <h5>
        <Link to="/">Home page</Link>
      </h5>
    </div>
  );
}
