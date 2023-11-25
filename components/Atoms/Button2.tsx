import React, { FunctionComponent, ReactNode, useMemo } from 'react'

interface Props{
    disabled?: boolean | undefined
    children: ReactNode
    onClick?: () => void
    type: 'submit' | 'button' | 'reset'
	customClases?: string
}

const Button2: FunctionComponent<Props> = ( props ) => {

	const { disabled, children, onClick, type, customClases } = props
	const classes = useMemo( ()=>{
		const buttonClasses = 'py-2 px-4 text-xs text-white items-center gap-2 rounded-lg border border-transparent transition-default w-fit'
		if ( disabled ){
			return `${buttonClasses} bg-dark/50 text-white/50 ${customClases}`
		}else{
			return `${buttonClasses} bg-dark text-white hover:border-white/25 ${customClases}`
		}
	}, [props] )
	
	return (
		<button
			className={classes}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default Button2
