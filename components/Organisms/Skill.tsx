'use client'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { IApi, IApiPagination, IPayloadPagination } from '@/types/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useState } from 'react'
import SearchInput from '../Atoms/SearchInput'
import StyledPagination from '../Molecules/StyledPagination'
import NoDataFound from '../Atoms/NoDataFound'
import Button2 from '../Atoms/Button2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalAddSkill from '../Modal/ModalAddSkill'
import { IApiSkill } from '@/types/api/skill'
import toast from 'react-hot-toast'

const Skill = () => {
	const axiosAuth = useAxiosAuth()

	const [params, setParams] = useState<IPayloadPagination>( {
		page  : 1,
		limit : 12,
		q     : '',
	} )

	const { data, isLoading } = useQuery<IApi<IApiSkill[]> & IApiPagination>( {
		queryKey : ['skill', params.q, params.page],
		queryFn  : async () => {
			const data: AxiosResponse<IApi<IApiSkill[]> & IApiPagination> =
        await axiosAuth.get( '/v1/skill', {
        	params : params,
        } )

			return data?.data
		},
	} )

	const handlePageChange = ( page: number ) => {
		setParams( {
			...params,
			page : page + 1,
		} )
	}

	const mockLoop = new Array( params.limit ).fill( 0 )

	// Modal
	const [isOpen, setIsOpen] = useState<boolean>( false )

	// @NOTE handle delete
	const [id, setId] = useState<number | null>( null );
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation( {
		mutationKey : ['skill', 'delete'],
		mutationFn  : async ( id: number ) => {
			const data: AxiosResponse<IApi<IApiSkill> & IApiPagination> =
        await axiosAuth.delete( `/v1/skill/${id}` )

			return data.data.data
		},
		onSuccess : () => {
			queryClient.invalidateQueries( {
				queryKey : ['skill', params.q, params.page],
			} )
			toast.success( 'Successfully delete skill!' )
			setIsOpen( false )
		},
		onError : ( error: AxiosError<IApi> ) => {
			toast.error( error.response?.data?.message as string )
		},
	} )

	const handleDelete = ( id: number ) => {
		setId( id )
		mutate( id )
	}

	return (
		<>
			<div className="flex flex-col gap-8 h-full">
				<ModalAddSkill isOpen={isOpen} setIsOpen={setIsOpen}
					params={params}
				/>
				<div className="flex gap-4 justify-between">
					<SearchInput
						placeholder="Search position"
						type="text"
						value={params.q}
						setValue={( value: string ) =>
							setParams( {
								...params,
								q : value,
							} )
						}
					/>

					<Button2
						type="button"
						className="gap-2 flex"
						onClick={() => setIsOpen( true )}
					>
						<FontAwesomeIcon icon={faPlus} />
            Add Position
					</Button2>
				</div>

				{data?.data?.length && !isLoading ? (
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
						{data?.data?.map( ( item: IApiSkill, i ) => (
							<article
								key={i}
								className="h-24 bg-dark p-4 border border-none rounded-lg flex flex-col gap-2"
							>
								<div className="flex gap-2 justify-between">
									<h2 className="text-xl font-bold line-clamp-1 leading-none">
										{item.name}
									</h2>
									<Button2
										type="button"
										loading={isPending && id === item.id}
										disabled={isPending}
										variant="iconOnly"
										onClick={() => handleDelete( item.id as number )}
									>
										<FontAwesomeIcon icon={faTrash} size="sm" />
									</Button2>
								</div>
								<p className="text-[0.8rem] line-clamp-2">{item.description}</p>
							</article>
						) )}
					</div>
				) : isLoading ? (
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
						{mockLoop.map( ( item, i ) => (
							<article
								key={i}
								className="h-24 p-4 border border-none rounded-lg flex flex-col gap-2 animate-pulse bg-dark-secondary"
							>
								<div className="h-6 bg-dark-secondary max-w-[10rem]"></div>
								<div className="h-4 bg-dark-secondary" />
								<div className="h-4 bg-dark-secondary max-w-[13rem]" />
							</article>
						) )}
					</div>
				) : (
					<NoDataFound />
				)}

				{/* Pagination */}
				{data && data?.data?.length && !isLoading ? (
					<StyledPagination
						setCurrentPage={handlePageChange}
						currentPage={data.page || 1}
						totalPages={data?.totalPage as number}
						hasNextPage={data?.hasNextPage as boolean}
					/>
				) : (
					''
				)}
			</div>
		</>
	)
}

export default Skill
