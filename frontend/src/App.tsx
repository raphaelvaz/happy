import React from 'react';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';

import Routes from './Routes/routes';
import { AuthProvider } from './hooks/auth'

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
