"use client"
import { useSession } from 'next-auth/react'
import React, { FormEvent, useState } from 'react'
import FormikField from '../Atoms/FormikField'
import * as yup from 'yup'
import { Form, FormikProvider, useFormik } from 'formik'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { useMutation } from '@tanstack/react-query'
import Button2 from '../Atoms/Button2'

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

	// Schema
	const schema = yup.object( {
		name  : yup.string().min( 3 ).max( 30 ).required().label( 'Name' ),
		email : yup.string().email().required().label( 'Email' ),
		quote : yup.string().min( 3 ).max( 200 ).label( 'Quote' ),
	} )
	// formdata
	const [formData, setFormData] = useState<FormData>();
	// Formik
	const formik = useFormik( {
		initialValues : {
			name   : session?.user.name || '',
			email  : session?.user.email || '',
			quote  : session?.user.quote || '',
			// personImage : session?.user.personImage || '',
			textBg : session?.user.textBg || '',

		},
		validationSchema : schema,
		onSubmit         : ( ) => {
			mutate( formData as FormData )
		},
	} )

	const onSubmit = ( e: FormEvent<HTMLFormElement> )=>{
		e.preventDefault();
		setFormData( new FormData( e.target as HTMLFormElement ) )

		formik.handleSubmit( e )
	}
	
	return (
		<section className='overflow-scroll'>
			<FormikProvider value={formik}>

				<Form onSubmit={onSubmit} className='flex flex-col gap-2'>
					<FormikField     
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
						label='Person Image'
						name="personImage"
						placeholder="Select image"
						fieldType='image'
						defaultImageUrl={session?.user.personImage}
					/>
					<Button2 disabled={!formik.isValid} type="submit">{isPending ? 'Loading..':'Submit'}</Button2>
				</Form>
			</FormikProvider>
		</section>
	)
}

export default Profile
