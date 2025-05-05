// IMPORTACIONES
import { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import QrMenu from './QrMenu';

function App() {
  // ESTADOS PRINCIPALES
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorDni, setErrorDni] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  


  // Estado para datos del QR
  const [datosQR, setDatosQR] = useState({
    dni: '',
    timestamp: ''
  });

  // Estado para el contador visual de actualización
  const [contador, setContador] = useState(5);

  // 🔁 EFECTO UNIFICADO para manejar contador + actualización del QR
  useEffect(() => {
    if (loggedIn) {
      const interval = setInterval(() => {
        // Bajamos el contador
        setContador((prev) => {
          if (prev === 1) {
            // Cuando llega a 1, actualizamos el QR y reiniciamos el contador
            setDatosQR({
              dni: dni,
              timestamp: new Date().toISOString()
            });
            return 5;
          } else {
            // Si no, seguimos bajando
            return prev - 1;
          }
        });
      }, 1000);

      return () => clearInterval(interval); // Limpiar si se desmonta o desloguea
    }
  }, [loggedIn, dni]);

  //EFECTO INSTALACION 

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Evita que aparezca automáticamente
      setInstallPromptEvent(e); // Guardamos el evento
      setShowInstallButton(true); // Mostramos el botón
    };
  
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);
  
  // FUNCIÓN de login (simulada)
  const handleLogin = (e) => {
    e.preventDefault();

    let valid = true;
    setErrorDni('');
    setErrorPass('');

    // Validación del DNI
    if (!/^\d{7,8}$/.test(dni)) {
      setErrorDni('El DNI debe tener entre 7 y 8 dígitos numéricos');
      valid = false;
    }

    // Validación de la contraseña
    if (password.length < 6) {
      setErrorPass('La contraseña debe tener al menos 6 caracteres');
      valid = false;
    }

    // Si hay errores, no continúa
    if (!valid) return;

    localStorage.setItem('usuario', JSON.stringify({ dni }));
    setLoggedIn(true);
  };


  // FUNCIÓN para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setDni('');
    setPassword('');
    setLoggedIn(false);
  };

  // RENDER
  return (
    <div className="h-screen bg-[#E0F7FA] flex items-center justify-center px-4 font-roboto">
      {!loggedIn ? (
        <div className="animate-fade">
          <LoginForm
            dni={dni}
            setDni={setDni}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            errorDni={errorDni}
            errorPass={errorPass}
          />

        </div>
      ) : (
        <div className="animate-fade">
          <QrMenu
            dni={dni}
            datosQR={datosQR}
            contador={contador}
            handleLogout={handleLogout}
          />
        </div>
      )}
    </div>
  );
}

export default App;
