export default function ProfileLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header className="mb-10 text-2xl font-bold flex gap-3">
        <i className="ph ph-user text-green-100 text-[2rem]" />
        Perfil
      </header>

      {children}
    </>
  )
}
