import React from 'react'
import { montserrat } from '../Layout'

interface ButtonProps {
  children?: React.ReactNode,
  disabled?: boolean,
  className?: string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  id?: string
}

const Button = ({ children, disabled = false, className, onClick, id }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${montserrat.className} ${className}`}
      disabled={disabled}
      id={id}
    >
      {children}
    </button>
  )
}

export default Button