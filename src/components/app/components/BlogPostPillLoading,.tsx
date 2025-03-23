export default function BlogPostPillLoading() {
  return (
    <div className="w-11/12 cursor-pointer flex animate-pulse">
      <div className="w-[80%] max-w-[80%] transition-all ease-in-out border-transparent border-0 border-solid border-l-4 pl-4">
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-md w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-md w-3/4" />
      </div>
      <div className="ml-auto h-4 bg-gray-200 dark:bg-slate-700 rounded-md w-14" />
    </div>
  );
}
