import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';

const Sidebar: React.FC = ({ children }) => {
    const { goBack, location } = useHistory();
    const { signOut } = useAuth()

    const handleClick = () => {
        if (location.pathname === '/dashboard') {
            signOut()
            return
        }

        goBack()
        return
    }
    return (
        <aside className="app-sidebar">
            <img src={mapMarkerImg} alt="Happy" />
            <div>
                {children}
            </div>
            <footer>
                <button type="button" onClick={handleClick}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    );
}

export default Sidebar;