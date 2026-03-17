export default function Loader() {
  const items = Array.from({ length: 3 }, (_, index) => index);

  return (
    <div className="flex flex-col gap-8">
      {items.map((item) => (
        <div
          key={item}
          className="flex animate-pulse flex-col gap-4 border-b pb-8"
          aria-hidden="true"
        >
          <div className="flex justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-muted h-10 w-10 rounded-full" />
              <div className="flex flex-col gap-2">
                <div className="bg-muted h-4 w-28 rounded" />
                <div className="bg-muted h-3 w-36 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-muted h-8 w-12 rounded-md" />
              <div className="bg-muted h-8 w-12 rounded-md" />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="bg-muted h-4 w-full rounded" />
              <div className="bg-muted h-4 w-4/5 rounded" />
            </div>

            <div className="bg-muted h-64 w-full rounded-xl" />
          </div>

          <div className="flex gap-2">
            <div className="bg-muted h-10 w-20 rounded-xl border" />
            <div className="bg-muted h-10 w-28 rounded-xl border" />
          </div>
        </div>
      ))}
    </div>
  );
}
