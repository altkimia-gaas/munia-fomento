import { useState } from 'react';
import { Icon } from './Icon';
import { getTheme, toggleTheme } from '../theme';

/** Botón redondo para alternar modo claro/oscuro. Reusa el estilo .notif-btn. */
export function ThemeToggle() {
  const [tema, setTema] = useState(getTheme());
  const oscuro = tema === 'dark';
  return (
    <button
      className="notif-btn"
      aria-label={oscuro ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={oscuro ? 'Modo claro' : 'Modo oscuro'}
      onClick={() => setTema(toggleTheme())}
    >
      <Icon name={oscuro ? 'sun' : 'moon'} />
    </button>
  );
}
