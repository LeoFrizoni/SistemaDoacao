import React, { useState } from 'react';
import './login.css';
import {
  PostAdministrador,
  GetAdministrador,
  GetAdministradorByUser
} from '../../../services/serviceAdministrador';

export const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    admUsuario: '',
    admSenha: ''
  });
  const [loginData, setLoginData] = useState({
    admUsuario: '',
    admSenha: ''
  });

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      admCodigo: 0,
      admUsuario: formData.admUsuario,
      admSenha: formData.admSenha
    };

    try {
      const checkResponse = await GetAdministrador();
      const existingUser = checkResponse.data.find(
        (user) => user.admUsuario === formData.admUsuario
      );

      if (existingUser) {
        const inputUsuario = document.getElementById('registerUsuario');
        inputUsuario.setCustomValidity('Usuário já existe.');
        inputUsuario.reportValidity();
        return;
      }

      const response = await PostAdministrador(dataToSend);

      if (response && response.data === "ADM registrado") {
        const inputUsuario = document.getElementById('registerUsuario');
        inputUsuario.setCustomValidity('Cadastro realizado com sucesso!');
        inputUsuario.reportValidity();

        setTimeout(() => {
          setFormData({ admUsuario: '', admSenha: '' });
          inputUsuario.setCustomValidity(''); 
          inputUsuario.reportValidity();
        }, 1000);  

        setTimeout(() => {
          setIsActive(false); 
        }, 1000); 
      } else {
        const inputUsuario = document.getElementById('registerUsuario');
        inputUsuario.setCustomValidity('Erro ao realizar cadastro. Tente novamente!');
        inputUsuario.reportValidity();
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      const inputUsuario = document.getElementById('registerUsuario');
      inputUsuario.setCustomValidity('Erro ao realizar cadastro. Tente novamente!');
      inputUsuario.reportValidity();
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await GetAdministradorByUser(loginData.admUsuario);

      const inputUsuario = document.getElementById('loginUsuario');
      const inputSenha = document.getElementById('loginSenha');

      if (!response || !response.data) {
        inputUsuario.setCustomValidity('Usuário ou senha incorretos.');
        inputUsuario.reportValidity();
        return;
      }

      const userData = response.data;

      if (userData.admSenha !== loginData.admSenha) {
        inputSenha.setCustomValidity('Usuário ou senha incorretos.');
        inputSenha.reportValidity();
        return;
      }

      inputUsuario.setCustomValidity('Login feito com sucesso!');
      inputUsuario.reportValidity();

      setTimeout(() => {
        inputUsuario.setCustomValidity(''); 
        inputUsuario.reportValidity();
      }, 1000);  

      console.log('Login bem-sucedido! Redirecionando para a Home');
      setTimeout(() => {
        window.location.href = '/home'; 
      }, 1000);  
    } catch (error) {
      console.error('Erro ao realizar login:', error);
    }
  };

  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form id="signupForm" onSubmit={handleRegisterSubmit}>
          <h1>Crie sua conta</h1>
          <br />
          <span>Se registre com seus dados pessoais.</span>
          <input
            type="text"
            id="registerUsuario"
            name="admUsuario"
            placeholder="Usuário"
            value={formData.admUsuario}
            onChange={(e) => {
              const inputUsuario = e.target;
              inputUsuario.setCustomValidity(''); 
              handleInputChange(e);
            }}
            required
          />
          <input
            type="password"
            id="registerPassword"
            name="admSenha"
            placeholder="Senha"
            value={formData.admSenha}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form id="loginForm" onSubmit={handleLoginSubmit}>
          <h1>Kindness Compass</h1>
          <br />
          <span>Entre com seu usuário e senha</span>
          <input
            type="text"
            id="loginUsuario"
            name="admUsuario"
            placeholder="Usuário"
            value={loginData.admUsuario}
            onChange={(e) => {
              const inputUsuario = e.target;
              inputUsuario.setCustomValidity('');
              handleLoginInputChange(e);
            }}
            required
          />
          <input
            type="password"
            id="loginSenha"
            name="admSenha"
            placeholder="Senha"
            value={loginData.admSenha}
            onChange={(e) => {
              const inputSenha = e.target;
              inputSenha.setCustomValidity('');
              handleLoginInputChange(e);
            }}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Olá, amigo!</h1>
            <p>Preencha com suas informações para se registrar.</p>
            <button className="hidden" onClick={handleLoginClick} id="login">
              Entre aqui!
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Seja Bem-vindo de volta!</h1>
            <p>Realize o Login para utilizar nosso site!</p>
            <button className="hidden" onClick={handleRegisterClick} id="register">
              Ou registre-se aqui!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
