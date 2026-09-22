export default function Loading() {
  return (
    <div className="flex flex-col h-screen bg-surface justify-end">
      <div className="flex flex-col px-section-sides py-section-tb bg-footer md:bg-accent">
        <div className="flex flex-col gap-md animate-pulse">
          <div className="h-4 w-1/5 bg-surface rounded-sm" />
          <div className="h-8 w-1/3 bg-surface rounded-sm" />
        </div>
      </div>
    </div>
  )
}