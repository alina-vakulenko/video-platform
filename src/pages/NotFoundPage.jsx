import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1>Page not found</h1>
      <h5>
        Return to <Link to="/">Homepage</Link>
      </h5>
    </div>
  );
}
