import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignInPage.css";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const result = await response.json();

      if (response.ok && result.token) {
        // Save the token to localStorage
        localStorage.setItem("authToken", result.token);
        alert("Login Successful!");
        //setIsVisible(false);
        navigate("/"); // Redirect to homepage or dashboard
      } else {
        setErrorMessage(
          result.message || "Login failed. Please check your details."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Error logging in. Please try again.");
    }
  };

  const closeSignInPage = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="signin-contain">
          <button className="close-btn" onClick={closeSignInPage}>
            x
          </button>
          <h2>Welcome back!</h2>
          <h3>Sign In</h3>

          <form onSubmit={handleSubmit}>
            <input
              className="emailBox"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="signbutton" type="submit">
              Sign In
            </button>
          </form>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <a href="#">Forgot Password?</a>
          <Link to="/register">Sign Up</Link>
        </div>
      )}
    </>
  );
};

export default SignInPage;
