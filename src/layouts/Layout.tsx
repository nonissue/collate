type Props = {
  children: React.ReactElement;
};

function Layout({ children }: Props): React.ReactElement {
  return <div className='mx-auto mt-20 max-w-3xl'>{children}</div>;
}

export const getLayout = (page: React.ReactElement): React.ReactElement => (
  <Layout>{page}</Layout>
);

export { Layout };
