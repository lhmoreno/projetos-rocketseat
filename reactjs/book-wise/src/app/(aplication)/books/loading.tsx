export default function Loading() {
  const numbers = Array.from(new Array(15), (_, i) => String(i + 1));

  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden h-loading-books">
        <div className="grid grid-cols-3 gap-4">
          {numbers.map((id) => {
            return (
              <div key={id} className="px-5 py-4 bg-gray-700 rounded-lg">
                <div className="animate-pulse flex gap-5">
                  <div className="h-40 w-32 bg-gray-300/10 rounded" />
                  <div className="py-3">
                    <div className="h-4 w-32 bg-gray-300/10 rounded" />
                    <div className="mt-2 h-3 w-24 bg-gray-300/10 rounded" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
