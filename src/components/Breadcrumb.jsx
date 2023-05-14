import { NavLink } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb" className="mt-3">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <NavLink to="#">Home</NavLink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
