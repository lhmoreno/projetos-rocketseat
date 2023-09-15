import * as Tooltip from '@radix-ui/react-tooltip'
import { styled } from '../../styles'

export const Content = styled(Tooltip.Content, {
  backgroundColor: '$gray900',
  color: '$gray100',
  fontSize: '$sm',
  lineHeight: '$short',
  fontWeight: '$medium',
  borderRadius: '$xs',
  padding: '$3 $4',
  boxShadow: '$space$1 $space$4 $space$6 rgba(0, 0, 0, 0.25)'
})

export const Arrow = styled(Tooltip.Arrow, {
  fill: '$gray900'
})
