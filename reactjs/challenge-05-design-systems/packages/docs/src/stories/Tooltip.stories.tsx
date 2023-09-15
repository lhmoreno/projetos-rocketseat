import type { Meta, StoryObj } from '@storybook/react'
import { TooltipProps, Button, Box, Tooltip } from '@lhmoreno-ignite-ui/react'

export default {
  title: 'Data display/Tooltip',
  component: Tooltip,
  args: {
    title: 'Luiz Lindão D+',
  },
  argTypes: {
    title: {
      control: {
        type: 'text'
      }
    }
  },
  decorators: [
    (Story) => (
      <Box css={{ paddingTop: '$16',display: 'flex', justifyContent: 'center' }}>
        {Story()}
      </Box>
    )
  ]
} as Meta<TooltipProps>

export const Primary: StoryObj<TooltipProps> = {
  args: {
    children: (
      <Button size="sm">
        Hover here
      </Button>
    )
  }
}
