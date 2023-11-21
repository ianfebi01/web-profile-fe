"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import { apiAuth } from "../api";

const useAxiosAuth = () => {
	const { data: session } = useSession();
	const refreshToken = useRefreshToken();

	useEffect( () => {
		const requestIntercept = apiAuth.interceptors.request.use(
			( config ) => {
				if ( !config.headers["Authorization"] ) {
					config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
				}
				
				return config;
			},
			( error ) => Promise.reject( error )
		);

		const responseIntercept = apiAuth.interceptors.response.use(
			( response ) => response,
			async ( error ) => {
		
				const prevRequest = error?.config;
				// When access token invalid
				if ( error?.response?.status === 401 && !prevRequest?.sent ) {
					prevRequest.sent = true;
					await refreshToken();
					prevRequest.headers["Authorization"] = `Bearer ${session?.accessToken}`;
					
					return apiAuth( prevRequest );
				}
				
				return Promise.reject( error );
			}
		);

		return () => {
			apiAuth.interceptors.request.eject( requestIntercept );
			apiAuth.interceptors.response.eject( responseIntercept );
		};
	}, [session, refreshToken] );

	return apiAuth;
};

export default useAxiosAuth;