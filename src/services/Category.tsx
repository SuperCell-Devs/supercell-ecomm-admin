
import { api } from './api';
import { BaseGetDataRequest, BaseGetDataResponse, } from './types/BaseTypes';



export interface CategoryDataResponse {

    nameAr: string
    nameEn: string
    parent: null | string,
    id: number

}

export interface CategoryGetDataResponse extends BaseGetDataResponse {
    results: CategoryDataResponse[]
}

 

export interface AddCategoryPayload {
    id?: number
    nameAr: string
    nameEn: string
    parent: null | string,
}



export const Category = api.injectEndpoints({
    endpoints: (build) => ({
        CategoryGetData: build.query<CategoryGetDataResponse, BaseGetDataRequest>({
            query: (params) => ({
                url: `/api/v1/Category`,
                params
            }),
            providesTags: ['CategoryGetData'],
        }),
        CategoryGetDataById: build.query<CategoryDataResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/MasterData/Category/Get/${id}`,
            }),
            providesTags: ['CategoryGetDataById'],
        }),
        

        CategoryCreate: build.mutation<CategoryDataResponse, AddCategoryPayload>({
            query: (body) => ({
                url: '/MasterData/Category/Create',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['CategoryGetData', 'CategoryCreate', "CategoryGetDataById"],
        }),
        CategoryUpdate: build.mutation<CategoryDataResponse, AddCategoryPayload>({
            query: (body) => ({
                url: '/MasterData/Category/Update',
                body,
                method: 'PUT',
            }),
            invalidatesTags: ['CategoryGetData', "CategoryGetDataById", 'CategoryCreate', 'CategoryUpdate'],
        }),

        CategoryRemove: build.mutation<void, { id: number }>({
            query: ({ id }) => ({
                url: `/MasterData/Category/Remove/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CategoryGetData', "CategoryGetDataById", 'CategoryRemove'],
        }),
       
    }),
});

export const {
    useCategoryGetDataQuery,
    useLazyCategoryGetDataQuery,
    useCategoryCreateMutation,
    useCategoryGetDataByIdQuery,
    useLazyCategoryGetDataByIdQuery,
    useCategoryUpdateMutation,
    useCategoryRemoveMutation,  

} = Category;
