"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import FormikField from '../Atoms/FormikField'
import * as yup from 'yup'
import { Form, FormikProvider, useFormik } from 'formik'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { useMutation, useQuery } from '@tanstack/react-query'
import { IApiPayload } from '@/types/api/profile'

const Profile = () => {

	const { data:session, update } = useSession()
	const axiosAuth = useAxiosAuth()

	const { mutate, isPending } = useMutation( {

		mutationFn : async( value: IApiPayload )=> {
			const data = await axiosAuth.put(
				`/v1/profile`, {
					...value
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
		quote : yup.string().min( 3 ).max( 200 ).required().label( 'Quote' ),
	} )
	
	  const formik = useFormik( {
		initialValues : {
		  name  : session?.user.name || '',
		  email : session?.user.email || '',
		  quote : session?.user.quote || ''

		},
		validationSchema : schema,
		onSubmit         : ( values: IApiPayload ) => {
			mutate( values )
		},
	  } )
	
	return (
		<section>
			<FormikProvider value={formik}>

				<Form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
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
					<button type="submit">{isPending ? 'Loading..':'Submit'}</button>
				</Form>
			</FormikProvider>
		</section>
	)
}

export default Profile
