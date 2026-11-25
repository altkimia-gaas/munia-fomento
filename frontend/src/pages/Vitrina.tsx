import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Icon } from '../components/Icon';
import { ThemeToggle } from '../components/ThemeToggle';
import { api } from '../api/client';
import { EMPRENDEDORES, FERIAS, CURSOS, ph } from '../data/vitrina';

/** Portada pública (vitrina): muestra emprendedores, ferias y capacitaciones. */
function Estrellas({ v }: { v: number }) {
  return <span className="vz-rep"><Icon name="award" size={13} /> {v.toFixed(1)}</span>;
}

export function Vitrina() {
  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: () => api.get<{ authStrategy: string; tenant?: { nombre: string; logoUrl: string | null } | null }>('/api/config'),
  });
  const muni = config?.tenant ?? null;

  return (
    <div className="vz">
      <header className="vz-top">
        <div className="vz-brand">
          {muni?.logoUrl
            ? <img className="muni-logo" src={muni.logoUrl} alt={muni.nombre} style={{ width: 40, height: 40 }} />
            : <div className="side-ico"><Icon name="shield" /></div>}
          <div>
            <div className="side-name" style={{ fontSize: 16 }}><span>Mun</span>IA Fomento</div>
            {muni?.nombre && <div className="muni-name" style={{ textAlign: 'left', marginTop: 0 }}>{muni.nombre}</div>}
          </div>
        </div>
        <nav className="vz-nav">
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#emprendedores">Emprendedores</a>
          <a href="#ferias">Ferias</a>
          <a href="#capacitaciones">Capacitaciones</a>
        </nav>
        <div className="vz-actions">
          <ThemeToggle />
          <Link to="/registro" className="btn-g btn-sm vz-hide-sm"><Icon name="plus" size={14} /> Crear cuenta</Link>
          <Link to="/login" className="btn-p btn-sm"><Icon name="lock" size={14} /> Ingresar</Link>
        </div>
      </header>

      <section className="vz-hero">
        <div className="vz-hero-bg" style={{ backgroundImage: `url(${ph('1768321481665-b40705ab11ce', 1600, 700)})` }} />
        <div className="vz-hero-inner">
          <div className="chip c-info" style={{ marginBottom: 14 }}>Fomento productivo</div>
          <h1>El talento de la comuna, en un solo lugar</h1>
          <p>Conoce a nuestros emprendedores, participa en las ferias y súmate a las capacitaciones del municipio.</p>
          <p className="vz-hero-aud"><Icon name="empr" size={14} /> Los emprendedores participan · <Icon name="shield" size={14} /> el municipio gestiona</p>
          <div className="vz-hero-cta">
            <Link to="/registro" className="btn-p"><Icon name="plus" /> Crear mi cuenta de emprendedor</Link>
            <a href="#emprendedores" className="btn-g">Ver emprendedores</a>
          </div>
        </div>
      </section>

      <section className="vz-mods" id="como-funciona">
        <div className="vz-mods-inner">
          <h2>Todo el fomento, en una plataforma</h2>
          <p className="vz-mods-sub">Tres módulos para acompañar a los emprendimientos de la comuna.</p>
          <div className="vz-mods-grid">
            <div className="vz-mod m-ferias">
              <div className="vz-mod-ico"><Icon name="feria" /></div>
              <h3>Ferias</h3>
              <p>Postula a las ferias de la comuna y vende tus productos al público.</p>
            </div>
            <div className="vz-mod m-cap">
              <div className="vz-mod-ico"><Icon name="cap" /></div>
              <h3>Capacitación</h3>
              <p>Inscríbete en cursos y talleres gratuitos y obtén tu certificado.</p>
            </div>
            <div className="vz-mod m-fondos">
              <div className="vz-mod-ico"><Icon name="money" /></div>
              <h3>Fondos</h3>
              <p>Descubre fondos de financiamiento y postula a los que calzan contigo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="vz-sec" id="emprendedores">
        <div className="vz-sec-head">
          <div>
            <h2>Emprendedores de la comuna</h2>
            <p>Negocios locales que forman parte del programa de fomento.</p>
          </div>
          <Link to="/login" className="vz-more">Ver todos <Icon name="back" size={14} style={{ transform: 'rotate(180deg)' }} /></Link>
        </div>
        <div className="vz-grid">
          {EMPRENDEDORES.map((e) => (
            <Link key={e.id} to={`/emprendedor/${e.id}`} className="vz-card">
              <div className="vz-photo"><img src={e.img} alt={e.nombre} loading="lazy" /><span className="vz-tag">{e.rubro}</span></div>
              <div className="vz-body">
                <div className="vz-card-head"><h3>{e.nombre}</h3><Estrellas v={e.rep} /></div>
                <p className="vz-desc">{e.resumen}</p>
                <div className="vz-meta"><span><Icon name="user" size={13} /> {e.titular}</span><span><Icon name="pin" size={13} /> {e.sector}</span></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="vz-sec vz-sec-alt" id="ferias">
        <div className="vz-sec-head">
          <div>
            <h2>Próximas ferias</h2>
            <p>Espacios para mostrar y vender tus productos.</p>
          </div>
          <Link to="/login" className="vz-more">Postular <Icon name="back" size={14} style={{ transform: 'rotate(180deg)' }} /></Link>
        </div>
        <div className="vz-grid">
          {FERIAS.map((f) => (
            <Link key={f.id} to={`/feria/${f.id}`} className="vz-card">
              <div className="vz-photo"><img src={f.img} alt={f.nombre} loading="lazy" /><span className="vz-date"><b>{f.fecha.split(' ')[0]}</b>{f.fecha.split(' ')[1]}</span></div>
              <div className="vz-body">
                <h3>{f.nombre}</h3>
                <div className="vz-meta"><span><Icon name="pin" size={13} /> {f.lugar}</span><span><Icon name="users" size={13} /> {f.cupos}</span></div>
                <div className="vz-card-foot">
                  <span className={`chip ${f.estado.startsWith('Postulaciones') ? 'c-ok' : 'c-mute'}`}>{f.estado}</span>
                  <span className="vz-ver">Ver detalle →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="vz-sec" id="capacitaciones">
        <div className="vz-sec-head">
          <div>
            <h2>Capacitaciones abiertas</h2>
            <p>Talleres y cursos gratuitos para hacer crecer tu emprendimiento.</p>
          </div>
          <Link to="/login" className="vz-more">Inscribirme <Icon name="back" size={14} style={{ transform: 'rotate(180deg)' }} /></Link>
        </div>
        <div className="vz-grid">
          {CURSOS.map((c) => (
            <Link key={c.id} to={`/curso/${c.id}`} className="vz-card">
              <div className="vz-photo"><img src={c.img} alt={c.nombre} loading="lazy" /><span className="vz-date"><b>{c.fecha.split(' ')[0]}</b>{c.fecha.split(' ')[1]}</span></div>
              <div className="vz-body">
                <h3>{c.nombre}</h3>
                <div className="vz-meta"><span><Icon name="cap" size={13} /> {c.modalidad}</span><span><Icon name="users" size={13} /> {c.cupos}</span></div>
                <div className="vz-card-foot">
                  <span className="chip c-purp">Nivel {c.nivel}</span>
                  <span className="vz-ver">Ver detalle →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="vz-cta2">
        <div className="vz-cta2-inner">
          <div className="vz-cta2-card accent">
            <div className="vz-cta2-ico"><Icon name="empr" /></div>
            <h3>¿Tienes un emprendimiento?</h3>
            <p>Crea tu cuenta y participa en ferias, capacitaciones y fondos de la comuna.</p>
            <Link to="/registro" className="btn-p"><Icon name="plus" /> Crear mi cuenta</Link>
          </div>
          <div className="vz-cta2-card">
            <div className="vz-cta2-ico"><Icon name="shield" /></div>
            <h3>¿Eres funcionario municipal?</h3>
            <p>Ingresa para gestionar los programas de fomento de tu comuna.</p>
            <Link to="/login" className="btn-g"><Icon name="lock" /> Ingresar</Link>
          </div>
        </div>
      </section>

      <footer className="vz-foot">
        <div><span className="side-name" style={{ fontSize: 15 }}><span>Mun</span>IA Fomento</span> · Suite de fomento productivo municipal</div>
        <div className="vz-foot-links">
          <Link to="/login">Ingresar</Link>
          <Link to="/registro">Crear cuenta</Link>
          <span className="mono" style={{ color: 'var(--muted-2)' }}>Datos de demostración</span>
        </div>
      </footer>
    </div>
  );
}
