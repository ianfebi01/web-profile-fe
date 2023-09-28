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
          return 'bg-none text-white py-0 px-2.5'
        case 'normal':
          return 'py-2 px-2.5 bg-white-overlay text-white'
      }
    } else if (theme === 'light') {
      switch (variant) {
        case 'link':
          return 'bg-none text-dark py-0 px-2.5'
        case 'normal':
          return 'bg-dark-secondary text-white py-2 px-2.5'
      }
    }
  }

  return (
    <button
      className={`${generateBg()} transition-all duration-300 ease-linear filter hover:brightness-90 relative ${className}`}
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
