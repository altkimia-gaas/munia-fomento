import { useParams, Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { FichaShell, NoEncontrado } from '../components/FichaShell';
import { getFeria, getEmprendedor } from '../data/vitrina';

export function FichaFeria() {
  const { id } = useParams();
  const f = id ? getFeria(id) : undefined;
  if (!f) return <NoEncontrado que="esta feria" />;
  const abierta = f.estado.toLowerCase().startsWith('postulaciones');

  return (
    <FichaShell>
      <div className="fx-hero" style={{ backgroundImage: `url(${f.img})` }}>
        <div className="fx-hero-in">
          <span className={`chip ${abierta ? 'c-ok' : 'c-mute'}`}>{f.estado}</span>
          <h1>{f.nombre}</h1>
          <p><Icon name="cal" size={15} /> {f.fechaLarga} · {f.horario} · <Icon name="pin" size={15} /> {f.lugar}</p>
        </div>
      </div>
      <div className="fx-wrap">
        <div className="fx-grid">
          <div className="fx-main">
            <section className="card">
              <div className="card-h"><div className="ico"><Icon name="feria" /></div><h3>Sobre la feria</h3></div>
              <p className="fx-lead">{f.descripcion}</p>
              <p className="fx-text"><strong>Objetivo:</strong> {f.objetivo}</p>
            </section>

            <section className="card">
              <div className="card-h"><div className="ico"><Icon name="check" /></div><h3>Requisitos para postular</h3></div>
              <ul className="fx-list">
                {f.requisitos.map((r) => <li key={r}><Icon name="check" size={14} /> {r}</li>)}
              </ul>
              <div className="fx-chips" style={{ marginTop: 12 }}>
                <span className="fx-cond-l" style={{ marginRight: 8 }}>Rubros:</span>
                {f.rubros.map((r) => <span key={r} className="rubro">{r}</span>)}
              </div>
            </section>

            <section className="card">
              <div className="card-h"><div className="ico"><Icon name="empr" /></div><h3>Expositores confirmados</h3></div>
              <div className="fx-exp">
                {f.expositores.map((eid) => {
                  const e = getEmprendedor(eid);
                  return e ? (
                    <Link key={eid} to={`/emprendedor/${e.id}`} className="fx-exp-card">
                      <img src={e.img} alt={e.nombre} loading="lazy" />
                      <div><div className="fx-exp-n">{e.nombre}</div><div className="fx-exp-r">{e.rubro}</div></div>
                    </Link>
                  ) : null;
                })}
              </div>
            </section>

            <section className="card">
              <div className="card-h"><div className="ico"><Icon name="feria" /></div><h3>Galería</h3></div>
              <div className="fx-gallery">{f.galeria.map((src, i) => <img key={i} src={src} alt={`${f.nombre} ${i + 1}`} loading="lazy" />)}</div>
            </section>
          </div>

          <aside className="fx-side">
            <section className="card fx-sticky">
              <div className="fx-data">
                <div><Icon name="cal" size={16} /><div><span>Fecha</span>{f.fechaLarga}</div></div>
                <div><Icon name="dash" size={16} /><div><span>Horario</span>{f.horario}</div></div>
                <div><Icon name="pin" size={16} /><div><span>Lugar</span>{f.lugar}<br /><span className="fx-dim">{f.direccion}</span></div></div>
                <div><Icon name="users" size={16} /><div><span>Cupos</span>{f.cupos}</div></div>
                <div><Icon name="money" size={16} /><div><span>Costo</span>{f.costo}</div></div>
              </div>
              <Link to="/login" className="btn-p btn-block" style={{ marginTop: 14 }}><Icon name="plus" /> {abierta ? 'Postular a la feria' : 'Avísame cuando abra'}</Link>
              <p className="fx-note">Para postular necesitas una cuenta de emprendedor.</p>
            </section>
          </aside>
        </div>
      </div>
    </FichaShell>
  );
}
