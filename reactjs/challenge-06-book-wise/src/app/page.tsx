import ButtonLogin from '@/components/client/ButtonLogin'
import Image from 'next/image'

export const metadata = {
  title: 'Book Wise | Login',
  description: 'Faça seu login ou entre como visitante'
}

export default function Login() {
  return (
    <div className="min-h-screen flex p-5">
      <div className="relative flex-1 max-w-[38rem] rounded-xl overflow-hidden">
        <Image 
          src="/logo.svg"
          alt="Livro com um coração ao lado do nome BookWise"
          className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4"
          width={232}
          height={58}
          quality={100}
          priority
        />
        <Image 
          src="/images/backgrounds/background-login.png"
          alt="Mulher deitada no sofá lendo um livro"
          className="-z-10 object-cover"
          quality={100}
          sizes="37rem"
          fill
          priority
        />
      </div>

      <div className="pl-6 flex-1 flex flex-col justify-center items-center">
        <strong className="text-2xl">Boas vindas!</strong>
        <h1 className="mt-0.5 text-gray-200">Faça seu login ou acesse como visitante.</h1>

        <div className="mt-10 w-full max-w-sm flex flex-col gap-3">
          <ButtonLogin provider="google" />
          <ButtonLogin provider="github" />
          <ButtonLogin provider="anonymous" />
        </div>
      </div>
    </div>
  )
}
