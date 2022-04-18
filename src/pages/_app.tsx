import 'src/styles/app.css';
import { AppPropsWithLayout } from 'src/types/app';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <main className='mx-auto mt-10 max-w-lg '>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
