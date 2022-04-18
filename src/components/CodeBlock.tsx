export const CodeBlock = (code: string) => {
  return (
    <div className='space-y-4'>
      <div className='rounded-xl shadow-[inset_0px_3px_6px_4px_rgba(0,0,0,0)] shadow-slate-300/50'>
        <div className='flex justify-end items-stretch bg-slate-200/20 rounded-t-xl border  border-slate-400/50 border-b-slate-200 shadow-[inset_0px_3px_10px_4px_rgba(0,0,0,0)] shadow-slate-300/10'>
          <div className='grow p-4 font-sans text-2xl font-bold tracking-tight text-slate-800 rounded-tl-xl'>
            User (JSON)
          </div>
          <button
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className='py-1 px-4 mb-auto text-xs  text-slate-900 bg-slate-100 hover:bg-white rounded-tl-none rounded-tr-xl rounded-br-none rounded-bl-xl border-b border-l border-slate-400/70  shadow-md text-md '>
            Logout
          </button>
        </div>

        <pre className='overflow-x-scroll p-6 text-xs leading-normal text-black rounded-b-2xl  border border-t-0 border-slate-300 '>
          {code}
        </pre>
      </div>
      <div className='rounded-xl shadow-[inset_0px_3px_6px_4px_rgba(0,0,0,0)] shadow-slate-300/50'>
        <div className='flex justify-end items-stretch bg-slate-200/20 rounded-t-xl border  border-slate-400/50 border-b-slate-200 shadow-[inset_0px_3px_10px_4px_rgba(0,0,0,0)] shadow-slate-300/10'>
          <div className='grow p-4 font-sans text-2xl font-bold tracking-tight text-slate-800 rounded-tl-xl'>
            <p>client-side data fetching with RLS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
