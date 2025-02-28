//import React from 'react'

import { useState } from "react";
import "./SignInPage.css";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const loginForm = { email, password };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const closeSignInPage = () => {
    setIsVisible(false); // Hide the sign-in form
  };

  return (
    <>
      {isVisible && ( // Only render sign-in form if isVisible is true
        <div className="signin-contain">
          <button className="close-btn" onClick={closeSignInPage}>
            x
          </button>
          <h2>Welcome back!</h2>
          <h3>Sign In</h3>
          <form onSubmit={handleSignIn}>
            <input
              type="text"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signbutton" type="submit">
              Sign In
            </button>
          </form>
          <a href="#">Forgot Password?</a>
          <a href="#">Sign Up</a>
        </div>
      )}
    </>
  );
};

//     <div className="signin-contain">
//       <h2>Sign In</h2>
//       <form onSubmit={handleSignIn}>
//         <input
//           type="text"
//           placeholder="Email or Username"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Sign In</button>
//       </form>
//       <a href="#">Forgot Password?</a>
//       <a href="#">Sign Up</a>
//     </div>
//   );
// };

export default SignInPage;
