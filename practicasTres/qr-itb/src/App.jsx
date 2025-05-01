// IMPORTACIONES
import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import './App.css';

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

  // useEffect: Actualiza el contenido del QR cada 5 segundos
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

  // useEffect: Baja el contador visual cada segundo
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
       <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-sm text-center">
       {/* LOGO */}
       <img
         src="/icon-192.png"
         alt="Logo ITB"
         className="mx-auto mb-4 w-20 h-20"
       />
     
       {/* TÍTULO INSTITUCIONAL */}
       <h1 className="text-4xl font-bold text-[#0077b6] leading-none">ITB</h1>
       <p className="text-sm text-[#0077b6] font-semibold tracking-wide mb-6">
         INSTITUTO TECNOLÓGICO BELTRÁN
       </p>
     
       {/* FORMULARIO */}
       <form onSubmit={handleLogin} className="space-y-4 text-left">
         <div>
         <h2 className="text-2xl font-bold text-[#003f5c] mb-4 text-center">Inicio de sesión</h2>
     
           <label className="text-sm text-gray-700">DNI</label>
           <div className="flex items-center bg-gray-100 rounded-lg px-3">
             <span className="text-gray-400 mr-2">👤</span>
             <input
               type="text"
               value={dni}
               onChange={(e) => setDni(e.target.value)}
               className="w-full py-2 bg-transparent focus:outline-none"
               placeholder="DNI"
             />
           </div>
         </div>
     
         <div>
           <label className="text-sm text-gray-700">Contraseña</label>
           <div className="flex items-center bg-gray-100 rounded-lg px-3">
             <span className="text-gray-400 mr-2">🔒</span>
             <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full py-2 bg-transparent focus:outline-none"
               placeholder="Contraseña"
             />
           </div>
         </div>
     
         <button
           type="submit"
           className="w-full bg-[#0077b6] hover:bg-[#005f94] text-white font-semibold py-2 mt-2 rounded-full transition"
         >
           Iniciar sesión
         </button>
       </form>
     </div>
     

      ) : (
        // MENÚ PRINCIPAL
        <div className="text-center text-gray-800 space-y-4">
          <h2 className="text-2xl font-bold">Bienvenido, DNI {dni}</h2>

          {/* QR dinámico generado */}
          <div className="bg-white p-4 rounded-lg inline-block">
            <QRCode value={JSON.stringify(datosQR)} />
            <p className="text-sm text-gray-500 mt-2">
              Actualización en: <span className="font-bold">{contador}</span> segundos
            </p>
          </div>

          {/* BOTÓN DE CERRAR SESIÓN */}
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow-md"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
