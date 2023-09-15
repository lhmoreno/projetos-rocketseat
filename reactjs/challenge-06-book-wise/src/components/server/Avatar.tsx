import Image from 'next/image'

interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'xl'
}

const sizes = {
  'sm': {
    container: 'w-7 h-7 p-px',
    size: 28
  },
  'md': {
    container: 'w-10 h-10 p-px',
    size: 40
  },
  'xl': {
    container: 'w-20 h-20 p-0.5',
    size: 80
  }
}

export default function Avatar({ src, alt, size = 'md' }: AvatarProps) {
  const config = sizes[size]

  return (
    <div className={`${config.container} flex justify-center items-center rounded-full bg-gradient-vertical`}>
      <Image 
        src={src}
        alt={alt}
        className="rounded-full"
        width={config.size}
        height={config.size}
      />
    </div>
  )
}
