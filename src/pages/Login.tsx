import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../images/logo-column.svg';
import '../styles/pages/login.css';

function Login() {

    return (
        <div id="login">
            <div className="logo">
                <img src={logoImg} alt="Happy" />
                <div className="location login">
                    <strong>Rio Grande</strong>
                    <span>Rio Grande do Sul</span>
                </div>
            </div>
            <div className="form-block">
                <Link to="/"><FiArrowLeft size={26} className="back-landing" /></Link>
                <form>
                    <h1>Fazer login</h1>
                    <div className="input-block">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" id="email" />
                    </div>
                    <div className="input-block">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" />
                    </div>
                    <button className="confirm-button" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;