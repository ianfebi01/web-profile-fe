import React, { FunctionComponent, ReactNode, useMemo } from 'react'
import Spinner from './Spinner'

interface Props{
    disabled?: boolean | undefined
    children: ReactNode
    onClick?: () => void
    type: 'submit' | 'button' | 'reset'
	className?: string
	loading?: boolean
}

const Button2: FunctionComponent<Props> = ( props ) => {

	const { disabled, children, onClick, type, className, loading } = props
	const classes = useMemo( ()=>{
		const buttonClasses = 'py-2 px-4 text-xs text-white flex items-center gap-2 rounded-lg border border-transparent transition-default w-fit'
		if ( disabled || loading ){
			return `${buttonClasses} bg-dark/50 text-white/50 ${className}`
		}else{
			return `${buttonClasses} bg-dark text-white hover:border-white/25 ${className}`
		}
	}, [props] )
	
	return (
		<button
			className={classes}
			onClick={onClick}
			type={type}
			disabled={disabled || loading}
		>
			{loading ? <Spinner/> : ''}
			
			{children}
		</button>
	)
}

export default Button2
