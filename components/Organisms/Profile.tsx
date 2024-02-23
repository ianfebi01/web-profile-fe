"use client"
import { useSession } from 'next-auth/react'
import React, { FormEvent, useState } from 'react'
import FormikField from '../Atoms/FormikField'
import { Form, FormikProvider, useFormik } from 'formik'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { useMutation } from '@tanstack/react-query'
import Button2 from '../Atoms/Button2'
import { IDynamicForm } from '@/types/form'
import { generateValidationSchema } from '@/lib/generateValidationSchema'

const Profile = () => {

	const { data:session, update } = useSession()
	const axiosAuth = useAxiosAuth()

	const { mutate, isPending } = useMutation( {

		mutationFn : async( value: FormData )=> {
			const data = await axiosAuth.put(
				`/v1/profile`, 
				value,
				{
					headers : {
						"Content-Type" : "multipart/form-data"
					}
				}
			)

			await update( {
				...session,
				user : {
					...session?.user,
					...data?.data.data
				}
			} )
			
			return data
		}
	} )

	const field: IDynamicForm[] = [
		{
			name        : 'name',
			type        : 'text',
			placeholder : 'eg. Ian Febi S',
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
			name        : 'email',
			type        : 'email',
			placeholder : "eg. iangtg@gmail.com",
			fieldType   : 'text',
			label       : 'Email',
			validation  : {
				charLength : {
					min : 3,
					max : 30
				},
				required : true
			}
		},
		{
			name        : 'textBg',
			type        : 'text',
			placeholder : "eg. IAN FEBI",
			fieldType   : 'text',
			label       : 'Text on BG',
			validation  : {
				charLength : {
					min : 3,
					max : 30
				},
				required : false
			}
		},
		{
			name        : 'quote',
			type        : 'text',
			placeholder : "eg. Hari yang cerah",
			fieldType   : 'text',
			label       : 'Quote',
			validation  : {
				charLength : {
					min : 3,
					max : 300
				},
				required : false
			}
		},
		{
			name        : 'openToWork',
			type        : 'text',
			placeholder : "Open to work",
			fieldType   : 'switch',
			label       : 'Open to work',
			validation  : {
				required : false
			}
		},
		{
			name        : 'personImage',
			type        : 'text',
			placeholder : "Select person image",
			fieldType   : 'image',
			label       : 'Person Image',
		},
	]

	// Schema
	// const schema = yup.object( {
	// 	name       : yup.string().min( 3 ).max( 30 ).required().label( 'Name' ),
	// 	email      : yup.string().email().required().label( 'Email' ),
	// 	quote      : yup.string().min( 3 ).max( 200 ).label( 'Quote' ),
	// 	textBg     : yup.string().min( 3 ).max( 10 ).label( 'Text on background' ),
	// 	openToWork : yup.boolean().required().label( 'Open to work' ),

	// } )

	const schema = generateValidationSchema( field )
	// formdata
	const [formData, setFormData] = useState<FormData>();
	// Formik
	const formik = useFormik( {
		initialValues : {
			name       : session?.user.name || '',
			email      : session?.user.email || '',
			quote      : session?.user.quote || '',
			// personImage : session?.user.personImage || '',
			textBg     : session?.user.textBg || '',
			openToWork : session?.user.openToWork || false

		},
		validationSchema : schema,
		onSubmit         : ( ) => {
			mutate( formData as FormData )
		},
	} )

	const onSubmit = ( e: FormEvent<HTMLFormElement> )=>{
		e.preventDefault();
		const formData =  new FormData( e.target as HTMLFormElement )

		// parse boolean value to formdata
		if( !formData.get( 'openToWork' ) ){
			formData.append( 'openToWork', "false" )
		}
		
		setFormData( formData )

		formik.handleSubmit( e )
	}
	
	return (
		<section className='overflow-scroll'>
			<FormikProvider value={formik}>

				<Form onSubmit={onSubmit} className='flex flex-col gap-2'>

					{
						field.map( ( item: IDynamicForm )=>(
							<FormikField     
								label={item.label}
								name={item.name}
								placeholder={item.placeholder}
								key={item.name}
								fieldType={item.fieldType}
								defaultImageUrl={session?.user.personImage}
							/>
						) )
					}
					{/* <FormikField     
						label='Name'
						name="name"
						placeholder="eg. Ian Febi S"
					/>
					<FormikField     
						label='Email'
						name="email"
						placeholder="eg. iangtg@gmail.com"
					/>
					<FormikField     
						label='Quote'
						name="quote"
						placeholder="eg. Hari yang cerah"
					/>
					<FormikField     
						label='Text on background'
						name="textBg"
						placeholder="eg. IAN FEBI"
					/>
					<FormikField     
						label='Open to work'
						name="openToWork"
						placeholder="Open to work"
						fieldType='switch'
					/>
					<FormikField     
						label='Person Image'
						name="personImage"
						placeholder="Select image"
						fieldType='image'
						defaultImageUrl={session?.user.personImage}
					/> */}
					<Button2 disabled={!formik.isValid || isPending} loading={isPending}
						type="submit"
					>Submit</Button2>
				</Form>
			</FormikProvider>
		</section>
	)
}

export default Profile
