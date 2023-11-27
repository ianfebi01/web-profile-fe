import { IApi, IApiPagination } from "../api";
import { IApiPosition } from "../api/position";

export interface IInitialPosition  {
    positions?: IApiPosition[]
    paginator?: IApiPagination
}

// type SET_PAGE = {
//     page?: string;
//   };

export type ActionMapDefaultReducer = {
    push_data: IApiPosition ;
    set_data: IApi<IApiPosition[]> & IApiPagination
  };