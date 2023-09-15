export default function BooksLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header className="mb-10 text-2xl font-bold flex gap-3">
        <i className="ph ph-binoculars text-green-100 text-[2rem]" />
        Explorar
      </header>

      {children}
    </>
  )
}
