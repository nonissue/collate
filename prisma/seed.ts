/* eslint-disable */
import { faker } from "@faker-js/faker";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const tags = [
  { title: "tag-category-seed-test" },
  { title: "tag-category-seed-test-2" },
];

const generateFakeUser = () => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
  };
};

const generateFakeLate = () => {
  return {
    url: `https://${faker.internet.domainName()}/${faker.internet.domainWord()}`,
    title: faker.company.bs(),
    content: faker.lorem.sentence(),
    published: faker.datatype.boolean(),
  };
};

const generateFakeTag = () => {
  return {
    title: faker.company.bsNoun(),
  };
};

// @ts-ignore
const generateAndConnectFakeTags = async () => {
  const userName = await prisma.user.findFirst({ select: { name: true } });

  return {
    assignedBy: userName,
    assignedAt: new Date(),
    tag: {
      ...generateFakeTag(),
    },
  };
};

const userData: Prisma.UserCreateInput[] = [
  {
    ...generateFakeUser(),
    lates: {
      create: [
        {
          ...generateFakeLate(),
          tags: {
            create: tags.map((tag) => ({
              // TODO: Need a way to reference an existing user or the user we just created...
              assignedBy: "Alice",
              assignedAt: new Date(),
              tag: {
                create: {
                  title: tag.title,
                },
              },
            })),
          },
          category: {
            connectOrCreate: {
              where: { title: "books" },
              create: { title: "books" },
            },
          },
        },
      ],
    },
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
    lates: {
      create: [
        {
          ...generateFakeLate(),
          category: {
            connectOrCreate: {
              where: { title: "movies" },
              create: { title: "movies" },
            },
          },
        },
        {
          ...generateFakeLate(),
          category: {
            connectOrCreate: {
              where: { title: "movies" },
              create: { title: "movies" },
            },
          },
        },
      ],
    },
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
    lates: {
      create: [
        {
          title: "Ask a question about Prisma on GitHub",
          url: "https://www.github.com/prisma/prisma/discussions",
          published: true,
          tags: {
            create: {
              // TODO: Need a way to reference an existing user or the user we just created...
              assignedBy: "Mahmoud",
              assignedAt: new Date(),
              tag: {
                create: {
                  ...generateFakeTag(),
                },
              },
            },
          },
        },
        {
          title: "Prisma on YouTube",
          url: "https://pris.ly/youtube",
        },
      ],
    },
  },
];

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
