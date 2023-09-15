'use client'

import { useSidePanel } from "@/contexts/SidePanelContext"

interface ButtonOpenSidePanel extends React.PropsWithChildren {
  type: 'text' | 'image'
  book: tBook
}

const styles = {
  'text': 'text-left hover:underline',
  'image': 'transition-opacity hover:opacity-80'
}

export default function ButtonOpenSidePanel({ children, type, book }: ButtonOpenSidePanel) {
  const { toggleBook } = useSidePanel()

  return (
    <button 
      className={styles[type]} 
      onClick={() => toggleBook(book)}
    >
      {children}
    </button>
  )
}
