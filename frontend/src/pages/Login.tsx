import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Icon } from '../components/Icon';
import { ThemeToggle } from '../components/ThemeToggle';
import { FomentoHero } from '../components/FomentoHero';
import { api, ApiError } from '../api/client';
import { useAuth } from '../auth/auth';

export function Login() {
  const nav = useNavigate();
  const { refrescar } = useAuth();
  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: () => api.get<{ authStrategy: string; tenant?: { nombre: string; logoUrl: string | null; colorAccent: string | null } | null }>('/api/config'),
  });
  const claveUnica = config?.authStrategy === 'clave_unica';
  const muni = config?.tenant ?? null;
  const [modoFuncionario, setModo] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const demo = import.meta.env.VITE_DEMO === 'true';

  const ingresar = async (correo: string, clave: string) => {
    setError(''); setCargando(true);
    try {
      await api.post('/api/auth/login', { email: correo, password: clave });
      refrescar();
      nav('/app');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión');
    } finally {
      setCargando(false);
    }
  };
  const enviar = (e: React.FormEvent) => { e.preventDefault(); void ingresar(email, password); };

  const DEMO_ROLES = [
    { label: 'Administradora', sub: 'Daniela · todos los módulos', email: 'admin@municipio.demo.cl' },
    { label: 'Evaluadora', sub: 'Claudia · Ferias', email: 'evaluador@municipio.demo.cl' },
    { label: 'Jefatura', sub: 'Sergio · sólo dashboards', email: 'jefatura@municipio.demo.cl' },
    { label: 'Emprendedora', sub: 'María · con historial', email: 'maria.fuentes@example.cl' },
    { label: 'Emprendedor nuevo', sub: 'Roberto · sin historial', email: 'roberto.diaz@example.cl' },
  ];

  return (
    <div className="auth-wrap" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 18, right: 18 }}><ThemeToggle /></div>
      <div className="auth-card">
        <div className="auth-hero"><FomentoHero /></div>
        <div className="auth-brand">
          {muni?.logoUrl
            ? <img className="muni-logo" src={muni.logoUrl} alt={muni.nombre} />
            : <div className="side-ico"><Icon name="shield" /></div>}
          <div className="side-name"><span>Mun</span>IA Fomento</div>
        </div>
        {muni?.nombre && <div className="muni-name">{muni.nombre}</div>}
        <p className="auth-bajada">Plataforma de fomento productivo municipal: ferias, capacitación y fondos para hacer crecer los emprendimientos de la comuna.</p>
        <div className="auth-sub">{modoFuncionario ? 'Acceso funcionarios municipales' : 'Portal del emprendedor'}</div>

        {error && <div className="alert alert-bad" style={{ marginBottom: '1rem' }}><Icon name="info" />{error}</div>}

        {demo && (
          <div style={{ marginBottom: '1.4rem' }}>
            <div className="alert alert-info" style={{ marginBottom: 12 }}><Icon name="sparkle" />Demo interactiva · datos de ejemplo en tu navegador (no persisten). Entra con un clic:</div>
            <div className="role-grid">
              {DEMO_ROLES.map((r) => (
                <button key={r.email} className="role-box" disabled={cargando} onClick={() => ingresar(r.email, 'demo1234')}>
                  <div className="role-ico"><Icon name={r.email.includes('example') ? 'empr' : 'user'} /></div>
                  <div className="role-txt">
                    <div className="role-label">{r.label}</div>
                    <div className="role-sub">{r.sub}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="divider">o con correo y contraseña (demo1234)</div>
          </div>
        )}

        {claveUnica && (
          <>
            <a className="btn-p btn-block" href="/api/auth/clave-unica/start"><Icon name="shield" /> Ingresar con ClaveÚnica</a>
            <div className="divider">o con tu correo</div>
          </>
        )}

        <form onSubmit={enviar}>
          <div className="field">
            <label>Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus placeholder="tu@correo.cl" />
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <button className="btn-p btn-block" disabled={cargando}>
            {cargando ? <span className="spinner" /> : <>Iniciar sesión <Icon name="back" style={{ transform: 'rotate(180deg)' }} /></>}
          </button>
        </form>

        {!modoFuncionario && (
          <>
            <div className="divider">o</div>
            <Link to="/registro" className="btn-g btn-block"><Icon name="plus" /> Crear mi cuenta de emprendedor</Link>
          </>
        )}

        <div className="auth-foot">
          {modoFuncionario ? (
            <button className="um-item" style={{ justifyContent: 'center', color: 'var(--teal-light)' }} onClick={() => setModo(false)}>← Soy emprendedor</button>
          ) : (
            <button onClick={() => setModo(true)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 12.5 }}>
              <Icon name="lock" size={13} style={{ verticalAlign: '-2px', marginRight: 5 }} />Acceso funcionarios municipales →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
