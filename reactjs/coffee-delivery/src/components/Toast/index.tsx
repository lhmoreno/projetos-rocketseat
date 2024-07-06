import * as RadixToast from "@radix-ui/react-toast"
import { ToastContainer } from "./styles"

export type ToastData = {
  title: string
  description: string
}

type ToastProps = {
  isOpen: boolean
  onClose: () => void
  toast: ToastData
}

export function Toast({ isOpen, onClose, toast }: ToastProps) {
  return (
    <RadixToast.Root 
      open={isOpen} 
      onOpenChange={(open) => !open && onClose()}
      asChild
    >
      <ToastContainer>
        <RadixToast.Title className="title">
          {toast.title}
        </RadixToast.Title>

        <RadixToast.Description>
          {toast.description}
        </RadixToast.Description>
      </ToastContainer>
    </RadixToast.Root>
  )
}
