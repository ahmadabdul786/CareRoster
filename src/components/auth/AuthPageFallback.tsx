export function AuthPageFallback() {
  return (
    <div
      className="w-full flex flex-col justify-center items-center min-h-[280px]"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="h-8 w-48 max-w-full rounded bg-gray-100 animate-pulse mb-6" />
      <div className="w-full flex flex-col gap-4">
        <div className="h-12 w-full rounded bg-gray-100 animate-pulse" />
        <div className="h-12 w-full rounded bg-gray-100 animate-pulse" />
        <div className="h-12 w-full rounded bg-gray-100 animate-pulse mt-2" />
      </div>
    </div>
  );
}
