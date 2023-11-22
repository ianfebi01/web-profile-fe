import React, { FunctionComponent, ReactNode, useMemo } from 'react'

interface Props{
    disabled?: boolean | undefined
    children: ReactNode
    onClick?: () => void
    type: 'submit' | 'button' | 'reset'
}

const Button2: FunctionComponent<Props> = ( props ) => {

	const { disabled, children, onClick, type } = props
	const classes = useMemo( ()=>{
		const buttonClasses = 'py-2 px-4 transition-all ease-in-out duration-500 text-xs text-white items-center gap-2 rounded-lg border border-transparent w-fit'
		if ( disabled ){
			return `${buttonClasses} bg-dark/50 text-white/50`
		}else{
			return `${buttonClasses} bg-dark text-white hover:border-white/25`
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
