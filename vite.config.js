import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        'index': resolve(__dirname, 'index.html'),
        'p499-optin': resolve(__dirname, 'dexkor-499-optin.html'),
        'p499-landing': resolve(__dirname, 'dexkor-499-landing.html'),
        'p499-order': resolve(__dirname, 'dexkor-499-order.html'),
        'p499-thankyou': resolve(__dirname, 'dexkor-499-thankyou.html'),
      },
    },
  },
});
