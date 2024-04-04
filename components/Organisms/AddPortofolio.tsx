'use client'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { IApi } from '@/types/api'
import { IApiPortofolio } from '@/types/api/portofolio'
import { IApiSkill } from '@/types/api/skill'
import { IDynamicForm, IOptions } from '@/types/form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { Form, FormikProvider, useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import FormikField from '../Atoms/FormikField'
import Button2 from '../Atoms/Button2'
import { useSession } from 'next-auth/react'
import { Options } from 'react-select'

const AddPortofolio = () => {
	const axiosAuth = useAxiosAuth()
	const { data: session } = useSession()
	
	// React Query
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation( {
		mutationKey : ['portofolio', 'add'],
		mutationFn  : async( value: Omit<IApiPortofolio, 'id'> )=> {
			const data: AxiosResponse<IApi<IApiSkill>> = await axiosAuth.post(
				`/v1/portofolio`, 
				value
			)
			
			return data.data.data
		},
		onSuccess : (  )=> {
			queryClient.invalidateQueries( { queryKey : ['portofolio', '', 1] } )
			toast.success( 'Successfully add new portofolio!' )
		},
		onError : () => {
			toast.error( 'Cant add portofolio, please try again latter.' )
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
				required : true,
				image    : {
					maxSize : 1000
				}
			}
		},
		{
			name        : 'skills',
			type        : 'select',
			placeholder : 'Select skills',
			fieldType   : 'select',
			label       : 'Skills',
			select      : {
				isMulti : true,
			},
			validation : {
				required : true
			}
		},
		{
			name        : 'year',
			type        : 'year',
			placeholder : 'Select year',
			fieldType   : 'year',
			label       : 'Year',
			validation  : {
				required : true
			}
		},
	]

	// Form
	const schema = generateValidationSchema( fields )

	// Formik
	const date = new Date

	interface IInitialValues extends Omit<IApiPortofolio, 'id' | 'skills' | 'userId'>{
		skills: Options<IOptions>
	}
	const initialValues: IInitialValues= {
		name        : '',
		description : '',
		image       : '',
		year        : date,
		skills      : []
	}
	const formik = useFormik( {
		initialValues    : initialValues,
		validationSchema : schema,
		onSubmit         : ( value ) => {
			mutate( {
				...value,
				userId : session?.user.id,
				skills : value.skills?.map( ( item ) => item.value )
			} as Omit<IApiPortofolio, 'id'> )
		},
	} )

	// @ NOTE get skill list
	
	const{ data: skillListData, isLoading: isSkillListLoading } = useQuery<IApi<Pick<IApiSkill, 'name' | 'id'>[]>>( {
		queryKey : ['skill-list'],
		queryFn  : async ()=> {
			const data: AxiosResponse<IApi<Pick<IApiSkill, 'name' | 'id'>[]>>  = await axiosAuth.get( '/v1/skill-list' )
			
			return data?.data
		},
	} )

	// @ NOTE loading
	const getLoading = ( fieldType: string | undefined )=>{
		switch( fieldType ){
		case 'select':
			return isSkillListLoading
		default: return false
		}
	}
	// @ NOTE options
	const getOptions = ( name: string | undefined )=>{
		switch( name ){
		case 'skills':
			return skillListData?.data?.map( ( item: Pick<IApiSkill, "id" | "name"> )=> ( {
				label : item.name,
				value : item.id
			} ) )
		default: return []
		}
	}
	
	return (
		<section className=''>
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
								select={item?.select}
								options={getOptions( item.name )}
								loading={getLoading( item.fieldType ) }
							/>
						) )
					}
					<Button2 disabled={ isPending} loading={isPending}
						type="submit"
					>Submit</Button2>
				</Form>
			</FormikProvider>
		</section>

	)
}

export default AddPortofolio
