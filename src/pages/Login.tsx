import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import * as Yup from 'yup';
import logoImg from '../images/logo-column.svg';
import '../styles/pages/login.css';

function Login() {
    const { signIn } = useAuth()
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault()
        try {
            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().required('Senha Obrigatória')
            })

            await schema.validate({ email, password });

            await signIn({ inputEmail: email, inputPassword: password })
            history.push('/dashboard')
        } catch (err) {
            console.log(err)
            return;
        }
    }

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
                <form onSubmit={handleSubmit}>
                    <h1>Fazer login</h1>
                    <div className="input-block">
                        <label htmlFor="email">E-mail</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="email" />
                    </div>
                    <div className="input-block">
                        <label htmlFor="senha">Senha</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="senha" />
                    </div>
                    <button className="confirm-button" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;