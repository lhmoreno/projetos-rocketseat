type CloseIconProps = {
  width?: string
  height?: string
}

export function CloseIcon({ width, height }: CloseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.5397 1.46026C23.1534 2.07394 23.1534 3.06892 22.5397 3.6826L3.6826 22.5397C3.06892 23.1534 2.07394 23.1534 1.46026 22.5397C0.84658 21.9261 0.84658 20.9311 1.46026 20.3174L20.3174 1.46026C20.9311 0.84658 21.9261 0.84658 22.5397 1.46026Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.46026 1.46026C2.07394 0.84658 3.06892 0.84658 3.6826 1.46026L22.5397 20.3174C23.1534 20.9311 23.1534 21.9261 22.5397 22.5397C21.9261 23.1534 20.9311 23.1534 20.3174 22.5397L1.46026 3.6826C0.84658 3.06892 0.84658 2.07394 1.46026 1.46026Z"
      />
    </svg>
  )
}
