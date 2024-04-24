
import { IApi, IApiPagination, IPayloadPagination } from "@/types/api"
import { IApiPortofolio } from "@/types/api/portofolio"

export const getPortofolioQueryFn = async ( data: IPayloadPagination ): Promise<IApi<IApiPortofolio[]> & IApiPagination> =>{

	const param = new URLSearchParams( {
		page  : data.page.toString(),
		limit : data.limit.toString(),
		q     : data.q.toString()
	} )
	
	return fetch( `http://localhost:8000/v1/portofolio?${param}`, {
		method : 'GET'
	} ).then( res => res.json() )
}
