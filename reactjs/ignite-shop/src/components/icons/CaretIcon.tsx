type CaretIconProps = {
  direction: 'right' | 'left'
}

export function CaretIcon({ direction }: CaretIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      transform={direction === 'left' ? 'scale(-1, 1)' : undefined}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.29289 1.29289C6.68342 0.902369 7.31658 0.902369 7.70711 1.29289L17.7071 11.2929C18.0976 11.6834 18.0976 12.3166 17.7071 12.7071L7.70711 22.7071C7.31658 23.0976 6.68342 23.0976 6.29289 22.7071C5.90237 22.3166 5.90237 21.6834 6.29289 21.2929L15.5858 12L6.29289 2.70711C5.90237 2.31658 5.90237 1.68342 6.29289 1.29289Z"
      />
    </svg>
  )
}
