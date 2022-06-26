import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { getLayout } from "src/layouts/Layout";
import { prisma } from "src/lib/prisma";

export const getServerSideProps = async () => {
  const lates = await prisma.late.findMany({
    include: { tags: { include: { tag: true } }, category: true, owner: true },
  });
  const tags = await prisma.tag.findMany({
    include: { lates: { include: { late: true } } },
  });
  const users = await prisma.user.findMany({});
  const categories = await prisma.category.findMany({});

  if (!lates) {
    return {
      props: {
        error: "error fetching late",
        lates: undefined,
        tags: undefined,
      },
    };
  }
  if (!tags) {
    return {
      props: {
        error: "error fetching tags",
        tags: undefined,
        lates: undefined,
      },
    };
  }
  if (!users) {
    return {
      props: {
        error: "error fetching tags",
        tags: undefined,
        lates: undefined,
      },
    };
  }
  if (!categories) {
    return {
      props: {
        error: "error fetching tags",
        tags: undefined,
        lates: undefined,
      },
    };
  }

  return {
    props: {
      lates: lates,
      categories: categories,
      tags: tags,
      users: users,
      error: undefined,
    },
  };
};

const IndexPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  if (props.error) {
    return <>Error! {props.error}</>;
  }

  if (!props.lates) {
    return <>Loading</>;
  }

  const { lates } = props;
  const { tags } = props;
  const { users } = props;
  const { categories } = props;

  return (
    <section className="divide-y-0 divide-dashed divide-slate-300 text-base text-slate-600 dark:divide-slate-700 dark:text-slate-300">
      <h1 className="mt-12 mb-12 font-sans text-2xl font-[800]  tracking-tighter text-fuchsia-500">
        <Link href="/">
          <a>collate</a>
        </Link>
      </h1>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
        <div>
          <h2 className="text-lg font-bold">Users</h2>
          <div className="grid  border border-slate-600 font-mono ">
            {users.map((user) => {
              return (
                <div
                  className="border-b border-dotted border-slate-500 p-4 text-xs font-medium last:border-b-0"
                  key={user.id}
                >
                  <b>id: </b>
                  {user.id}
                  <br />
                  <b>name: </b>
                  {user.name}
                  <br /> <b>email: </b>
                  {user.email}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">Lates</h2>
          <div className="grid  overflow-y-hidden border border-slate-600 font-mono">
            {lates.map((late) => {
              return (
                <div
                  className="border-b border-dotted border-slate-500 p-2 text-xs font-medium last:border-b-0"
                  key={late.id}
                >
                  <b>id: </b>
                  {late.id}
                  &nbsp;/&nbsp;
                  <b>url: </b>
                  {late.url}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">Tags</h2>
          <div className="grid  overflow-y-hidden border border-slate-600 font-mono">
            {tags.map((tag) => {
              return (
                <div
                  className="border-b border-dotted border-slate-500 p-2 text-xs font-medium last:border-b-0"
                  key={tag.id}
                >
                  {tag.title}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">Categories</h2>
          <div className="grid  overflow-y-hidden border border-slate-600 font-mono">
            {categories.map((category) => {
              return (
                <div
                  className="border-b border-dotted border-slate-500 p-2 text-xs font-medium last:border-b-0"
                  key={category.id}
                >
                  {category.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-4">
        <div>
          <h1 className="text-lg font-semibold">Lates</h1>
          <div className="divide-y divide-gray-300 py-3">
            {lates.map((late) => {
              return (
                <div key={late.id} className="py-3">
                  title: {late.title ?? "no title"} <br />
                  owner: {late.owner?.email.toLowerCase() ?? "no owner"} <br />
                  url: {late.url} <br />
                  category: {late.category?.title ?? ""} <br />
                  tags:
                  {late.tags.map((tag) => {
                    return <div key={tag.tag.id}>{tag.tag.title}</div>;
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold">Tags</h1>
          <div>
            {tags.map((tag) => {
              return (
                <div key={tag.id}>
                  <h2 className="text-lg font-semibold">{tag.title}</h2>
                  {tag.lates.map((late) => {
                    return (
                      <div key={late.lateId}>
                        Late ID: {late.lateId}
                        <br />
                        Late Title:{late.late.title}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

IndexPage.getLayout = getLayout;

// eslint-disable-next-line import/no-default-export
export default IndexPage;
