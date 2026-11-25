import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Icon } from '../components/Icon';
import { ThemeToggle } from '../components/ThemeToggle';
import { api } from '../api/client';

/** Portada pública (vitrina): muestra emprendedores, ferias y capacitaciones.
 *  Datos de prueba; fotos ad-hoc desde Unsplash (CDN, uso libre). */
const ph = (id: string, w = 800, h = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=70&auto=format`;

const EMPRENDEDORES = [
  { nombre: 'Delicias del Valle', titular: 'María Fuentes', rubro: 'Gastronomía', sector: 'Centro', rep: 4.8, desc: 'Mermeladas y conservas artesanales de fruta de la zona.', img: ph('1791436105236-f4d94f5e7928') },
  { nombre: 'Cerámica Tierra Viva', titular: 'Rodrigo Pizarro', rubro: 'Artesanía', sector: 'Lo Orozco', rep: 4.6, desc: 'Cerámica utilitaria y decorativa hecha a torno.', img: ph('1781358463802-219111e5e0ae') },
  { nombre: 'Hilos del Valle', titular: 'Carolina Reyes', rubro: 'Textil', sector: 'Centro', rep: 4.9, desc: 'Tejidos a telar y vestuario en lana natural teñida.', img: ph('1752401984784-74bb3b095745') },
  { nombre: 'Cuero & Greda', titular: 'Jorge Tapia', rubro: 'Marroquinería', sector: 'Sector Norte', rep: 4.5, desc: 'Marroquinería en cuero y piezas en greda.', img: ph('1763795258711-f4e07b4faf10') },
  { nombre: 'Aromas del Secano', titular: 'Daniela Soto', rubro: 'Cosmética', sector: 'Las Dichas', rep: 4.7, desc: 'Jabones y cosmética natural con hierbas locales.', img: ph('1777892505702-86b4e422d33e') },
  { nombre: 'Miel de la Cuesta', titular: 'Pedro Salinas', rubro: 'Apicultura', sector: 'Lagunillas', rep: 4.8, desc: 'Miel y derivados de colmenas del secano costero.', img: ph('1760727467662-5f0943d196a8') },
];

const FERIAS = [
  { nombre: 'Expo Productores 2026', fecha: '6 dic', lugar: 'Plaza de Armas', cupos: '12 cupos', estado: 'Postulaciones abiertas', img: ph('1789544115602-292c9074f71a') },
  { nombre: 'Feria Costumbrista de Verano', fecha: '20 dic', lugar: 'Parque Municipal', cupos: '20 cupos', estado: 'Postulaciones abiertas', img: ph('1771148887605-ef0a11c91bb9') },
  { nombre: 'Mercado de Emprendedoras', fecha: '11 ene', lugar: 'Costanera', cupos: '15 cupos', estado: 'Próximamente', img: ph('1781947486936-8ce638c5ede9') },
];

const CURSOS = [
  { nombre: 'Cerámica y esmaltado', fecha: '2 dic', modalidad: 'Presencial', cupos: '8 cupos', nivel: 'Inicial', img: ph('1753164725746-8d9263a23edf') },
  { nombre: 'Finanzas básicas para tu negocio', fecha: '9 dic', modalidad: 'Presencial', cupos: '25 cupos', nivel: 'Todos', img: ph('1757085242652-f8cd4d3de889') },
  { nombre: 'Marketing digital y redes', fecha: '16 dic', modalidad: 'Online', cupos: 'Sin tope', nivel: 'Inicial', img: ph('1787725075492-b44e0b17fb01') },
];

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
          <a href="#emprendedores">Emprendedores</a>
          <a href="#ferias">Ferias</a>
          <a href="#capacitaciones">Capacitaciones</a>
        </nav>
        <div className="vz-actions">
          <ThemeToggle />
          <Link to="/login" className="btn-g btn-sm"><Icon name="lock" size={14} /> Ingresar</Link>
        </div>
      </header>

      <section className="vz-hero">
        <div className="vz-hero-bg" style={{ backgroundImage: `url(${ph('1768321481665-b40705ab11ce', 1600, 700)})` }} />
        <div className="vz-hero-inner">
          <div className="chip c-info" style={{ marginBottom: 14 }}>Fomento productivo</div>
          <h1>El talento de la comuna, en un solo lugar</h1>
          <p>Conoce a nuestros emprendedores, participa en las ferias y súmate a las capacitaciones del municipio.</p>
          <div className="vz-hero-cta">
            <Link to="/registro" className="btn-p"><Icon name="plus" /> Crear mi cuenta de emprendedor</Link>
            <a href="#emprendedores" className="btn-g">Ver emprendedores</a>
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
            <article key={e.nombre} className="vz-card">
              <div className="vz-photo"><img src={e.img} alt={e.nombre} loading="lazy" /><span className="vz-tag">{e.rubro}</span></div>
              <div className="vz-body">
                <div className="vz-card-head"><h3>{e.nombre}</h3><Estrellas v={e.rep} /></div>
                <p className="vz-desc">{e.desc}</p>
                <div className="vz-meta"><span><Icon name="user" size={13} /> {e.titular}</span><span><Icon name="pin" size={13} /> {e.sector}</span></div>
              </div>
            </article>
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
            <article key={f.nombre} className="vz-card">
              <div className="vz-photo"><img src={f.img} alt={f.nombre} loading="lazy" /><span className="vz-date"><b>{f.fecha.split(' ')[0]}</b>{f.fecha.split(' ')[1]}</span></div>
              <div className="vz-body">
                <h3>{f.nombre}</h3>
                <div className="vz-meta"><span><Icon name="pin" size={13} /> {f.lugar}</span><span><Icon name="users" size={13} /> {f.cupos}</span></div>
                <div className="vz-card-foot">
                  <span className={`chip ${f.estado.startsWith('Postulaciones') ? 'c-ok' : 'c-mute'}`}>{f.estado}</span>
                  <Link to="/login" className="btn-p btn-xs">Postular</Link>
                </div>
              </div>
            </article>
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
            <article key={c.nombre} className="vz-card">
              <div className="vz-photo"><img src={c.img} alt={c.nombre} loading="lazy" /><span className="vz-date"><b>{c.fecha.split(' ')[0]}</b>{c.fecha.split(' ')[1]}</span></div>
              <div className="vz-body">
                <h3>{c.nombre}</h3>
                <div className="vz-meta"><span><Icon name="cap" size={13} /> {c.modalidad}</span><span><Icon name="users" size={13} /> {c.cupos}</span></div>
                <div className="vz-card-foot">
                  <span className="chip c-purp">Nivel {c.nivel}</span>
                  <Link to="/login" className="btn-p btn-xs">Inscribirme</Link>
                </div>
              </div>
            </article>
          ))}
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
