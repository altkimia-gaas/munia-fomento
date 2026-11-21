/** Ilustración de fomento productivo: puestos de feria (los tres módulos) sobre
 *  barras de crecimiento. Usa tokens de tema, así que se adapta a claro/oscuro. */
export function FomentoHero() {
  const Stall = ({ x, color }: { x: number; color: string }) => (
    <g transform={`translate(${x},0)`}>
      {/* postes */}
      <rect x="-5" y="62" width="4" height="58" rx="1.5" fill="var(--muted-2)" />
      <rect x="83" y="62" width="4" height="58" rx="1.5" fill="var(--muted-2)" />
      {/* mesón */}
      <rect x="-10" y="104" width="102" height="9" rx="2" fill={color} />
      <rect x="-10" y="113" width="102" height="11" fill={color} opacity="0.3" />
      {/* género sobre el mesón */}
      <circle cx="12" cy="100" r="4.5" fill={color} opacity="0.85" />
      <circle cx="26" cy="100" r="4.5" fill={color} opacity="0.6" />
      <circle cx="64" cy="100" r="4.5" fill={color} opacity="0.6" />
      {/* toldo */}
      <rect x="-12" y="48" width="106" height="14" rx="3" fill={color} />
      <path d="M-12,62 q13.25,13 26.5,0 q13.25,13 26.5,0 q13.25,13 26.5,0 q13.25,13 26.5,0 v-3 h-106 z" fill={color} opacity="0.92" />
    </g>
  );
  return (
    <svg className="hero-art" viewBox="0 0 460 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* sol/halo */}
      <circle cx="230" cy="150" r="104" fill="var(--teal)" opacity="0.08" />
      {/* barras de crecimiento */}
      <g>
        <rect x="24" y="100" width="13" height="28" rx="2.5" fill="var(--teal)" opacity="0.30" />
        <rect x="41" y="86" width="13" height="42" rx="2.5" fill="var(--teal)" opacity="0.45" />
        <rect x="58" y="70" width="13" height="58" rx="2.5" fill="var(--teal)" opacity="0.62" />
      </g>
      {/* puestos: Ferias, Capacitación, Fondos */}
      <Stall x={120} color="var(--mod-ferias)" />
      <Stall x={238} color="var(--mod-cap)" />
      <Stall x={356} color="var(--mod-fondos)" />
      {/* suelo */}
      <line x1="12" y1="124" x2="448" y2="124" stroke="var(--border)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
