// IMPORTACIONES
import { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import QrMenu from './QrMenu'; // 👈 Importamos el componente del QR

function App() {
  // ESTADOS
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const [datosQR, setDatosQR] = useState({
    dni: '',
    timestamp: ''
  });

  const [contador, setContador] = useState(5);

  // Actualiza QR cada 5 segundos
  useEffect(() => {
    if (loggedIn) {
      const interval = setInterval(() => {
        setDatosQR({
          dni: dni,
          timestamp: new Date().toISOString()
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [loggedIn, dni]);

  // Baja el contador cada segundo
  useEffect(() => {
    if (loggedIn) {
      const interval = setInterval(() => {
        setContador((prev) => (prev === 1 ? 5 : prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [loggedIn]);

  // FUNCIONES
  const handleLogin = (e) => {
    e.preventDefault();
    if (!dni || !password) {
      alert('Por favor, complete todos los campos');
      return;
    }
    localStorage.setItem('usuario', JSON.stringify({ dni }));
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setDni('');
    setPassword('');
    setLoggedIn(false);
  };

  // RENDER
  return (
    <div className="min-h-screen bg-[#E0F7FA] flex items-center justify-center px-4">
      {!loggedIn ? (
        <LoginForm
          dni={dni}
          setDni={setDni}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <QrMenu
          dni={dni}
          datosQR={datosQR}
          contador={contador}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
