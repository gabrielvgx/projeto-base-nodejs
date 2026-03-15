import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter_sqlite = new PrismaBetterSqlite3({ url: connectionString });
const adapter_pg = new PrismaPg({ connectionString });

const adapter = connectionString.startsWith('postgre') ? adapter_pg : adapter_sqlite;

export const prisma = new PrismaClient({ adapter });
