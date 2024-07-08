import type { Meta, StoryObj } from '@storybook/react'
import { ToastProps, Toast, Button, Box } from '@lhmoreno-ignite-ui/react'
import { useState } from 'react'

export default {
  title: 'Feedback/Toast',
  component: Toast,
  args: {
    title: 'Scheduling completed',
    description: 'Wednesday, April 19, 2023 at 15:00 PM'
  },
  argTypes: {
    title: {
      control: {
        type: 'text'
      }
    },
    description: {
      control: {
        type: 'text'
      }
    }
  },
  decorators: [
    (Story, { args }) => {
      const [isOpen, setIsOpen] = useState(false)

      return (
        <Box css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button size="sm" onClick={() => setIsOpen(true)} disabled={isOpen}>
            To shcedule
          </Button>
          {Story({
            args: {
              isOpen,
              onClose: () => setIsOpen(false),
              ...args
            }
          })}
        </Box>
      )
    },
  ]
} as Meta<ToastProps>

export const Primary: StoryObj<ToastProps> = {}
