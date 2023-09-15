export default function Loading() {
  const ratings = Array.from(new Array(4), (_, i) => i)
  const books = Array.from(new Array(3), (_, i) => i)

  return (
    <div className="relative">
      <div className="absolute w-full h-loading-feed overflow-hidden">
        <div className="mt-4 flex justify-between gap-10">
          <div className="flex-1 flex flex-col gap-4 max-w-[38rem]">
            {ratings.map((n) => {
              return (
                <div key={n} className="bg-gray-700 rounded-lg p-6">
                  <div className="animate-pulse">
                    <div className="flex gap-4 items-center">
                      <div className="h-10 w-10 bg-gray-300/10 rounded-full" />
                      <div>
                        <div className="h-4 w-48 bg-gray-300/10 rounded" />
                        <div className="mt-2 h-3 w-32 bg-gray-300/10 rounded" />
                      </div>
                    </div>
                    <div className="mt-6 flex gap-6">
                      <div className="h-40 w-32 bg-gray-300/10 rounded" />
                      <div className="mt-4">
                        <div className="h-4 w-48 bg-gray-300/10 rounded" />
                        <div className="mt-8 h-3 w-32 bg-gray-300/10 rounded" />
                        <div className="mt-2 h-3 w-32 bg-gray-300/10 rounded" />
                        <div className="mt-2 h-3 w-32 bg-gray-300/10 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-4 max-w-xs">
            {books.map((n) => {
              return (
                <div key={n} className="bg-gray-700 rounded-lg p-6">
                  <div className="animate-pulse">
                    <div className="flex gap-4">
                      <div className="h-24 w-16 bg-gray-300/10 rounded" />
                      <div className="mt-4">
                        <div className="h-4 w-48 bg-gray-300/10 rounded" />
                        <div className="mt-2 h-3 w-32 bg-gray-300/10 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
