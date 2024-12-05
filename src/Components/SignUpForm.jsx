import { useState } from "react";

export default function SignUpForm() {
  // State variables for form inputs and error handling
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Submit handler
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent page refresh
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }), // Send state values in request body
        }
      );
      const result = await response.json(); // Parse the response
      console.log(result); // Log the result to observe the shape of the data

      if (!response.ok) {
        throw new Error(result.message); // Handle API errors
      }

      alert(`Sign-up successful! Token: ${result.token}`); // Temporary success feedback
    } catch (error) {
      setError(error.message); // Set error message in state
    }
  }
  return (
    <>
      <h2>Sign Up</h2>
      {/* Conditionally render error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

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
