"use client"
import { IActions } from '@/types/context';
import { ActionMapDefaultReducer, IInitialPosition } from '@/types/context/position';
import React, { ReactNode, Reducer, createContext, useReducer } from 'react';

// Initial position state
const initialState: IInitialPosition = {
	paginator : {
		limit : 12,
		page  : 1,
		q     : ''
	}

};

// Create Reducer
const mainReducer = (
	state: IInitialPosition,
	action: IActions<ActionMapDefaultReducer>
): IInitialPosition => positionReducer( state, action );

// create Context provider
export const PositionContext = createContext<{
    state: IInitialPosition;
    dispatch: React.Dispatch<IActions<ActionMapDefaultReducer>>;
  }>( {
  	state    : initialState,
  	dispatch : () => null,
  } );

//   Create provider Component
interface Props{
    children: ReactNode
}
export function PositionProvider( { children }: Props ) {

	const [state, dispatch] = useReducer( mainReducer, initialState );

	return (
		<PositionContext.Provider value={{ state, dispatch }}>
			{children}
		</PositionContext.Provider>
	);
}

// Create Reducer function
const positionReducer: Reducer<
IInitialPosition,
IActions<ActionMapDefaultReducer>
> = ( state, action ) => {
	switch ( action.type ) {
	// case 'push_data': {
	// 	const tmp = state?.position?.datas
	// 	const index = tmp?.findIndex( ( item )=> item.id === action.payload.id )
	// 	if ( index === -1 ) {
	// 		tmp?.push( action.payload )
	// 	}
		
	// 	return { 
	// 		...state, 
	// 		positions : {
	// 			...state.position,
	// 			data : tmp
	// 		}
	// 	};
	// }
	// case 'set_data': {
		
	// 	return { 
	// 		...state, 
	// 		position : {
	// 			datas     : action.payload.data,
	// 			paginator : {
	// 				hasNextPage : action.payload.hasNextPage,
	// 				itemCount   : action.payload.itemCount,
	// 				limit       : action.payload.limit,
	// 				page        : action.payload.page,
	// 				total       : action.payload.total,
	// 				totalPage   : action.payload.totalPage
	// 			}
	// 		},
	// 	};
	// }
	case 'set_paginator':{
		return {
			...state,
			paginator : action.payload
		}
	}
	// case 'changed': {
	// 	return tasks.map( t => {
	// 		if ( t.id === action.task.id ) {
	// 			return action.task;
	// 		} else {
	// 			return t;
	// 		}
	// 	} );
	// }
	// case 'deleted': {
	// 	return tasks.filter( t => t.id !== action.id );
	// }
	default: {
		throw Error( 'Unknown action' );
	}
	}
}
