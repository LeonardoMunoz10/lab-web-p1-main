import React, { useState } from "react";
import "./index.css";
import axios from "axios";
const RegisterForm = ({ onRegisterSucess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fnValidateForm = () => {
    // Validación de datos
    if (!username || !password || !fullName || !email || !phoneNumber || !address) {
      setErrorMessage("Todos los campos son obligatorios.");
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "La contraseña debe contener al menos 8 caracteres, incluyendo al menos un número, una letra mayúscula y un carácter especial."
      );
      return false;
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Email incorrecto.");
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fnValidateForm()) return;
    // Preparar los datos del nuevo usuario
    try {
      const { data } = await axios.post(
        "https://lwlc-proj-2024.onrender.com/users",
        {
          username: username,
          full_name: fullName,
          email: email,
          phone_number: phoneNumber,
          address: address,
          password: password,
          is_admin: false, // asumiendo que el usuario registrado no es un administrador
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      onRegisterSucess();
      console.log("Register");
    } catch (error) {
      console.error("Error al registrar al usuarios:", error);
       setErrorMessage("Error al registrar al usuario. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div className="register-form">
      <h2>Registro de Usuario</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
        <label>Nombre Completo:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onInputCapture={() => setErrorMessage("")}
        />
        <label>Correo Electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onInputCapture={() => setErrorMessage("")}
        />
        <label>Número de Teléfono:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onInputCapture={() => setErrorMessage("")}
        />
        <label>Dirección:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onInputCapture={() => setErrorMessage("")}
        />
        <button type="submit" onClick={handleSubmit}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
