import { supabase } from '../lib/initSupabase';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { useUser, Auth } from '@supabase/supabase-auth-helpers/react';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const { user, error } = useUser();
  const [data, setData] = useState<any>({});
  const [lates, setLates] = useState<any[]>([]);

  const fetchLates = async () => {
    const { data: result, error } = await supabase.from('late').select('*');
    console.log('fetch lates called');
    if (error) console.log('error', error);
    else setLates(result);
    console.log(result);
  };

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('late').select('*');
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();

    if (user) fetchLates();
  }, [user]);

  console.log(user);
  console.log('lates' + lates);

  if (!user)
    return (
      <div className='p-4 bg-gray-50 rounded-xl border-2 shadow-sm'>
        {error && <p>{error.message}</p>}
        <Auth
          // view="update_password"
          supabaseClient={supabaseClient}
          providers={['google', 'github']}
          socialLayout='horizontal'
          socialButtonSize='xlarge'
        />
      </div>
    );

  return (
    <div className='space-y-4'>
      <div className='rounded-xl shadow-[inset_0px_3px_6px_4px_rgba(0,0,0,0)] shadow-slate-300/50'>
        <div className='flex justify-end items-stretch bg-slate-200/20 rounded-t-xl border  border-slate-400/50 border-b-slate-200 shadow-[inset_0px_3px_10px_4px_rgba(0,0,0,0)] shadow-slate-300/10'>
          <div className='grow p-4 font-sans text-2xl font-bold tracking-tight text-slate-800 rounded-tl-xl'>
            User (JSON)
          </div>
          <button
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className='py-1 px-4 mb-auto text-xs  text-slate-900 bg-slate-100 hover:bg-white rounded-tl-none rounded-tr-xl rounded-br-none rounded-bl-xl border-b border-l border-slate-400/70  shadow-md text-md '
            onClick={() => supabaseClient.auth.signOut()}>
            Logout
          </button>
        </div>

        <pre className='overflow-x-scroll p-6 text-xs leading-normal text-black rounded-b-2xl  border border-t-0 border-slate-300 '>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div className='rounded-xl shadow-[inset_0px_3px_6px_4px_rgba(0,0,0,0)] shadow-slate-300/50'>
        <div className='flex justify-end items-stretch bg-slate-200/20 rounded-t-xl border  border-slate-400/50 border-b-slate-200 shadow-[inset_0px_3px_10px_4px_rgba(0,0,0,0)] shadow-slate-300/10'>
          <div className='grow p-4 font-sans text-2xl font-bold tracking-tight text-slate-800 rounded-tl-xl'>
            <p>client-side data fetching with RLS</p>
          </div>
        </div>
        <pre className='overflow-x-scroll p-6 text-xs leading-normal text-black rounded-b-2xl  border border-t-0 border-slate-300 '>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default LoginPage;
