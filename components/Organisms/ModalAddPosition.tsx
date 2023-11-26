import React, { FunctionComponent, useEffect, useRef } from 'react'
import Modal from './Modal'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import { IDynamicForm } from '@/types/form'
import { Form, FormikProvider, useFormik } from 'formik'
import Button2 from '../Atoms/Button2'
import FormikField from '../Atoms/FormikField'

interface Props{
    isOpen: boolean
    setIsOpen: ( value: boolean ) => void
}
const ModalAddPosition: FunctionComponent<Props> = ( { isOpen, setIsOpen } ) => {
	const fields: IDynamicForm[] = [
		{
			name        : 'name',
			type        : 'text',
			placeholder : 'eg. Frontend Developer',
			fieldType   : 'text',
			label       : 'Name',
			validation  : {
				charLength : {
					min : 3,
					max : 30
				},
				required : true
			}
		},
		{
			name        : 'description',
			type        : 'text',
			placeholder : 'eg. Create user interface based on figma',
			fieldType   : 'text',
			label       : 'Description',
			validation  : {
				charLength : {
					min : 3,
					max : 300
				},
				required : true
			}
		},
	]

	// Form
	const schema = generateValidationSchema( fields )

	// Formik
	const formik = useFormik( {
		initialValues : {
			name        : '',
			description : ''
		},
		validationSchema : schema,
		onSubmit         : ( values )=>{
			console.log( values )
		}
	} )

	const submitRef = useRef<HTMLButtonElement>( null )

	useEffect( ()=>{
		formik.handleReset( {
			name        : '',
			description : ''
		} )
	}, [isOpen] )
	
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}
			onConfirm={()=>submitRef.current?.click()}
			onCancel={()=> setIsOpen( false )}
			title='Add new position'
		>
			<FormikProvider value={formik}>
				<Form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
					{
						fields.map( ( item: IDynamicForm )=>(
							<FormikField     
								label={item.label}
								name={item.name}
								placeholder={item.placeholder}
								key={item.name}
								fieldType={item.fieldType}
							/>
						) )
					}
					<button ref={submitRef} type='submit'></button>
				</Form>
			</FormikProvider>
		</Modal>
	)
}

export default ModalAddPosition
