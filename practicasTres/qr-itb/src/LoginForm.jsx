// LoginForm.jsx
import React from 'react';

function LoginForm({ dni, setDni, password, setPassword, handleLogin }) {
  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-sm text-center">
      {/* LOGO */}
      <img src="/icon-192.png" alt="Logo ITB" className="mx-auto mb-4 w-20 h-20" />

      {/* TÍTULO INSTITUCIONAL */}
      <h1 className="text-4xl font-bold text-[#0077b6] leading-none">ITB</h1>
      <p className="text-sm text-[#0077b6] font-semibold tracking-wide mb-6">
        INSTITUTO TECNOLÓGICO BELTRÁN
      </p>

      {/* FORMULARIO */}
      <form onSubmit={handleLogin} className="space-y-4 text-left">
        <h2 className="text-2xl font-bold text-[#003f5c] mb-4 text-center">Inicio de sesión</h2>

        <div>
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
  );
}

export default LoginForm;
