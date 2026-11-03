import 'dotenv/config';

import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
//
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('Starting HAGL database seed...');

  // 1. Create HAGL team
  const team = await prisma.team.upsert({
    where: {
      shortName: 'HAGL',
    },
    update: {},
    create: {
      name: 'Hoàng Anh Gia Lai',
      shortName: 'HAGL',
      stadium: 'Pleiku Stadium',
      foundedYear: 2001,
    },
  });

  console.log('Team created:', team.name);

  // 2. Insert demo matches
  await prisma.match.deleteMany({
    where: {
      teamId: team.id,
    },
  });

  await prisma.match.createMany({
    data: [
      {
        teamId: team.id,
        opponent: 'Hà Nội FC',
        matchDate: new Date('2026-11-15T12:00:00.000Z'),
        competition: 'V.League 1',
        status: 'SCHEDULED',
        isHome: true,
      },
      {
        teamId: team.id,
        opponent: 'Thể Công - Viettel',
        matchDate: new Date('2026-11-22T12:00:00.000Z'),
        competition: 'V.League 1',
        status: 'SCHEDULED',
        isHome: false,
      },
      {
        teamId: team.id,
        opponent: 'SHB Đà Nẵng',
        matchDate: new Date('2026-11-29T12:00:00.000Z'),
        competition: 'V.League 1',
        status: 'SCHEDULED',
        isHome: true,
      },
    ],
  });

  console.log('Demo matches inserted successfully!');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });