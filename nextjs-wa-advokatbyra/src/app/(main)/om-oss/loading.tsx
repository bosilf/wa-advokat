export default function Loading() {
  return (
    <main aria-busy="true">
      <span className="sr-only">
        Sidan laddas
      </span>

      <div
        aria-hidden="true"
        className="animate-pulse"
      >
        {/* Hero image */}
        <div className="h-screen flex flex-col bg-ink/10" >
          <div className="flex-1" />
          <div className="bg-footer px-xl py-section-tb section-spacing">
            <div className="bg-white/50 h-md w-40 rounded-xs animate-pulse" />
            <div className="bg-white/50 h-lg w-80 rounded-xs animate-pulse" />
          </div>
        </div>

        {/* Intro */}
        <section className="mx-auto max-w-section px-section-sides py-section-tb">
          <div className="mb-md h-3 w-32 bg-ink/10" />

          <div className="mb-lg h-12 max-w-xl rounded-xl bg-ink/10" />

          <div className="space-y-sm">
            <div className="h-4 w-full rounded bg-ink/10" />
            <div className="h-4 w-full rounded bg-ink/10" />
            <div className="h-4 w-4/5 rounded bg-ink/10" />
          </div>
        </section>

        {/* Cards */}
        <section className="bg-surface px-section-sides py-section-tb">
          <div className="mx-auto grid max-w-section gap-md lg:grid-cols-2">
            {Array.from({length: 4}).map((_, index) => (
              <div
                key={index}
                className="h-52 rounded-[40px] bg-ink/10"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}