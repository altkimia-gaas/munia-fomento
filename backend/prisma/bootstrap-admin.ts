/** Alta/actualización no destructiva de un funcionario ADMINISTRADOR en el
 *  tenant demo. Lee credenciales de entorno (nunca hardcodeadas):
 *    ADMIN_BOOTSTRAP_EMAIL, ADMIN_BOOTSTRAP_PASSWORD, ADMIN_BOOTSTRAP_NOMBRE
 *  Uso: tsx prisma/bootstrap-admin.ts   (con esas vars en el entorno / .env) */
import { PrismaClient, TipoUsuario, RolFuncionario, Modulo, EstadoUsuario, AuthStrategy } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();
const MODULOS = [Modulo.FERIAS, Modulo.CAPACITACION, Modulo.FONDOS];

async function main() {
  const email = (process.env.ADMIN_BOOTSTRAP_EMAIL || '').toLowerCase().trim();
  const pass = process.env.ADMIN_BOOTSTRAP_PASSWORD || '';
  const nombre = process.env.ADMIN_BOOTSTRAP_NOMBRE || 'Administrador';
  if (!email || !pass) throw new Error('Faltan ADMIN_BOOTSTRAP_EMAIL / ADMIN_BOOTSTRAP_PASSWORD');

  const tenant = await prisma.tenant.findFirstOrThrow({ where: { slug: 'demo' } });
  const passwordHash = await argon2.hash(pass);
  const existing = await prisma.usuario.findUnique({ where: { tenantId_email: { tenantId: tenant.id, email } } });

  if (existing) {
    await prisma.usuario.update({ where: { id: existing.id }, data: { passwordHash, estado: EstadoUsuario.ACTIVO, tipo: TipoUsuario.FUNCIONARIO, nombre } });
    await prisma.funcionario.upsert({
      where: { usuarioId: existing.id },
      create: { usuarioId: existing.id, cargo: 'Administrador de Fomento', rol: RolFuncionario.ADMINISTRADOR, modulos: MODULOS },
      update: { rol: RolFuncionario.ADMINISTRADOR, modulos: MODULOS },
    });
    console.log(`✓ Admin actualizado: ${email}`);
  } else {
    await prisma.usuario.create({
      data: {
        tenantId: tenant.id, tipo: TipoUsuario.FUNCIONARIO, nombre, email,
        estado: EstadoUsuario.ACTIVO, authStrategy: AuthStrategy.PASSWORD, passwordHash,
        funcionario: { create: { cargo: 'Administrador de Fomento', rol: RolFuncionario.ADMINISTRADOR, modulos: MODULOS } },
      },
    });
    console.log(`✓ Admin creado: ${email} (rol ADMINISTRADOR, todos los módulos)`);
  }
}

main().catch((e) => { console.error(e.message); process.exit(1); }).finally(() => prisma.$disconnect());
