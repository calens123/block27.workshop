import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState(""); // Error state for username

  // Validate username length
  const validateUsername = (username) => {
    if (username.length < 8) {
      setUsernameError("Username must be at least 8 characters long.");
      return false;
    }
    setUsernameError(""); // Reset error if valid
    return true;
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateUsername(username)) {
      return; // Don't submit if validation fails
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      setToken(result.token);
      alert(`Sign-up successful! Token: ${result.token}`);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}{" "}
      {/* Show username error */}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </>
  );
}
