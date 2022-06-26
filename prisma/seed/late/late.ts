/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tags = [
  { title: "tag-category-seed-test" },
  { title: "tag-category-seed-test-2" },
];

const fakeLates = prisma.late.create({
  include: { tags: { include: { tag: true } } },
  data: {
    title: "A late, with tags and categories on creation",
    url: "https://andy.ws",
    content: "This late should create both tags and categories when seeded.",
    published: true,
    tags: {
      create: tags.map((tag) => ({
        assignedBy: "Andy",
        assignedAt: new Date(),
        tag: {
          create: {
            title: tag.title,
          },
        },
      })),
    },
    category: {
      create: {
        published: true,
        title: "Books",
      },
    },
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
