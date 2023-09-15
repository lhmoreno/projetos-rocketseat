export default function Loading() {
  const ratings = Array.from(new Array(3), (_, i) => String(i + 1))
  const items = Array.from(new Array(4), (_, i) => String(i + 1))

  return (
    <div className="relative">
      <div className="absolute w-full h-loading-profile overflow-hidden">
        <div className="flex gap-14">
          <div className="mt-12 flex-1 flex flex-col gap-10 max-w-[39rem]">
            {ratings.map(id => {
              return (
                <div key={id} className="px-5 py-4 bg-gray-700 rounded-lg">
                  <div className="animate-pulse flex gap-5">
                    <div className="h-40 w-32 bg-gray-300/10 rounded" />
                    <div className="py-3">
                      <div className="h-4 w-32 bg-gray-300/10 rounded" />
                      <div className="mt-2 h-3 w-24 bg-gray-300/10 rounded" />
                    </div>
                  </div>
                  <div className="mt-6 h-3 w-3/4 bg-gray-300/10 rounded" />
                  <div className="mt-2 h-3 w-3/4 bg-gray-300/10 rounded" />
                  <div className="mt-2 h-3 w-2/4 bg-gray-300/10 rounded" />
                </div>
              )
            })}
          </div>

          <div className="animate-pulse flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-300/10" />
            <div className="mt-20 py-5 px-14 flex flex-col gap-10">
              {items.map(id => {
                return (
                  <div key={id} className="flex gap-5 items-center">
                    <div className="h-10 w-10 bg-gray-300/10 rounded" />
                    <div>
                      <div className="h-4 w-24 bg-gray-300/10 rounded" />
                      <div className="mt-2 h-3 w-32 bg-gray-300/10 rounded" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
