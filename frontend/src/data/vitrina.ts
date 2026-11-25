/** Datos de demostración de la vitrina pública: emprendedores, ferias y cursos,
 *  con fichas completas (galería, catálogo con precios, condiciones comerciales
 *  y administrativas, contacto). Fotos ad-hoc de Unsplash (CDN, uso libre).
 *  En producción estos datos vienen de la API; aquí son de prueba. */

export const ph = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=70&auto=format`;

const CLP = (n: number) => '$' + n.toLocaleString('es-CL');

export interface Producto { nombre: string; precio: number; desc: string; img: string }
export interface Comercial { pagos: string[]; despacho: string; minimo: string; horario: string; promo?: string }
export interface Contacto { whatsapp: string; instagram: string; correo: string; direccion: string }

export interface Emprendedor {
  id: string; nombre: string; titular: string; rubro: string; sector: string; rep: number;
  anios: number; verificado: boolean; resumen: string; historia: string;
  img: string; galeria: string[]; productos: Producto[]; comercial: Comercial; contacto: Contacto;
  ferias: string[]; // ids de ferias donde estará
}

export interface Feria {
  id: string; nombre: string; fecha: string; fechaLarga: string; horario: string; lugar: string;
  direccion: string; cupos: string; estado: string; img: string; galeria: string[];
  descripcion: string; objetivo: string; rubros: string[]; costo: string; requisitos: string[];
  expositores: string[]; // ids de emprendedores confirmados
}

export interface Curso {
  id: string; nombre: string; fecha: string; sesiones: string; modalidad: string; lugar: string;
  cupos: string; nivel: string; img: string; descripcion: string; temario: string[];
  requisitos: string[]; relator: string; certificado: string; costo: string; duracion: string;
}

export { CLP };

export const EMPRENDEDORES: Emprendedor[] = [
  {
    id: 'delicias-del-valle', nombre: 'Delicias del Valle', titular: 'María Fuentes', rubro: 'Gastronomía', sector: 'Centro', rep: 4.8, anios: 6, verificado: true,
    resumen: 'Mermeladas y conservas artesanales de fruta de la zona.',
    historia: 'Nace en 2019 en la cocina de María, rescatando recetas de su abuela. Hoy produce mermeladas, conservas y salsas con fruta de huertos de Casablanca, sin conservantes ni colorantes.',
    img: ph('1791436105236-f4d94f5e7928'),
    galeria: [ph('1791436105236-f4d94f5e7928'), ph('1777892505702-86b4e422d33e'), ph('1760727467662-5f0943d196a8'), ph('1763795258711-f4e07b4faf10')],
    productos: [
      { nombre: 'Mermelada de frutilla', precio: 3500, desc: 'Frasco 250 g, fruta de temporada.', img: ph('1791436105236-f4d94f5e7928', 400, 400) },
      { nombre: 'Pack 3 conservas', precio: 9000, desc: 'Durazno, damasco y ciruela.', img: ph('1777892505702-86b4e422d33e', 400, 400) },
      { nombre: 'Salsa de ají casera', precio: 2800, desc: 'Frasco 180 g, picor medio.', img: ph('1760727467662-5f0943d196a8', 400, 400) },
    ],
    comercial: { pagos: ['Efectivo', 'Transferencia', 'Débito / Crédito'], despacho: 'Despacho a domicilio en Casablanca · retiro en local', minimo: 'Sin pedido mínimo', horario: 'Lun a sáb · 10:00–19:00', promo: '10% dcto. llevando 3 o más frascos' },
    contacto: { whatsapp: '+56 9 8765 4321', instagram: '@deliciasdelvalle', correo: 'hola@deliciasdelvalle.cl', direccion: 'Av. Portales 145, Casablanca' },
    ferias: ['expo-productores', 'feria-costumbrista'],
  },
  {
    id: 'ceramica-tierra-viva', nombre: 'Cerámica Tierra Viva', titular: 'Rodrigo Pizarro', rubro: 'Artesanía', sector: 'Lo Orozco', rep: 4.6, anios: 4, verificado: true,
    resumen: 'Cerámica utilitaria y decorativa hecha a torno.',
    historia: 'Taller de cerámica a torno con esmaltes propios inspirados en la paleta del secano costero. Cada pieza es única, cocida en horno a alta temperatura.',
    img: ph('1781358463802-219111e5e0ae'),
    galeria: [ph('1781358463802-219111e5e0ae'), ph('1763795258711-f4e07b4faf10'), ph('1753164725746-8d9263a23edf')],
    productos: [
      { nombre: 'Tazón de greda esmaltado', precio: 8900, desc: 'Apto horno y microondas.', img: ph('1781358463802-219111e5e0ae', 400, 400) },
      { nombre: 'Juego de 4 tazas', precio: 28000, desc: 'Tonos tierra, hechas a mano.', img: ph('1763795258711-f4e07b4faf10', 400, 400) },
    ],
    comercial: { pagos: ['Efectivo', 'Transferencia'], despacho: 'Retiro en taller · despacho por pagar', minimo: 'Pedidos por encargo desde 4 piezas', horario: 'Mar a sáb · 11:00–18:00' },
    contacto: { whatsapp: '+56 9 7654 3210', instagram: '@ceramicatierraviva', correo: 'taller@tierraviva.cl', direccion: 'Camino Lo Orozco km 4, Casablanca' },
    ferias: ['expo-productores', 'mercado-emprendedoras'],
  },
  {
    id: 'hilos-del-valle', nombre: 'Hilos del Valle', titular: 'Carolina Reyes', rubro: 'Textil', sector: 'Centro', rep: 4.9, anios: 7, verificado: true,
    resumen: 'Tejidos a telar y vestuario en lana natural teñida.',
    historia: 'Carolina teje a telar con lana de oveja hilada y teñida con tintes naturales. Chales, mantas y vestuario pensados para durar generaciones.',
    img: ph('1752401984784-74bb3b095745'),
    galeria: [ph('1752401984784-74bb3b095745'), ph('1771148887605-ef0a11c91bb9'), ph('1775919422010-a363264f344b')],
    productos: [
      { nombre: 'Chal de lana teñida', precio: 24000, desc: 'Tinte natural de cebolla y nogal.', img: ph('1752401984784-74bb3b095745', 400, 400) },
      { nombre: 'Manta a telar', precio: 45000, desc: '1,2 × 1,8 m, lana 100%.', img: ph('1775919422010-a363264f344b', 400, 400) },
    ],
    comercial: { pagos: ['Efectivo', 'Transferencia', 'Débito / Crédito'], despacho: 'Despacho a todo Chile por pagar', minimo: 'Sin pedido mínimo', horario: 'A convenir por WhatsApp', promo: 'Envío gratis sobre $60.000' },
    contacto: { whatsapp: '+56 9 6543 2109', instagram: '@hilosdelvalle', correo: 'carolina@hilosdelvalle.cl', direccion: 'Pasaje Los Aromos 32, Casablanca' },
    ferias: ['feria-costumbrista', 'mercado-emprendedoras'],
  },
  {
    id: 'cuero-y-greda', nombre: 'Cuero & Greda', titular: 'Jorge Tapia', rubro: 'Marroquinería', sector: 'Sector Norte', rep: 4.5, anios: 5, verificado: false,
    resumen: 'Marroquinería en cuero y piezas en greda.',
    historia: 'Jorge trabaja el cuero a mano: billeteras, bolsos y cinturones con costura tradicional, combinados con piezas en greda de su socia.',
    img: ph('1763795258711-f4e07b4faf10'),
    galeria: [ph('1763795258711-f4e07b4faf10'), ph('1781358463802-219111e5e0ae'), ph('1768321481665-b40705ab11ce')],
    productos: [
      { nombre: 'Billetera de cuero', precio: 15900, desc: 'Cuero vacuno, cosida a mano.', img: ph('1763795258711-f4e07b4faf10', 400, 400) },
      { nombre: 'Bolso bandolera', precio: 39000, desc: 'Cuero natural, forro interior.', img: ph('1768321481665-b40705ab11ce', 400, 400) },
    ],
    comercial: { pagos: ['Efectivo', 'Transferencia'], despacho: 'Retiro en feria o punto acordado', minimo: 'Sin pedido mínimo', horario: 'Fines de semana en ferias' },
    contacto: { whatsapp: '+56 9 5432 1098', instagram: '@cueroygreda', correo: 'jorge@cueroygreda.cl', direccion: 'Sector Norte, Casablanca' },
    ferias: ['mercado-emprendedoras'],
  },
  {
    id: 'aromas-del-secano', nombre: 'Aromas del Secano', titular: 'Daniela Soto', rubro: 'Cosmética', sector: 'Las Dichas', rep: 4.7, anios: 3, verificado: true,
    resumen: 'Jabones y cosmética natural con hierbas locales.',
    historia: 'Cosmética natural artesanal: jabones, bálsamos y aceites con lavanda, romero y caléndula cultivadas en Las Dichas.',
    img: ph('1777892505702-86b4e422d33e'),
    galeria: [ph('1777892505702-86b4e422d33e'), ph('1760727467662-5f0943d196a8'), ph('1791436105236-f4d94f5e7928')],
    productos: [
      { nombre: 'Jabón de lavanda', precio: 2500, desc: 'Barra 100 g, aceite de oliva.', img: ph('1777892505702-86b4e422d33e', 400, 400) },
      { nombre: 'Set regalo 3 jabones', precio: 6500, desc: 'Lavanda, romero y caléndula.', img: ph('1760727467662-5f0943d196a8', 400, 400) },
    ],
    comercial: { pagos: ['Efectivo', 'Transferencia', 'Débito / Crédito'], despacho: 'Despacho nacional · retiro en Las Dichas', minimo: 'Sin pedido mínimo', horario: 'Lun a vie · 10:00–18:00', promo: '3x2 en jabones seleccionados' },
    contacto: { whatsapp: '+56 9 4321 0987', instagram: '@aromasdelsecano', correo: 'daniela@aromasdelsecano.cl', direccion: 'Las Dichas s/n, Casablanca' },
    ferias: ['expo-productores'],
  },
  {
    id: 'miel-de-la-cuesta', nombre: 'Miel de la Cuesta', titular: 'Pedro Salinas', rubro: 'Apicultura', sector: 'Lagunillas', rep: 4.8, anios: 9, verificado: true,
    resumen: 'Miel y derivados de colmenas del secano costero.',
    historia: 'Apicultor hace 9 años. Miel multifloral, propóleo y cera de colmenas ubicadas en la cuesta de Lagunillas, con manejo responsable de las abejas.',
    img: ph('1760727467662-5f0943d196a8'),
    galeria: [ph('1760727467662-5f0943d196a8'), ph('1789544115602-292c9074f71a'), ph('1791436105236-f4d94f5e7928')],
    productos: [
      { nombre: 'Miel multifloral 500 g', precio: 5000, desc: 'Cosecha de temporada, pura.', img: ph('1760727467662-5f0943d196a8', 400, 400) },
      { nombre: 'Propóleo en gotas', precio: 4200, desc: 'Frasco 30 ml con gotario.', img: ph('1789544115602-292c9074f71a', 400, 400) },
    ],
    comercial: { pagos: ['Efectivo', 'Transferencia'], despacho: 'Retiro en Lagunillas · despacho en Casablanca', minimo: 'Sin pedido mínimo', horario: 'Todos los días · 09:00–20:00' },
    contacto: { whatsapp: '+56 9 3210 9876', instagram: '@mieldelacuesta', correo: 'pedro@mieldelacuesta.cl', direccion: 'Cuesta de Lagunillas, Casablanca' },
    ferias: ['expo-productores', 'feria-costumbrista'],
  },
];

export const FERIAS: Feria[] = [
  {
    id: 'expo-productores', nombre: 'Expo Productores 2026', fecha: '6 dic', fechaLarga: 'Sábado 6 de diciembre de 2026', horario: '10:00 – 20:00', lugar: 'Plaza de Armas', direccion: 'Plaza de Armas, Casablanca', cupos: '12 cupos disponibles', estado: 'Postulaciones abiertas',
    img: ph('1789544115602-292c9074f71a'), galeria: [ph('1789544115602-292c9074f71a'), ph('1781947486936-8ce638c5ede9'), ph('1771148887605-ef0a11c91bb9')],
    descripcion: 'Vitrina de los productores de la comuna: gastronomía, agrícola y artesanía, con música en vivo y espacio para la familia.',
    objetivo: 'Dar visibilidad y ventas directas a los emprendimientos locales en el corazón de la comuna.',
    rubros: ['Gastronomía', 'Agrícola', 'Artesanía'], costo: 'Stand gratuito (provisto por el municipio)',
    requisitos: ['Estar registrado como emprendedor de la comuna', 'Resolución sanitaria vigente (rubro alimentos)', 'Inicio de actividades en SII', 'Producción propia (no reventa)'],
    expositores: ['delicias-del-valle', 'ceramica-tierra-viva', 'aromas-del-secano', 'miel-de-la-cuesta'],
  },
  {
    id: 'feria-costumbrista', nombre: 'Feria Costumbrista de Verano', fecha: '20 dic', fechaLarga: 'Sábado 20 y domingo 21 de diciembre de 2026', horario: '11:00 – 21:00', lugar: 'Parque Municipal', direccion: 'Parque Municipal, Casablanca', cupos: '20 cupos disponibles', estado: 'Postulaciones abiertas',
    img: ph('1771148887605-ef0a11c91bb9'), galeria: [ph('1771148887605-ef0a11c91bb9'), ph('1752401984784-74bb3b095745'), ph('1775919422010-a363264f344b')],
    descripcion: 'Dos días de tradición: cocina típica, artesanía, bailes y juegos criollos para toda la familia.',
    objetivo: 'Celebrar las tradiciones locales y potenciar el turismo y el comercio de verano.',
    rubros: ['Gastronomía', 'Artesanía', 'Textil'], costo: 'Stand gratuito · toldo por cuenta del expositor',
    requisitos: ['Estar registrado como emprendedor de la comuna', 'Rubro acorde a la feria', 'Disponibilidad los dos días'],
    expositores: ['delicias-del-valle', 'hilos-del-valle', 'miel-de-la-cuesta'],
  },
  {
    id: 'mercado-emprendedoras', nombre: 'Mercado de Emprendedoras', fecha: '11 ene', fechaLarga: 'Sábado 11 de enero de 2027', horario: '10:00 – 18:00', lugar: 'Costanera', direccion: 'Costanera, Casablanca', cupos: '15 cupos', estado: 'Próximamente',
    img: ph('1781947486936-8ce638c5ede9'), galeria: [ph('1781947486936-8ce638c5ede9'), ph('1752401984784-74bb3b095745'), ph('1763795258711-f4e07b4faf10')],
    descripcion: 'Feria que destaca el trabajo de mujeres emprendedoras de la comuna, con charlas y networking.',
    objetivo: 'Visibilizar y conectar a las emprendedoras locales.',
    rubros: ['Todos los rubros'], costo: 'Stand gratuito',
    requisitos: ['Emprendimiento liderado por mujer', 'Estar registrado como emprendedor de la comuna'],
    expositores: ['hilos-del-valle', 'ceramica-tierra-viva', 'cuero-y-greda'],
  },
];

export const CURSOS: Curso[] = [
  {
    id: 'ceramica-esmaltado', nombre: 'Cerámica y esmaltado', fecha: '2 dic', sesiones: '4 sesiones (mar y jue)', modalidad: 'Presencial', lugar: 'Casa de la Cultura', cupos: '8 cupos', nivel: 'Inicial', duracion: '16 horas',
    img: ph('1753164725746-8d9263a23edf'),
    descripcion: 'Taller práctico de cerámica a mano y torno, con introducción al esmaltado y la cocción.',
    temario: ['Preparación y amasado de la greda', 'Técnicas a mano: pellizco y rollo', 'Introducción al torno', 'Esmaltado y cocción'],
    requisitos: ['Mayor de 18 años', 'Ropa que se pueda ensuciar', 'No requiere experiencia previa'],
    relator: 'Rodrigo Pizarro · Cerámica Tierra Viva', certificado: 'Certificado de participación municipal', costo: 'Gratuito',
  },
  {
    id: 'finanzas-basicas', nombre: 'Finanzas básicas para tu negocio', fecha: '9 dic', sesiones: '3 sesiones (lun)', modalidad: 'Presencial', lugar: 'Biblioteca Municipal', cupos: '25 cupos', nivel: 'Todos', duracion: '9 horas',
    img: ph('1757085242652-f8cd4d3de889'),
    descripcion: 'Aprende a ordenar las cuentas de tu emprendimiento, calcular precios y separar lo personal de lo del negocio.',
    temario: ['Ingresos, costos y margen', 'Cómo poner precio a tus productos', 'Flujo de caja simple', 'Formalización e inicio de actividades'],
    requisitos: ['Tener o estar iniciando un emprendimiento', 'Llevar cuaderno o notebook'],
    relator: 'Equipo de Fomento Productivo', certificado: 'Certificado de participación municipal', costo: 'Gratuito',
  },
  {
    id: 'marketing-digital', nombre: 'Marketing digital y redes', fecha: '16 dic', sesiones: '4 sesiones (mié)', modalidad: 'Online', lugar: 'Vía videollamada', cupos: 'Sin tope', nivel: 'Inicial', duracion: '8 horas',
    img: ph('1787725075492-b44e0b17fb01'),
    descripcion: 'Da a conocer tu emprendimiento en Instagram y WhatsApp: fotos de producto, catálogo y publicaciones que venden.',
    temario: ['Fotografía de producto con el celular', 'Catálogo e Instagram Shopping', 'WhatsApp Business', 'Calendario de publicaciones'],
    requisitos: ['Tener un emprendimiento activo', 'Cuenta de Instagram', 'Conexión a internet'],
    relator: 'Equipo de Fomento Productivo', certificado: 'Certificado de participación municipal', costo: 'Gratuito',
  },
];

export const getEmprendedor = (id: string) => EMPRENDEDORES.find((e) => e.id === id);
export const getFeria = (id: string) => FERIAS.find((f) => f.id === id);
export const getCurso = (id: string) => CURSOS.find((c) => c.id === id);
