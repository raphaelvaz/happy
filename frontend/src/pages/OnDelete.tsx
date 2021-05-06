import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/on-delete.css';

function onDelete() {

    return (
        <div id="page-ondelete">
            <div className="delete-wrapper">
                <main>
                    <div>
                        <h1>Excluir!</h1>
                        <p>Você acabou de excluir um orfanato do nosso banco de dados.</p>
                    </div>
                    <Link to="/app">
                        Voltar para a Dashboard
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default onDelete;