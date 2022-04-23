import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const tags = [
  { title: 'tag-category-seed-test' },
  { title: 'tag-category-seed-test-2' },
];

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    lates: {
      create: [
        {
          url: 'test.com',
          title: 'Seeding with test.com',
          tags: {
            create: tags.map((tag) => ({
              assignedBy: 'Alice',
              assignedAt: new Date(),
              tag: {
                create: {
                  title: tag.title,
                },
              },
            })),
          },
          category: { create: { title: 'books' } },
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    lates: {
      create: [
        {
          url: 'nonissue.org',
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    lates: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          url: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
        },
        {
          title: 'Prisma on YouTube',
          url: 'https://pris.ly/youtube',
        },
      ],
    },
  },
];

// const tagData: Prisma.TagCreateInput[] = [
//   { title: 'seeded-tag-one' },
//   { title: 'seeded-tag-two' },
//   { title: 'seeded-tag-three' },
// ];

async function main() {
  console.log(`Start seeding ...`);

  const users = [];
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    users.push(user);
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(users);
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
