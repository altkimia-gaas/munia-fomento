import { useParams, Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { FichaShell, NoEncontrado } from '../components/FichaShell';
import { getEmprendedor, getFeria, CLP } from '../data/vitrina';

const wa = (n: string) => 'https://wa.me/' + n.replace(/[^\d]/g, '');
const ig = (h: string) => 'https://instagram.com/' + h.replace('@', '');

export function FichaEmprendedor() {
  const { id } = useParams();
  const e = id ? getEmprendedor(id) : undefined;
  if (!e) return <NoEncontrado que="este emprendimiento" />;

  return (
    <FichaShell>
      <div className="fx-cover" style={{ backgroundImage: `url(${e.img})` }} />
      <div className="fx-wrap">
        <div className="fx-head">
          <img className="fx-avatar" src={e.img} alt={e.nombre} />
          <div className="fx-head-txt">
            <h1>{e.nombre} {e.verificado && <span className="chip c-ok"><Icon name="check" size={12} /> Verificado</span>}</h1>
            <p className="fx-sub">{e.rubro} · {e.sector}, Casablanca · <span className="vz-rep"><Icon name="award" size={13} /> {e.rep.toFixed(1)}</span> · {e.anios} años</p>
          </div>
          <div className="fx-head-act">
            <a className="btn-p" href={wa(e.contacto.whatsapp)} target="_blank" rel="noreferrer"><Icon name="send" /> Contactar</a>
            <a className="btn-g" href={ig(e.contacto.instagram)} target="_blank" rel="noreferrer"><Icon name="sparkle" /> Seguir</a>
          </div>
        </div>

        <div className="fx-grid">
          <div className="fx-main">
            <section className="card">
              <div className="card-h"><div className="ico"><Icon name="doc" /></div><h3>Sobre el emprendimiento</h3></div>
              <p className="fx-lead">{e.resumen}</p>
              <p className="fx-text">{e.historia}</p>
            </section>

            <section className="card">
              <div className="card-h"><div className="ico"><Icon name="feria" /></div><h3>Galería</h3></div>
              <div className="fx-gallery">
                {e.galeria.map((src, i) => <img key={i} src={src} alt={`${e.nombre} ${i + 1}`} loading="lazy" />)}
              </div>
            </section>

            <section className="card">
              <div className="card-h"><div className="ico"><Icon name="money" /></div><h3>Catálogo de productos</h3></div>
              <div className="fx-prods">
                {e.productos.map((p) => (
                  <div key={p.nombre} className="fx-prod">
                    <img src={p.img} alt={p.nombre} loading="lazy" />
                    <div className="fx-prod-b">
                      <div className="fx-prod-top"><span className="fx-prod-n">{p.nombre}</span><span className="fx-prod-p">{CLP(p.precio)}</span></div>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="card-h"><div className="ico"><Icon name="check" /></div><h3>Condiciones comerciales</h3></div>
              <div className="fx-cond">
                <div><span className="fx-cond-l">Medios de pago</span><div className="fx-chips">{e.comercial.pagos.map((p) => <span key={p} className="rubro">{p}</span>)}</div></div>
                <div><span className="fx-cond-l">Despacho</span><p>{e.comercial.despacho}</p></div>
                <div><span className="fx-cond-l">Pedido mínimo</span><p>{e.comercial.minimo}</p></div>
                <div><span className="fx-cond-l">Horario</span><p>{e.comercial.horario}</p></div>
                {e.comercial.promo && <div><span className="fx-cond-l">Promoción</span><p className="fx-promo"><Icon name="sparkle" size={13} /> {e.comercial.promo}</p></div>}
              </div>
            </section>
          </div>

          <aside className="fx-side">
            <section className="card">
              <div className="card-h"><div className="ico"><Icon name="inbox" /></div><h3>Contacto</h3></div>
              <a className="fx-link" href={wa(e.contacto.whatsapp)} target="_blank" rel="noreferrer"><Icon name="send" size={15} /> {e.contacto.whatsapp}</a>
              <a className="fx-link" href={ig(e.contacto.instagram)} target="_blank" rel="noreferrer"><Icon name="sparkle" size={15} /> {e.contacto.instagram}</a>
              <a className="fx-link" href={`mailto:${e.contacto.correo}`}><Icon name="inbox" size={15} /> {e.contacto.correo}</a>
              <div className="fx-addr"><Icon name="pin" size={15} /> {e.contacto.direccion}</div>
            </section>

            {e.ferias.length > 0 && (
              <section className="card">
                <div className="card-h"><div className="ico"><Icon name="feria" /></div><h3>Dónde encontrarlo</h3></div>
                {e.ferias.map((fid) => {
                  const f = getFeria(fid);
                  return f ? <Link key={fid} to={`/feria/${f.id}`} className="fx-link"><Icon name="cal" size={15} /> {f.nombre} · {f.fecha}</Link> : null;
                })}
              </section>
            )}

            <section className="card">
              <div className="card-h"><div className="ico"><Icon name="award" /></div><h3>Trayectoria</h3></div>
              <p className="fx-text">Participa en el programa de fomento desde hace {e.anios} años, con presencia en ferias de la comuna{e.verificado ? ' y emprendimiento verificado por el municipio' : ''}.</p>
            </section>
          </aside>
        </div>
      </div>
    </FichaShell>
  );
}
