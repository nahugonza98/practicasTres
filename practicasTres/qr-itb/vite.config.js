// Importa la función que permite definir la configuración de Vite
import { defineConfig } from 'vite'

// Importa el plugin oficial de React para Vite
import react from '@vitejs/plugin-react'

// Importa el plugin que permite convertir la app en una PWA
import { VitePWA } from 'vite-plugin-pwa'

// Exporta la configuración del proyecto usando defineConfig
export default defineConfig({
  plugins: [
    react(), // Activa el soporte de React en Vite

    // Configuración del plugin para PWA
    VitePWA({
      registerType: 'autoUpdate', // Permite que la app se actualice automáticamente cuando hay una nueva versión

      // Configuración del manifiesto de la PWA
      manifest: {
        name: 'Acceso ITB',         // Nombre completo de la app (se muestra en la pantalla de instalación)
        short_name: 'ITB',          // Nombre corto que aparece en el ícono si hay poco espacio
        start_url: '/',             // Página inicial al abrir la app
        display: 'standalone',      // Hace que se vea como una app real (sin barra del navegador)
        background_color: '#ffffff',// Color de fondo de la pantalla de carga
        theme_color: '#0d6efd',     // Color de la barra superior del sistema (en Android por ejemplo)

        // Íconos que se usan para mostrar en el inicio del celular o PC
        icons: [
          {
            src: '/icon192-192.png',   // Ruta del ícono en tamaño 192x192 (requerido)
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon512-512.png',   // Ruta del ícono en tamaño 512x512 (recomendado)
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
