// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { ModalProvider } from './context/ModalContext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </AuthProvider>,
  //  </StrictMode>
);
