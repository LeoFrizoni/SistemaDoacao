import React, { useState } from 'react';
import './login.css';

export const Login = () => {

  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);  
  };

  const handleLoginClick = () => {
    setIsActive(false);  
  };

  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form id="signupForm">
          <h1>Crie sua conta</h1>
          <br />
          <span>Se registre com seus dados pessoais.</span>
          <input type="text" id="registerName" placeholder="Nome" required />
          <input type="password" id="registerPassword" placeholder="Senha" required />
          <button type="button">Cadastrar</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form id="loginForm">
          <h1>Kindness Compass</h1>
          <br />
          <span>Entre com seu usuário e senha</span>
          <input type="text" placeholder="Usuário" required />
          <input type="password" placeholder="Senha" required />
          <button type="submit">Entrar</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Olá, amigo!</h1>
            <p>Preencha suas informações pessoais para se registrar.</p>
            <button className="hidden" onClick={handleLoginClick} id="login">Entre aqui!</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Seja Bem-vindo de volta!</h1>
            <p>Realize o Login para utilizar nosso site!</p>
            <button className="hidden" onClick={handleRegisterClick} id="register">Ou registre-se aqui!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
