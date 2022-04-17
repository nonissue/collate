import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { UserProvider } from '@supabase/supabase-auth-helpers/react';
import 'src/styles/app.css';
import { AppPropsWithLayout } from 'src/types/app';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <main className='mx-auto mt-10 max-w-lg '>
      <UserProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
      </UserProvider>
    </main>
  );
};

export default MyApp;
