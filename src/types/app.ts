import { Late, TagsOnLates } from '@prisma/client';

type User = {
  id: number;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
  name?: string;
  lates: Late[];
  tags: Tag[];
};

type Tag = {
  id: number;
  title: string;
  lates: TagsOnLates[];
  user: User;
  userId: number;
};
