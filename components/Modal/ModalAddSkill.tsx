"use client"
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import Modal from '../Organisms/Modal'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import { IDynamicForm } from '@/types/form'
import { Form, FormikProvider, useFormik } from 'formik'
import FormikField, { FormikFieldHandler } from '../Atoms/FormikField'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { IApi, IApiPagination, IPayloadPagination } from '@/types/api'
import toast from 'react-hot-toast'
import { IApiSkill } from '@/types/api/skill'

interface Props{
    isOpen: boolean
    setIsOpen: ( value: boolean ) => void
	params: IPayloadPagination
}
const ModalAddSkill: FunctionComponent<Props> = ( { isOpen, setIsOpen, params } ) => {

	const axiosAuth = useAxiosAuth()
	
	// React Query
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation( {
		mutationKey : ['skill', params.q, params.page],
		mutationFn  : async( value: Omit<IApiSkill, 'id'> )=> {
			const data: AxiosResponse<IApi<IApiSkill> & IApiPagination> = await axiosAuth.post(
				`/v1/skill`, 
				value
			)
			
			return data.data.data
		},
		onSuccess : (  )=> {
			queryClient.invalidateQueries( { queryKey : ['skill', params.q, params.page] } )
			toast.success( 'Successfully add new position!' )
			setIsOpen( false )
		},
		onError : ( error: AxiosError<IApi> ) => {
			toast.error( error.response?.data?.message as string )
		}
	} )

	// Dynamic fields
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
		{
			name        : 'image',
			type        : 'image',
			placeholder : 'Upload image',
			fieldType   : 'image',
			label       : 'Icon',
			validation  : {
				required : true
			}
		},
	]

	// Form
	const schema = generateValidationSchema( fields )
	const [imageBase64, setImageBase64] = useState<string>( '' );
	const formikFieldRef = useRef<FormikFieldHandler>( null )

	// Formik
	const formik = useFormik( {
		initialValues : {
			name        : '',
			description : '',
			image       : ''
		},
		validationSchema : schema,
		onSubmit         : ( value ) => {
			if ( imageBase64 === 'deleteImage' )
				mutate( { ...value, image : '' } )
			else
				mutate( { ...value, image : imageBase64 } )
		},
	} )

	const submitRef = useRef<HTMLButtonElement>( null )

	useEffect( ()=>{
		formik.handleReset( {
			name        : '',
			description : '',
			image       : ''
		} )
		setImageBase64( '' )
		formikFieldRef.current?.clearImage()
	}, [isOpen] )
	
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}
			onConfirm={()=>submitRef.current?.click()}
			onCancel={()=> setIsOpen( false )}
			title='Add new skill'
			loading={isPending}
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
								required={item.validation?.required}
								setImageBase64={setImageBase64}
								ref={formikFieldRef}
							/>
						) )
					}
					<button ref={submitRef} type='submit'
						className='hidden'
					></button>
				</Form>
			</FormikProvider>
		</Modal>
	)
}

export default ModalAddSkill
