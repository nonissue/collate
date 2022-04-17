// pages/profile.js
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';

export default function Profile({ user }) {
  return (
    <div className='text-sm whitespace-pre-wrap'>
      <div>Hello {user.email}</div>
      <pre className='p-4 text-xs whitespace-pre-wrap bg-gradient-to-bl from-gray-200 via-neutral-50 to-zinc-300/70 rounded-lg border border-neutral-600 shadow'>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}

export const getServerSideProps = withAuthRequired();
