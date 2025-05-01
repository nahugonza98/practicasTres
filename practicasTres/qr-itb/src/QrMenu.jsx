// QrMenu.jsx
import React from 'react';
import QRCode from 'react-qr-code';

function QrMenu({ dni, datosQR, contador, handleLogout }) {
  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-sm text-center space-y-4">
      {/* LOGO */}
      <img src="/icon-192.png" alt="Logo ITB" className="mx-auto w-16 h-16" />

      {/* TÍTULO */}
      <h1 className="text-4xl font-bold text-[#0077b6]">ITB</h1>
      <p className="text-sm font-semibold text-[#0077b6] tracking-wide">
        INSTITUTO TECNOLÓGICO BELTRÁN
      </p>

      <h2 className="text-2xl font-bold text-[#0077b6]">Bienvenido</h2>

      {/* QR */}
      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-md inline-block">
        <QRCode value={JSON.stringify(datosQR)} size={180} />
      </div>

      {/* DNI EN NEGRO */}
      <p className="text-lg font-semibold text-black">DNI {dni}</p>

      {/* CONTADOR DE ACTUALIZACIÓN */}
      <p className="text-sm text-[#003f5c]">
        Actualización en: <span className="font-bold">{contador}</span> segundos
      </p>

      {/* BOTÓN DE CERRAR SESIÓN */}
      <button
        onClick={handleLogout}
        className="w-full bg-[#0077b6] hover:bg-[#005f94] text-white font-semibold py-2 rounded-full shadow-md transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default QrMenu;
