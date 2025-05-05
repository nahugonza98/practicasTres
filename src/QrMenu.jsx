import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

function QrMenu({ dni, datosQR, contador, handleLogout, installPromptEvent, showInstallButton, setShowInstallButton  }) {
  // Estado que activa la animación cada vez que se actualiza el QR
  const [animarQR, setAnimarQR] = useState(false);

  useEffect(() => {
    // Cada vez que datosQR cambia, se activa la animación por 300ms
    setAnimarQR(true);
    const timeout = setTimeout(() => setAnimarQR(false), 300);
    return () => clearTimeout(timeout);
  }, [datosQR]);

  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-sm text-center space-y-4">
      {/* LOGO */}
      <img src="/icon-192.png" alt="Logo ITB" className="mx-auto w-16 h-16" />

      {/* TÍTULO INSTITUCIONAL */}
      <h1 className="text-4xl font-bold text-[#0077b6]">ITB</h1>
      <p className="text-sm font-semibold text-[#0077b6] tracking-wide">
        INSTITUTO TECNOLÓGICO BELTRÁN
      </p>

      {/* MENSAJE DE BIENVENIDA */}
      <h2 className="text-2xl font-bold text-[#0077b6]">Bienvenido</h2>

      {/* QR CON ANIMACIÓN DE ZOOM SUAVE */}
      <div
        className={`p-4 bg-white rounded-xl border border-gray-200 shadow-md inline-block transition-transform duration-300 ${
          animarQR ? 'scale-110' : 'scale-100'
        }`}
      >
        <QRCode value={JSON.stringify(datosQR)} size={180} />
      </div>

      {/* DNI DEL USUARIO EN TEXTO NEGRO */}
      <p className="text-lg font-semibold text-black">DNI {dni}</p>

      {/* CONTADOR DE ACTUALIZACIÓN */}
      <p className="text-sm text-[#003f5c]">
        Actualización en: <span className="font-bold">{contador}</span> segundos
      </p>


      {/* BOTÓN DE CERRAR SESIÓN */}
      <button
        onClick={handleLogout}
        className="w-full active:scale-95
 bg-[#0077b6] hover:bg-[#005f94] text-white font-semibold py-2 rounded-full shadow-md transition-all duration-300 ease-in-out"
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default QrMenu;
