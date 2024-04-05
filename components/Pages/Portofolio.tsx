"use client"
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { IApi, IApiPagination } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import React from 'react'
import SearchInput from '../Inputs/SearchInput'
import StyledPagination from '../Layouts/StyledPagination'
import NoDataFound from '../NoDataFound'
import Button2 from '../Buttons/Button2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { IApiPortofolio } from '@/types/api/portofolio'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CardPortofolio from '../Cards/CardPortofolio'

const Portofolio = () => {

	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const page = searchParams.get( 'page' )
	const limit = searchParams.get( 'limit' )
	const q = searchParams.get( 'q' )

	const axiosAuth = useAxiosAuth()

	const{ data, isLoading } = useQuery<IApi<IApiPortofolio[]> & IApiPagination>( {
		queryKey : ['portofolio', searchParams.get( 'page' ), searchParams.get( 'q' )],
		queryFn  : async ()=> {
			const data: AxiosResponse<IApi<IApiPortofolio[]> & IApiPagination>  = await axiosAuth.get( '/v1/portofolio', {
				params : {
					page  : page || 1,
					limit : limit || 12,
					q     : q || '',
				}
			} )
			
			return data?.data
		},
	} )
    
	const handlePageChange = ( page: number )=>{
		const selectedPage = page + 1

		setSearchParams( 'page', selectedPage.toString() )
	}

	// @ NOTE router

	const goToAdd = () => {
		const queryParams = new URLSearchParams( searchParams.toString() )
		
		router.push( '/admin/portofolio/add' + '?'+ queryParams.toString() )
	}

	const setSearchParams = ( key: string, val: string )=> {
		const current = new URLSearchParams( Array.from( searchParams.entries() ) )
		// update as necessary
		const value = val.trim();

		if ( !value ) {
			current.delete( key );
		} else {
			current.set( key, val );
		}

		// cast to string
		const search = current.toString();
		// or const query = `${'?'.repeat(search.length && 1)}${search}`;
		const query = search ? `?${search}` : "";

		router.push( `${pathname}${query}` );
	}

	// @ NOTE fake look
	const mockLoop = new Array( parseInt( limit as string || '0' ) ).fill( 0 )
	
	return (
		<>
			<div className='flex flex-col gap-8 h-full'>
				<div className='flex gap-4 justify-between'>
					<SearchInput placeholder='Search portofolio' type='text'
						value={q as string || ''} setValue={( value: string )=> setSearchParams( 'q', value )}
					/>

					<Button2 type='button' className='gap-2 flex'
						onClick={()=> goToAdd()}
					>
						<FontAwesomeIcon icon={faPlus}/>
					Add Portofolio
					</Button2>

				</div>
				
				{
					data?.data?.length && !isLoading ?
						<div className='grid grid-cols-2 gap-4'>
							{data?.data?.map( ( item: IApiPortofolio, i )=>(
                    
								<CardPortofolio
									key={item.id}
									index={i}
									color={
										i === 1
											? 'bg-white'
											: i === 2
												? 'bg-green'
												: 'bg-dark-secondary'
									}
									data={item}
								/>

							) )}
						</div>
						: isLoading ? 
							<div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
								{
									mockLoop.map( ( item, i )=>(
										<article key={i} className='h-24 p-4 border border-none rounded-lg flex flex-col gap-2 animate-pulse bg-dark-secondary'>
											<div className='h-6 bg-dark-secondary max-w-[10rem]'>
		
											</div>
											<div className='h-4 bg-dark-secondary'/>
											<div className='h-4 bg-dark-secondary max-w-[13rem]'/>
										</article>
									) )
								}
							</div>
							: (
								<NoDataFound/>
							)
				}

				{/* Pagination */}
				{data && data?.data?.length && !isLoading ? (
					<StyledPagination 
						setCurrentPage={handlePageChange} 
						currentPage={parseInt( page as string || '1' )}
						totalPages={data?.totalPage as number}
						hasNextPage={data?.hasNextPage as boolean}
					/>

				) : ''
		
				}
			</div>
		</>
	)
}

export default Portofolio
