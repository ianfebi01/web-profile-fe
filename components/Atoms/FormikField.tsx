"use client"
import React, { FunctionComponent } from 'react'
import { useField } from 'formik'

interface Props{
    name: string
    label: string
	placeholder: string
}
const FormikField: FunctionComponent<Props> = ( props ) => {

	const { name, label, placeholder } = props

	const [field, meta] = useField( name )
	
	return (
		<div className='flex flex-col gap-2'>
			<label htmlFor={name}>{label}</label>
			<input id={name} type="text"
				placeholder={placeholder} {...field}
				className={`text-white p-2 border rounded-lg bg-transparent ring-0 focus:ring-0 shadow-none focus:outline-none  transition-default ${meta.touched && meta.error ? 'focus:border-red-500 border-red-500 ':'focus:border-white/50 border-white/25 '}`} />
			<p className={`text-[0.7rem] text-red-500 transition-default delay-100 ${meta.error && meta.touched ? 'translate-y-0 opacity-100': '-translate-y-2 opacity-0'}`}>{meta.error}</p>
		</div>
	)
}

export default FormikField
