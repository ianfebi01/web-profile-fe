import api from "../api";

export const getPostsQueryFn = async () =>
	api.get( `/v1/user` ).then( ( res ) => res.data )
