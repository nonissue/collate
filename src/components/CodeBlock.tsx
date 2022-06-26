export const CodeBlock = (code: string) => {
  return (
    <div className="space-y-4">
      <div className="rounded-xl shadow-[inset_0px_3px_6px_4px_rgba(0,0,0,0)] shadow-slate-300/50">
        <div className="flex items-stretch justify-end rounded-t-xl border border-slate-400/50  border-b-slate-200 bg-slate-200/20 shadow-[inset_0px_3px_10px_4px_rgba(0,0,0,0)] shadow-slate-300/10">
          <div className="grow rounded-tl-xl p-4 font-sans text-2xl font-bold tracking-tight text-slate-800">
            User (JSON)
          </div>
          <button className="text-md mb-auto rounded-tl-none rounded-tr-xl rounded-br-none rounded-bl-xl border-b border-l border-slate-400/70 bg-slate-100 py-1 px-4 text-xs text-slate-900  shadow-md hover:bg-white ">
            Logout
          </button>
        </div>

        <pre className="overflow-x-scroll rounded-b-2xl border border-t-0 border-slate-300 p-6  text-xs leading-normal text-black ">
          {code}
        </pre>
      </div>
      <div className="rounded-xl shadow-[inset_0px_3px_6px_4px_rgba(0,0,0,0)] shadow-slate-300/50">
        <div className="flex items-stretch justify-end rounded-t-xl border border-slate-400/50  border-b-slate-200 bg-slate-200/20 shadow-[inset_0px_3px_10px_4px_rgba(0,0,0,0)] shadow-slate-300/10">
          <div className="grow rounded-tl-xl p-4 font-sans text-2xl font-bold tracking-tight text-slate-800">
            <p>client-side data fetching with RLS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
