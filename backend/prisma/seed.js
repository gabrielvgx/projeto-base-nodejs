import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient, UserRole } from '../src/generated/prisma/client.js';
const adapter = new PrismaBetterSqlite3({ url: process.env['DATABASE_URL'] || '' });
export const prisma = new PrismaClient({ adapter });

const passwordHash = '$2b$10$MS8IavIvPIjdjW.WfKPrQOOFlqLHxUxZTlPVsluxKpLKutgqwUI0K'; // abc123

async function main() {

  const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      profile: UserRole.admin,
    },
    {
      name: 'Customer User',
      email: 'customer@example.com',
      profile: UserRole.customer,
    }
  ];

  for (const userData of users) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      await prisma.user.delete({
        where: { email: userData.email },
      });
      console.log(`Usuário existente removido: ${userData.email}`);
    }

    const userToSave = {
      name: userData.name,
      email: userData.email,
      password: passwordHash,
      profile: userData.profile,
      isActive: true,
    }

    if (userData.id) {
      userToSave.id = userData.id;
    }

    const user = await prisma.user.create({
      data: userToSave,
    });

    console.log(`Usuário criado - ID:${user.id} | E-mail: ${user.email}`);
  }

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());