import React, { useReducer, useState, createContext, useEffect } from "react";
import "./components/index.css";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import Products from "./components/Products";
import { appReducer, initialState } from "./reducer/appReducer";
import { ACTIONS } from "./constants";
import logo from "./componentes-visuales/logo.png"
export const AppContext = createContext(null);


const Marketplace = () => {
  const [isLogin, setLogin] = useState();
  const [isRegister, setRegister] = useState(false);
  const [state, fnDispatch] = useReducer(appReducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsModalOpen(true);
    setLogin(false);
    setRegister(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleLoginClick = () => {
    setIsModalOpen(true);
    setLogin(true);
    setRegister(false);
  };
  const fnReload = () => {
    fnDispatch({
      type: ACTIONS.logut,
    });
  };
  useEffect(() => {
    if (state.isAuth) {
      setIsModalOpen(false);
      setLogin(false);
      setRegister(false);
    }
  }, [state.isAuth]);

  return (
    <AppContext.Provider value={{ state, fnDispatch }}>
      <div className="marketplace">
        <header className="headertop">
          <div className="container">
          <img className="logoprincipal" src={logo} />
            <div className="header-buttons">
              {!state.isAuth && (
                <>
                  <button onClick={handleLoginClick}>Login</button>
                  <button onClick={handleRegisterClick}>Registrarse</button>
                </>
              )}
              {state.isAuth && (
                <>
                  <button>Mi Cuenta</button>
                  <button>Mis Productos</button>
                  <button onClick={fnReload}>Logout</button>
                </>
              )}
            </div>
            {/* <div className="search-bar">
              <input type="text" placeholder="Buscar productos..." />
              <button>Buscar</button>
            </div> */}
          </div>
        </header>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
              {isLogin && <Login />}
              {isRegister && <RegisterForm onRegisterSucess={handleCloseModal} />}
            </div>
          </div> 
        )}
        {state.isAuth && <Products />}
        <div className="iniciadomsg">
              {!state.isAuth && (
                <>
                  <h2 >LOGIN FOR START SHOPPING</h2>
                  <h2 className="inciado2">THE BEST ONLINE MARKET ON THE WORLD</h2>
                </>
              )}
              {state.isAuth && (
                <>
                
                </>
              )}
            </div>
      </div>
    </AppContext.Provider>
  );
};

export default Marketplace;
