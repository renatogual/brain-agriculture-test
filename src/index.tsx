import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import AppRoutes from './routes';
import { FarmProvider } from './contexts/FarmContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <FarmProvider>
            <AppRoutes />
        </FarmProvider>
    </React.StrictMode>
);

