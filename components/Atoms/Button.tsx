import React, { FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
  variant?: 'link' | 'normal'
  onClick?: () => void
}

const Button: FunctionComponent<Props> = (props) => {
  const { children, variant = 'normal', onClick } = props
  return (
    <button
      className={`${
        variant === 'link'
          ? 'bg-none'
          : variant === 'normal'
          ? 'bg-white-overlay '
          : ''
      } py-2 px-2.5 transition-all duration-300 ease-linear filter hover:brightness-90 relative`}
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
