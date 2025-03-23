export default function BlogPostPillLoading() {
  return (
    <div className="w-full md:w-11/12 cursor-pointer flex animate-pulse">
      <div className="max-w-[75%] w-[80%] md:max-w-[80%] transition-all ease-in-out border-transparent md:border-0 md:border-solid md:border-l-4 md:pl-4">
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-md w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-md w-3/4" />
      </div>
      <div className="ml-auto h-4 bg-gray-200 dark:bg-slate-700 rounded-md w-16" />
    </div>
  );
}
