import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>CreateAccount Form</h1>
      {error && <p className="error">{error}</p>}
      <>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter FirstName"
        ></input>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter LastName"
        ></input>
        <input
          type="text"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          placeholder="Enter Phoneno"
        ></input>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        ></input>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        ></input>
        <input
          type="text"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        ></input>
        <button onClick={createAccount}> Create Account </button>
        <Link to="/login"> LogIn here</Link>
      </>
    </>
  );
};

export default CreateAccountPage;
