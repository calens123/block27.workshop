import { useState } from "react";
import SignUpForm from "./components/SignUpForm";
import Authenticate from "./components/Authenticate";

export default function App() {
  // State for managing the token
  const [token, setToken] = useState(null);

  return (
    <>
      {/* Pass token and setToken to both components */}
      <SignUpForm token={token} setToken={setToken} />
      <Authenticate token={token} setToken={setToken} />
    </>
  );
}
