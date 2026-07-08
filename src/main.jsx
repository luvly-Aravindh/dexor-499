// Root entry - not used directly.
// Each page has its own entry in src/entries/.
// This file exists so Vite resolves /src/main.jsx references without errors.
import { createRoot } from 'react-dom/client';

const el = document.getElementById('root');
if (el) {
  createRoot(el).render(<div style={{padding:'2rem',fontFamily:'sans-serif'}}>
    Root entry loaded. Navigate to a specific page.
  </div>);
}
