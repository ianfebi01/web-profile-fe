import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent, useCallback, useState } from 'react'
import debounce  from "lodash.debounce"

interface Props{
    placeholder: string
    type: string
    value: string
    setValue: ( value: string ) => void
}
const SearchInput: FunctionComponent<Props> = ( props ) => {

	const { placeholder, type, value, setValue } = props

	const [inputValue, setInputValue] = useState<string>( value );

	const debounceInput =  debounce( ( input: string )=>{
		setValue( input )
	}, 500 )

	const handleChange=  useCallback( ( input: string )=>{
		setInputValue( input )
		debounceInput( input )
	}, [] )
	
	return (
		<div className="text-white p-2 border rounded-lg bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none  transition-default focus:border-white/50 border-white/25 max-w-xs flex items-center gap-2">
			<FontAwesomeIcon icon={faMagnifyingGlass}/>
			<input placeholder={placeholder} type={type}
				value={inputValue}
				onChange={( e ) => handleChange( e.target.value )}
				className='bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none '
			/>
		</div>
	)
}

export default SearchInput
