// src/ErrorPage.js
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate(); // Get the navigate function

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="error-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button
        onClick={handleGoBack}
        style={{ padding: "10px 20px", fontSize: "16px" }}>
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
