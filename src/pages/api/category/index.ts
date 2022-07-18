import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma as db } from "src/lib/prisma";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === "GET") {
    return handleGET(req, res);
  } else if (req.method === "POST") {
    return handlePOST(req, res);
  } else {
    return res.status(500).json({
      error: `The HTTP ${req.method} method is not supported at this route.`,
    });
  }
};

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.title) {
    return res
      .status(500)
      .json({ code: 500, message: "Error loading categories not found" });
  }
  const queryTitle = req.query.title[0];
  let result;

  try {
    result = await db.category.findUnique({
      where: { title: queryTitle },
      include: {
        lates: true,
      },
    });

    if (!result) {
      throw new Error("nothing found");
    }
  } catch (error) {
    return res.status(500).json({ code: 500, message: "Category not found" });
  }

  return res.status(200).json(result);
}

// - [x] handle collision
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const { title } = req.body;

  let result;
  let isCategoryUnique;

  try {
    isCategoryUnique = await db.category.findFirst({
      where: { title: { equals: title, mode: "insensitive" } },
    });

    if (isCategoryUnique) {
      throw new Error(
        `Category '${title}' already exists. Category titles are case insensitive.`
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(409).json({ code: 422, message: error.message });
    } else {
      return res
        .status(500)
        .json({ code: 500, message: "An unknown error occurred." });
    }
  }

  try {
    result = await db.category.create({
      data: {
        title: title.toLowerCase(),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if ((error as Prisma.PrismaClientKnownRequestError).code === "P2002") {
        return res
          .status(422)
          .json({ code: 422, message: "Error: Word already exists" });
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
