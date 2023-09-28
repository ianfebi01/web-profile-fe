import React, { FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
  variant?: 'link' | 'normal'
  onClick?: () => void
  className?: string
  theme?: 'dark' | 'light'
}

const Button: FunctionComponent<Props> = (props) => {
  const {
    children,
    variant = 'normal',
    onClick,
    className,
    theme = 'dark',
  } = props

  const generateBg = () => {
    if (theme === 'dark') {
      switch (variant) {
        case 'link':
          return 'bg-none text-white'
        case 'normal':
          return 'bg-white-overlay text-white'
      }
    } else if (theme === 'light') {
      switch (variant) {
        case 'link':
          return 'bg-none text-dark'
        case 'normal':
          return 'bg-dark-secondary text-white'
      }
    }
  }

  return (
    <button
      className={`${generateBg()} py-2 px-2.5 transition-all duration-300 ease-linear filter hover:brightness-90 relative ${className}`}
      style={{
        borderRadius: 99999,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
