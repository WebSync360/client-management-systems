export default function PageLoader() {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        <span className="text-xs font-medium text-brand-600 uppercase tracking-widest animate-pulse">
          Initializing Workspace...
        </span>
      </div>
    </div>
  );
}