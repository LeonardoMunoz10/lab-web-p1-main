import React, { useContext, useState } from "react";
import "./index.css";
import axios from "axios";
import { AppContext } from "../App";
import { ACTIONS } from "../constants";
const Login = () => {
  const { fnDispatch } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fnLogin = async (e) => {
    e.preventDefault();
    console.log("Entro");
    try {
      const { data } = await axios.post(
        "https://lwlc-proj-2024.onrender.com/users/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // onLogin();
      fnDispatch({
        type: ACTIONS.login,
        token: data,
      });
    } catch (error) {
      setErrorMessage("Error al iniciar sesion.");
    }
  };
  return (
    <div className="register-form">
      <h2>LOGIN</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form>
        <label>Nombre de Usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onInputCapture={() => setErrorMessage("")}
        />
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onInputCapture={() => setErrorMessage("")}
        />
        <button onClick={fnLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
