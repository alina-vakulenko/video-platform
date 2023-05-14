export default function ErrorPage({ message }) {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1>Oops, an error occured</h1>
      <h3>Please try again later</h3>
      <h4>{message}</h4>
    </div>
  );
}
