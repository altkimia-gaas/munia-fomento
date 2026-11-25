import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Icon } from './Icon';
import { ThemeToggle } from './ThemeToggle';
import { api } from '../api/client';

/** Caparazón público para las fichas (header de vuelta a la vitrina + pie). */
export function FichaShell({ children }: { children: ReactNode }) {
  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: () => api.get<{ tenant?: { nombre: string; logoUrl: string | null } | null }>('/api/config'),
  });
  const muni = config?.tenant ?? null;
  return (
    <div className="vz">
      <header className="vz-top">
        <Link to="/" className="vz-brand" style={{ color: 'inherit' }}>
          {muni?.logoUrl
            ? <img className="muni-logo" src={muni.logoUrl} alt={muni.nombre} style={{ width: 38, height: 38 }} />
            : <div className="side-ico"><Icon name="shield" /></div>}
          <div>
            <div className="side-name" style={{ fontSize: 15 }}><span>Mun</span>IA Fomento</div>
            {muni?.nombre && <div className="muni-name" style={{ textAlign: 'left', marginTop: 0 }}>{muni.nombre}</div>}
          </div>
        </Link>
        <div className="vz-actions">
          <Link to="/" className="vz-back vz-hide-sm"><Icon name="back" size={15} /> Volver a la vitrina</Link>
          <ThemeToggle />
          <Link to="/login" className="btn-p btn-sm"><Icon name="lock" size={14} /> Ingresar</Link>
        </div>
      </header>
      {children}
      <footer className="vz-foot">
        <div><span className="side-name" style={{ fontSize: 15 }}><span>Mun</span>IA Fomento</span> · Suite de fomento productivo municipal</div>
        <div className="vz-foot-links">
          <Link to="/">Vitrina</Link>
          <Link to="/login">Ingresar</Link>
          <span className="mono" style={{ color: 'var(--muted-2)' }}>Datos de demostración</span>
        </div>
      </footer>
    </div>
  );
}

export function NoEncontrado({ que }: { que: string }) {
  return (
    <FichaShell>
      <div className="fx-wrap">
        <div className="empty" style={{ padding: '4rem 1.5rem' }}>
          <Icon name="info" />
          <h4>No encontramos {que}</h4>
          <p>Puede que el enlace sea antiguo o el elemento ya no esté disponible.</p>
          <Link to="/" className="btn-g"><Icon name="back" /> Volver a la vitrina</Link>
        </div>
      </div>
    </FichaShell>
  );
}
