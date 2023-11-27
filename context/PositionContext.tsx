"use client"
import { IActions } from '@/types/context';
import { ActionMapDefaultReducer, IInitialPosition } from '@/types/context/position';
import React, { ReactNode, Reducer, createContext, useReducer } from 'react';

// Initial position state
const initialState: IInitialPosition = {
	positions : [],
	paginator : {
		hasNextPage : false,
		itemCount   : 0,
		limit       : 12,
		page        : 0,
		total       : 0,
		totalPage   : 0
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
	case 'push_data': {

		const tmp = state?.positions
		tmp?.push( action.payload )
		
		return { 
			...state, 
			positions : tmp
		};
	}
	case 'set_data': {
		
		return { 
			...state, 
			positions : action.payload.data,
			paginator : {
				hasNextPage : action.payload.hasNextPage,
				itemCount   : action.payload.itemCount,
				limit       : action.payload.limit,
				page        : action.payload.page,
				total       : action.payload.total,
				totalPage   : action.payload.totalPage
			}
		};
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
