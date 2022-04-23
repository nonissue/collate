import { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { getLayout } from 'src/layouts/Layout';
import { prisma } from 'src/lib/prisma';

export const getServerSideProps = async () => {
  const lates = await prisma.late.findMany({
    include: { tags: { include: { tag: true } }, category: true },
  });
  const tags = await prisma.tag.findMany({
    include: { lates: { include: { late: true } } },
  });

  if (!lates) {
    return {
      props: {
        error: 'error fetching late',
        lates: undefined,
        tags: undefined,
      },
    };
  }
  if (!tags) {
    return {
      props: {
        error: 'error fetching tags',
        tags: undefined,
        lates: undefined,
      },
    };
  }

  return { props: { lates: lates, tags: tags, error: undefined } };
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

  return (
    <section className='text-base text-slate-600 dark:text-slate-300 divide-y-0 divide-slate-300 dark:divide-slate-700 divide-dashed'>
      <Link href='/'>
        <a>{'<'} Back</a>
      </Link>

      <div className='py-4 space-y-4'>
        <div>
          <h1 className='text-xl font-semibold'>Lates</h1>
          <div className='py-4 space-y-6 divide-gray-400'>
            {lates.map((late) => {
              console.log(late);

              return (
                <div key={late.id} className='border-b'>
                  url: {late.url}
                  <br />
                  category: {late.category?.title ?? ''}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className='text-xl font-semibold'>Tags</h1>
          <div>
            {tags.map((tag) => {
              return (
                <div key={tag.id}>
                  <h2 className='text-lg font-semibold'>{tag.title}</h2>
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
