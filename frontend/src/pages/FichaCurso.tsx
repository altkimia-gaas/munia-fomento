import { useParams, Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { FichaShell, NoEncontrado } from '../components/FichaShell';
import { getCurso } from '../data/vitrina';

export function FichaCurso() {
  const { id } = useParams();
  const c = id ? getCurso(id) : undefined;
  if (!c) return <NoEncontrado que="este curso" />;

  return (
    <FichaShell>
      <div className="fx-hero" style={{ backgroundImage: `url(${c.img})` }}>
        <div className="fx-hero-in">
          <span className="chip c-purp">Nivel {c.nivel}</span>
          <h1>{c.nombre}</h1>
          <p><Icon name="cal" size={15} /> Inicia {c.fecha} · {c.sesiones} · <Icon name="cap" size={15} /> {c.modalidad}</p>
        </div>
      </div>
      <div className="fx-wrap">
        <div className="fx-grid">
          <div className="fx-main">
            <section className="card">
              <div className="card-h"><div className="ico"><Icon name="cap" /></div><h3>Sobre el curso</h3></div>
              <p className="fx-lead">{c.descripcion}</p>
            </section>

            <section className="card">
              <div className="card-h"><div className="ico"><Icon name="doc" /></div><h3>Qué aprenderás</h3></div>
              <ul className="fx-list fx-list-num">
                {c.temario.map((t, i) => <li key={t}><span className="fx-num">{i + 1}</span> {t}</li>)}
              </ul>
            </section>

            <section className="card">
              <div className="card-h"><div className="ico"><Icon name="check" /></div><h3>Requisitos</h3></div>
              <ul className="fx-list">{c.requisitos.map((r) => <li key={r}><Icon name="check" size={14} /> {r}</li>)}</ul>
            </section>
          </div>

          <aside className="fx-side">
            <section className="card fx-sticky">
              <div className="fx-data">
                <div><Icon name="cal" size={16} /><div><span>Inicio</span>{c.fecha}</div></div>
                <div><Icon name="dash" size={16} /><div><span>Sesiones</span>{c.sesiones} · {c.duracion}</div></div>
                <div><Icon name="cap" size={16} /><div><span>Modalidad</span>{c.modalidad} · {c.lugar}</div></div>
                <div><Icon name="users" size={16} /><div><span>Cupos</span>{c.cupos}</div></div>
                <div><Icon name="user" size={16} /><div><span>Relator</span>{c.relator}</div></div>
                <div><Icon name="award" size={16} /><div><span>Certificado</span>{c.certificado}</div></div>
                <div><Icon name="money" size={16} /><div><span>Costo</span>{c.costo}</div></div>
              </div>
              <Link to="/login" className="btn-p btn-block" style={{ marginTop: 14 }}><Icon name="plus" /> Inscribirme</Link>
              <p className="fx-note">Para inscribirte necesitas una cuenta en la plataforma.</p>
            </section>
          </aside>
        </div>
      </div>
    </FichaShell>
  );
}
