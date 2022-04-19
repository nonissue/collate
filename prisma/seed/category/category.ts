/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// const tags = [
//   { title: 'connectOrCreateTest1' },
//   { title: 'connectOrCreateTest2' },
// ];

const fakeLates = prisma.category.create({
  //   include: { tags: { include: { tag: true } } },
  data: {
    title: 'Books',
    published: true,
  },
});

async function main() {
  console.log(`Start seeding ...`);
  const res = await fakeLates;
  console.log(res);
  //   for (const u of userData) {
  //     const user = await prisma.user.create({
  //       data: u,
  //     });
  //     console.log(`Created user with id: ${user.id}`);
  //   }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
