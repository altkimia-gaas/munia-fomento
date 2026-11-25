import { useState, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Icon } from '../../components/Icon';
import { useAuth } from '../../auth/auth';
import { api } from '../../api/client';
import { FOTOS_DEMO, slugify, type Emprendedor, type Producto } from '../../data/vitrina';

const clone = (e: Emprendedor): Emprendedor => JSON.parse(JSON.stringify(e));
const PAGOS = ['Efectivo', 'Transferencia', 'Débito / Crédito', 'WebPay', 'Mercado Pago'];

export function MiFicha() {
  const { usuario } = useAuth();
  const esEmp = !!usuario?.emprendedor;

  const { data: cargada } = useQuery({
    queryKey: ['mi-ficha'],
    queryFn: () => api.get<{ ficha: Emprendedor }>('/api/emprendedor/ficha').then((r) => r.ficha),
    enabled: esEmp,
  });
  const [f, setF] = useState<Emprendedor | null>(null);
  const [guardado, setGuardado] = useState(false);
  useEffect(() => { if (cargada) setF(clone(cargada)); }, [cargada]);

  const guardarMut = useMutation({
    mutationFn: (ficha: Emprendedor) => api.patch('/api/emprendedor/ficha', ficha),
    onSuccess: () => setGuardado(true),
  });

  if (!esEmp) {
    return <div className="view"><div className="empty"><Icon name="lock" /><h4>Sólo para emprendedores</h4><p>Esta sección permite editar tu ficha pública de la vitrina.</p></div></div>;
  }
  if (!f) {
    return <div className="view"><div className="center-screen" style={{ minHeight: 220 }}><span className="spinner" style={{ borderTopColor: 'var(--teal)', width: 26, height: 26 }} /></div></div>;
  }

  const fid = f.id || slugify(f.nombre) || 'mi-emprendimiento';
  const esNueva = f.productos.length === 0 && !f.historia;

  const set = (patch: Partial<Emprendedor>) => { setF({ ...f, ...patch }); setGuardado(false); };
  const setCom = (patch: Partial<Emprendedor['comercial']>) => set({ comercial: { ...f.comercial, ...patch } });
  const setCon = (patch: Partial<Emprendedor['contacto']>) => set({ contacto: { ...f.contacto, ...patch } });
  const togglePago = (p: string) => setCom({ pagos: f.comercial.pagos.includes(p) ? f.comercial.pagos.filter((x) => x !== p) : [...f.comercial.pagos, p] });

  const addFoto = (url: string) => { if (url && !f.galeria.includes(url)) set({ galeria: [...f.galeria, url], img: f.img || url }); };
  const quitarFoto = (url: string) => set({ galeria: f.galeria.filter((x) => x !== url), img: f.img === url ? (f.galeria.find((x) => x !== url) ?? '') : f.img });

  const addProd = () => set({ productos: [...f.productos, { nombre: '', precio: 0, desc: '', img: FOTOS_DEMO[f.productos.length % FOTOS_DEMO.length] }] });
  const setProd = (i: number, patch: Partial<Producto>) => set({ productos: f.productos.map((p, idx) => (idx === i ? { ...p, ...patch } : p)) });
  const delProd = (i: number) => set({ productos: f.productos.filter((_, idx) => idx !== i) });

  const guardar = () => {
    const limpio: Emprendedor = { ...f, id: fid, img: f.img || f.galeria[0] || FOTOS_DEMO[0], resumen: f.resumen || f.historia.slice(0, 90) };
    setF(clone(limpio));
    guardarMut.mutate(limpio);
  };

  const Fld = ({ label, children }: { label: string; children: ReactNode }) => (
    <div className="field"><label>{label}</label>{children}</div>
  );

  return (
    <div className="view mf">
      <div className="hub-head" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <h2>Mi ficha pública</h2>
          <p>Todo lo que edites aquí se muestra en tu ficha de la vitrina, para que la comuna te conozca, te compre y te siga.</p>
        </div>
        <div style={{ display: 'flex', gap: '.6rem' }}>
          <Link to={`/emprendedor/${fid}`} className="btn-g" target="_blank"><Icon name="compass" /> Ver mi ficha</Link>
          <button className="btn-p" onClick={guardar} disabled={guardarMut.isPending}>{guardarMut.isPending ? <span className="spinner" /> : <><Icon name="check" /> Guardar</>}</button>
        </div>
      </div>

      {guardado && <div className="alert alert-info" style={{ marginBottom: '1.2rem' }}><Icon name="check" /> Ficha guardada. Ya está publicada en tu <Link to={`/emprendedor/${fid}`} target="_blank" style={{ color: 'var(--teal-light)', fontWeight: 600 }}>ficha pública →</Link></div>}
      {esNueva && !guardado && <div className="alert alert-info" style={{ marginBottom: '1.2rem' }}><Icon name="sparkle" /> Aún no tienes ficha. Complétala para aparecer en la vitrina de la comuna.</div>}

      <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr', alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <section className="card">
            <div className="card-h"><div className="ico"><Icon name="doc" /></div><h3>Descripción</h3></div>
            <Fld label="Nombre del emprendimiento"><input value={f.nombre} onChange={(e) => set({ nombre: e.target.value })} /></Fld>
            <div className="grid g2">
              <Fld label="Rubro"><input value={f.rubro} onChange={(e) => set({ rubro: e.target.value })} placeholder="Gastronomía, Textil…" /></Fld>
              <Fld label="Sector"><input value={f.sector} onChange={(e) => set({ sector: e.target.value })} placeholder="Centro, Lo Orozco…" /></Fld>
            </div>
            <Fld label="Resumen (una línea)"><input value={f.resumen} onChange={(e) => set({ resumen: e.target.value })} placeholder="Mermeladas artesanales de fruta de la zona." /></Fld>
            <Fld label="Historia del emprendimiento"><textarea value={f.historia} onChange={(e) => set({ historia: e.target.value })} placeholder="Cuenta cómo partió, qué vende y qué lo hace especial." /></Fld>
          </section>

          <section className="card">
            <div className="card-h"><div className="ico"><Icon name="feria" /></div><h3>Galería de fotos</h3><span className="act mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{f.galeria.length} fotos</span></div>
            {f.galeria.length > 0 && (
              <div className="mf-gal">
                {f.galeria.map((src) => (
                  <div key={src} className="mf-gal-it"><img src={src} alt="" /><button onClick={() => quitarFoto(src)} aria-label="Quitar"><Icon name="plus" size={14} style={{ transform: 'rotate(45deg)' }} /></button></div>
                ))}
              </div>
            )}
            <p className="mf-hint">En producción subes tus propias fotos. En el demo, agrega desde los ejemplos o pega una URL:</p>
            <div className="mf-pool">{FOTOS_DEMO.filter((u) => !f.galeria.includes(u)).slice(0, 8).map((u) => <button key={u} className="mf-pool-it" onClick={() => addFoto(u)} style={{ backgroundImage: `url(${u})` }} aria-label="Agregar foto" />)}</div>
            <UrlAdd onAdd={addFoto} placeholder="https://…/foto.jpg" />
          </section>

          <section className="card">
            <div className="card-h"><div className="ico"><Icon name="money" /></div><h3>Catálogo de productos</h3><button className="btn-g btn-xs act" onClick={addProd}><Icon name="plus" size={13} /> Agregar</button></div>
            {f.productos.length === 0 && <p className="mf-hint">Aún no hay productos. Agrega el primero con su foto y precio.</p>}
            <div style={{ display: 'grid', gap: 10 }}>
              {f.productos.map((p, i) => (
                <div key={i} className="mf-prod">
                  <button className="mf-prod-img" style={{ backgroundImage: `url(${p.img})` }} onClick={() => setProd(i, { img: FOTOS_DEMO[(FOTOS_DEMO.indexOf(p.img) + 1) % FOTOS_DEMO.length] })} aria-label="Cambiar foto" />
                  <div className="mf-prod-f">
                    <div className="grid" style={{ gridTemplateColumns: '1fr 120px', gap: 8 }}>
                      <input value={p.nombre} onChange={(e) => setProd(i, { nombre: e.target.value })} placeholder="Nombre del producto" />
                      <input type="number" value={p.precio || ''} onChange={(e) => setProd(i, { precio: Number(e.target.value) })} placeholder="Precio $" />
                    </div>
                    <input value={p.desc} onChange={(e) => setProd(i, { desc: e.target.value })} placeholder="Descripción corta (formato, tamaño…)" />
                  </div>
                  <button className="mf-del" onClick={() => delProd(i)} aria-label="Eliminar"><Icon name="plus" size={15} style={{ transform: 'rotate(45deg)' }} /></button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <section className="card">
            <div className="card-h"><div className="ico"><Icon name="check" /></div><h3>Condiciones comerciales</h3></div>
            <Fld label="Medios de pago">
              <div className="mf-chips">{PAGOS.map((p) => <button key={p} className={`mf-chip ${f.comercial.pagos.includes(p) ? 'on' : ''}`} onClick={() => togglePago(p)}>{p}</button>)}</div>
            </Fld>
            <Fld label="Despacho / retiro"><input value={f.comercial.despacho} onChange={(e) => setCom({ despacho: e.target.value })} placeholder="Despacho en la comuna · retiro en local" /></Fld>
            <Fld label="Pedido mínimo"><input value={f.comercial.minimo} onChange={(e) => setCom({ minimo: e.target.value })} placeholder="Sin pedido mínimo" /></Fld>
            <Fld label="Horario de atención"><input value={f.comercial.horario} onChange={(e) => setCom({ horario: e.target.value })} placeholder="Lun a sáb · 10:00–19:00" /></Fld>
            <Fld label="Promoción (opcional)"><input value={f.comercial.promo ?? ''} onChange={(e) => setCom({ promo: e.target.value })} placeholder="10% dcto. llevando 3 o más" /></Fld>
          </section>

          <section className="card">
            <div className="card-h"><div className="ico"><Icon name="inbox" /></div><h3>Contacto</h3></div>
            <Fld label="WhatsApp"><input value={f.contacto.whatsapp} onChange={(e) => setCon({ whatsapp: e.target.value })} placeholder="+56 9 1234 5678" /></Fld>
            <Fld label="Instagram"><input value={f.contacto.instagram} onChange={(e) => setCon({ instagram: e.target.value })} placeholder="@miemprendimiento" /></Fld>
            <Fld label="Correo"><input value={f.contacto.correo} onChange={(e) => setCon({ correo: e.target.value })} placeholder="hola@correo.cl" /></Fld>
            <Fld label="Dirección"><input value={f.contacto.direccion} onChange={(e) => setCon({ direccion: e.target.value })} placeholder="Calle y número, Casablanca" /></Fld>
          </section>

          <button className="btn-p btn-block" onClick={guardar} disabled={guardarMut.isPending}><Icon name="check" /> Guardar y publicar</button>
        </div>
      </div>
    </div>
  );
}

function UrlAdd({ onAdd, placeholder }: { onAdd: (u: string) => void; placeholder: string }) {
  const [v, setV] = useState('');
  return (
    <div className="chat-input" style={{ marginTop: 10 }}>
      <input value={v} onChange={(e) => setV(e.target.value)} placeholder={placeholder} />
      <button className="btn-g btn-sm" onClick={() => { onAdd(v.trim()); setV(''); }}><Icon name="plus" size={14} /> Agregar</button>
    </div>
  );
}
