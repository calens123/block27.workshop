import { useState } from "react";
import SignUpForm from "./components/SignUpForm";
import Authenticate from "./components/Authenticate";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <SignUpForm token={token} setToken={setToken} />{" "}
      {/* Pass setToken to SignUpForm */}
      <Authenticate token={token} setToken={setToken} />{" "}
      {/* Pass token to Authenticate */}
    </>
  );
}
