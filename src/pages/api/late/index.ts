import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma as db } from 'src/lib/prisma';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    return handleGET(res);
  } else if (req.method === 'POST') {
    return handlePOST(req, res);
  } else {
    return res.status(500).json({
      error: `The HTTP ${req.method} method is not supported at this route.`,
    });
  }
};

async function handleGET(res: NextApiResponse) {
  let result;
  try {
    result = await db.late.findMany();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }

  return res.status(200).json(result);
}

// - [ ] fetch definition IF MISSING after create, then update
// - [x] handle collision
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const { title, url } = req.body;

  let result;

  try {
    result = await db.late.create({
      data: {
        title: title.toLowerCase(),
        url: url,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if ((error as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
        return res
          .status(422)
          .json({ code: 422, message: 'Error: Word already exists' });
      } else {
        console.log(error);
        return res.status(500).json(error);
      }
    } else {
      throw error;
    }
  }

  return res.status(201).json(result);
}

export default handler;
