'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ButtonLoginProps {
  provider: 'google' | 'github' | 'anonymous'
}

const icons = {
  'google': {
    src: '/icons/google.svg',
    alt: 'Logo do google'
  },
  'github': {
    src: '/icons/github.svg',
    alt: 'Logo do github'
  },
  'anonymous': {
    src: '/icons/rocket.svg',
    alt: 'Foguete na vertical'
  }
}

export default function ButtonLogin({provider}: ButtonLoginProps) {
  const {push} = useRouter()

  const image = icons[provider]

  function handleLogin() {
    if (provider === 'google') {
      return console.log('EVENT: login with google')
    }

    if (provider === 'github') {
      return console.log('EVENT: login with github')
    }

    return push('/feed')
  }

  return (
    <button 
      className="w-full px-6 py-5 flex items-center justify-center gap-4 bg-gray-600 rounded-lg text-lg text-gray-200 font-bold transition-colors hover:bg-gray-500"
      onClick={handleLogin}
    >
      <Image 
        src={image.src}
        alt={image.alt}
        width={28}
        height={28}
        quality={100}
        priority
      /> 
      {provider === 'google' && 'Entrar com Google'}
      {provider === 'github' && 'Entrar com GitHub'}
      {provider === 'anonymous' && 'Acessar como visitante'}
    </button>
  )
}
