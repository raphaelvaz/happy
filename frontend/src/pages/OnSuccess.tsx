import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/on-success.css';

function onSuccess() {

    return (
        <div id="page-onsuccess">
            <div className="wrapper">
                <main>
                    <div>
                        <h1>Ebaaa!</h1>
                        <p>O cadastro deu certo e foi enviado ao administrador para ser aprovado.</p>
                        <p>Agora é só esperar :)</p>
                    </div>
                    <Link to="/app">
                        Voltar para o mapa
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default onSuccess;