"use client"
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { IApi, IApiPagination, IPayloadPagination } from '@/types/api'
import { IApiPosition } from '@/types/api/position'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { Pagination } from "react-headless-pagination";

const Position = () => {

	const axiosAuth = useAxiosAuth()
    
	const [params, setParams] = useState<IPayloadPagination>( {
		page  : 1,
		limit : 12
	} );

	const{ data } = useQuery<AxiosResponse<IApi<IApiPosition[]> & IApiPagination>>( {
		queryKey : ['position', params.page],
		queryFn  : async ()=> await axiosAuth.get( '/v1/position', {
			params : params
		} ),
	} )
    
	const handlePageChange = ( page: number )=>{
		setParams( {
			...params,
			page : page + 1
		} )
	}
	
	return (
		<div className='flex flex-col gap-8'>
			<div className='flex gap-4 flex-wrap'>
				{
					data?.data?.data?.map( ( item: IApiPosition, i )=>(
                    
						<article key={i} className='h-24 bg-dark p-4 border border-none rounded-lg flex flex-col gap-2 basis-1/3'>
							<h2 className='text-xl font-bold line-clamp-1 leading-none'>
								{item.name}
							</h2>
							<p className='text-[0.8rem] line-clamp-2'>
								{item.description}
							</p>
						</article>

					) )
				}
			</div>
			{/* Pagination */}
			{data?.data &&(
         
				<div className='flex justify-center'>
					<Pagination
						edgePageCount={2}
						middlePagesSiblingCount={1}
						currentPage={params.page - 1 as number}
						totalPages={data?.data?.totalPage as number}
						setCurrentPage={handlePageChange}
						className="flex w-fit gap-4"
						truncableText="..."
						truncableClassName=""
					>
						<Pagination.PrevButton className={`w-6 h-6 rounded-full btn-admin-default ${data?.data?.page <= 1 && 'cursor-default hover:bg-dark-secondary border-none hover:border-none'}`} disabled={data?.data?.page <= 1}>
							<FontAwesomeIcon icon={faChevronLeft}/>
						</Pagination.PrevButton>

						<nav className="flex justify-center flex-grow">
							<ul className="flex items-center justify-center gap-4">
								<Pagination.PageButton
									activeClassName="text-orange font-bold"
									inactiveClassName=""
									className=""
								/>
							</ul>
						</nav>

						<Pagination.NextButton className={`w-6 h-6 rounded-full btn-admin-default ${!data?.data?.hasNextPage && 'cursor-default hover:bg-dark-secondary border-none hover:border-none'}`} disabled={!data?.data?.hasNextPage}>
							<FontAwesomeIcon icon={faChevronRight}/>
						</Pagination.NextButton>
					</Pagination>
				</div>
			)}
		</div>
	)
}

export default Position
