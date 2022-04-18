/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// const userData = prisma.user.create({
//   data: {
//     name: 'Andy',
//     email: 'andy@prisma.io',
//     lates: {
//       create: [
//         {
//           title: 'Test, no url.',
//           url: 'somerandomurl.com',
//           tags: {
//             create: [
//               {
//                 assignedBy: 'Andy',
//                 assignedAt: new Date(),
//                 tag: {
//                   create: {
//                     title: 'nested-tag-create',
//                   },
//                 },
//               },
//             ],
//           },
//         },
//       ],
//     },
//     tags: { create: [{ title: 'test123' }] },
//   },
//   include: {
//     lates: {
//       include: {
//         tags: true,
//       },
//     },
//   },
// });

const tags = [
  { title: 'connectOrCreateTest1' },
  { title: 'connectOrCreateTest2' },
];

const fakeLates = prisma.late.create({
  include: { tags: { include: { tag: true } } },
  data: {
    title: 'A Fake Late',
    url: 'https://andy.ws',
    content: 'My portfolio site!',
    published: true,
    tags: {
      create: tags.map((tag) => ({
        assignedBy: 'Andy',
        assignedAt: new Date(),
        tag: {
          create: {
            title: tag.title,
          },
        },
      })),
    },
    // tags: {
    //   connectOrCreate: tags.map((tag) => ({
    //     where: { assignedBy: 'Andy', tag: { title: tag.title } },
    //     create: [
    //       {
    //         assignedBy: 'Andy',
    //         assignedAt: new Date(),
    //         tag: {
    //           create: {
    //             title: tag.title,
    //           },
    //         },
    //       },
    //     ],
    //   })),
    // },
    // tags: {
    //   create: [
    //     {
    //       assignedBy: 'Andy',
    //       assignedAt: new Date(),
    //       tag: {
    //         create: {
    //           title: 'nested-tag-create',
    //         },
    //       },
    //     },
    //   ],
    // },
    // {
    //   assignedBy: 'Andy',
    //   assignedAt: new Date(),
    //   tag: {
    //     create: {
    //       title: 'nested-tag-create',
    //     },
    //   },
    // },
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
