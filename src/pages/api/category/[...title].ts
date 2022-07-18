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
  } else if (req.method === "UPSERT") {
    return res.status(501).json({
      error: "Featured not yet implemented",
    });
  } else if (req.method === "DELETE") {
    return res.status(501).json({
      error: "Featured not yet implemented",
    });
  } else {
    return res.status(500).json({
      error: `The HTTP ${req.method} method is not supported at this route.`,
    });
  }
};

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query);
  if (!req.query.title) {
    return res.status(404).json({ code: 500, message: "Category not found" });
  }

  const queryTitle = req.query.title[0];
  let result;

  try {
    result = await db.category.findFirst({
      where: { title: { equals: queryTitle, mode: "insensitive" } },

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

// this shouldn't be post, but rather it should handle calls for update method
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const { title } = req.body;

  let isCategoryUnique;
  let result;

  try {
    isCategoryUnique = await db.category.findUnique({
      where: { title: title.toLowerCase() },
    });

    if (isCategoryUnique) {
      throw new Error("Category already exists");
    }
  } catch (error) {
    return res
      .status(422)
      .json({ code: 422, message: "Error: Category already exists" });
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
