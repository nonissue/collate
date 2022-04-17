import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData = prisma.user.create({
  data: {
    name: 'Andy',
    email: 'andy@prisma.io',
    lates: {
      create: [
        {
          title: 'Test, no url.',
          url: 'somerandomurl.com',
          tags: {
            create: [
              {
                assignedBy: 'Andy',
                assignedAt: new Date(),
                tag: {
                  create: {
                    title: 'nested-tag-create',
                  },
                },
              },
            ],
          },
        },
      ],
    },
    tags: { create: [{ title: 'test123' }] },
  },
  include: {
    lates: {
      include: {
        tags: true,
      },
    },
  },
});

async function main() {
  console.log(`Start seeding ...`);
  const res = await userData;
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
