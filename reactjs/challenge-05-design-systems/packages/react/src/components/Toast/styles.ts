import * as Toast from '@radix-ui/react-toast'
import { keyframes, styled } from '../../styles'

const hide = keyframes({
  from: {
    opacity: 1
  },
  to: {
    opacity: 0
  },
})

const slideIn = keyframes({
  from: {
    transform: 'translateX(calc(100% + $space$8))'
  },
  to: {
    transform: 'translateX(0)'
  }
})

const swipeOut = keyframes({
  from: {
    transform: 'translateX(var(--radix-toast-swipe-end-x))'
  },
  to: {
    transform: 'translateX(calc(100% + $space$8))'
  }
})

export const ToastContainer = styled(Toast.Root, {
  backgroundColor: '$gray800',
  border: '1px solid $gray600',
  borderRadius: '$sm',
  padding: '$3 $5',
  position: 'relative',
  minWidth: 360,

  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`
  },

  '&[data-state="closed"]': {
    animation: `${hide} 100ms ease-in`
  },

  '&[data-swipe="move"]': {
    transform: 'translateX(var(--radix-toast-swipe-move-x))'
  },
  
  '&[data-swipe="cancel"]': {
    transform: 'translateX(0)',
    transition: 'transform 200ms ease-out'
  },

  '&[data-swipe="end"]': {
    animation: `${swipeOut} 100ms ease-out`
  }
})

export const Title = styled(Toast.Title, {
  fontWeight: '$bold',
  fontSize: '$xl',
  lineHeight: '$base',
  color: '$white'
})

export const Description = styled(Toast.ToastDescription, {
  marginTop: '$1',
  fontSize: '$sm',
  lineHeight: '$base',
  color: '$gray200'
})

export const CloseButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  position: 'absolute',
  top: '$4',
  right: '$4',
  zIndex: 20,
  color: '$gray200',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    width: '$5',
    height: '$5'
  },

  '&:hover': {
    color: '$white'
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
    borderRadius: '$full'
  }
})

export const Viewport = styled(Toast.Viewport, {
  position: 'fixed',
  bottom: 0,
  right: 0,
  margin: 0,
  padding: '$8',
  listStyle: 'none'
})
