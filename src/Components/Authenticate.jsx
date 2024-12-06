import { useState } from "react"; // <-- Ensure this line is included

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(""); // State for username

  async function handleClick() {
    console.log("Token being sent:", token);

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in header
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setSuccessMessage(result.message);
      setUsername(result.data.username); // Store username from API
    } catch (error) {
      setError(error.message); // Handle any errors
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {username && <p>Logged in as: {username}</p>} {/* Display username */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}
