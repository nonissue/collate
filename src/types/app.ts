import { Late, TagsOnLates } from '@prisma/client';
import type { NextComponentType, NextPageContext } from 'next';
import type { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PageWithLayout<P> = NextComponentType<NextPageContext, any, P> & {
  getLayout?: (
    page: JSX.Element,
    layoutProps: Record<string, unknown>
  ) => JSX.Element;
};

export type AppPropsWithLayout<P = Record<string, unknown>> = AppProps<P> & {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component: PageWithLayout<P> & { theme: string };
};

type User = {
  id: number;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
  name?: string;
  lates: Late[];
  tags: Tag[];
};

// type Late = {
//   id: number;
//   title?: string;
//   url: string;
//   content?: string;
//   published: boolean;

//   tags: Tag[];

//   owner: User;
//   ownerId?: number;

//   createdAt: Date;
//   updatedAt: Date;
// }

type Tag = {
  id: number;
  title: string;
  lates: TagsOnLates[];
  user: User;
  userId: number;
};
