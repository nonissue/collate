import { Late } from '@prisma/client';
import { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { prisma } from 'src/lib/prisma';

export const getServerSideProps = async () => {
  const late = await prisma.late.findFirst({
    include: {
      tags: { include: { tag: true } },
      owner: true,
    },
  });

  if (!late) {
    return {
      props: { error: 'error fetching late', late: undefined },
    };
  }

  console.log(late);

  return { props: { late: late, error: undefined } };
};

const LatesPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  if (props.error) {
    return <>Error! {props.error}</>;
  }

  if (!props.late) {
    return <>Loading</>;
  }

  const { late }: { late: Late } = props;

  console.log(late);

  return (
    <section className='text-base text-slate-600 dark:text-slate-300 divide-y-0 divide-slate-300 dark:divide-slate-700 divide-dashed'>
      <Link href='/'>
        <a>{'<'} Back</a>
      </Link>
      <div>{late.url}</div>
      <div>{late.createdAt.toLocaleString()}</div>
    </section>
  );
};

// LatesPage.getLayout = getLayout;

// eslint-disable-next-line import/no-default-export
export default LatesPage;
