export default function FeedLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header className="mb-10 text-2xl font-bold flex gap-3">
        <i className="ph ph-chart-line-up text-green-100 text-[2rem]" />
        Início
      </header>

      {children}
    </>
  );
}
