import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const registerForm = { email, username, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerForm),
        }
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Registration successful! Redirecting...");
        // Redirect to home page after 2 seconds
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  const closeRegisterPage = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="register-container">
          <button className="register-btn" onClick={closeRegisterPage}>
            x
          </button>
          <h2>Register</h2>
          {message && <p className="message">{message}</p>}
          <form onSubmit={handleRegister} className="register-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register-input"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              required
            />
            <button type="submit" className="register-button">
              Sign Up
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
