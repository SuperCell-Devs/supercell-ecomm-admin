import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './types/constants';
 
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL, // Backend base API
    prepareHeaders: async (headers: any) => {
       
        return headers;
    },
});

const baseQueryWithReAuth = async (args: string | FetchArgs, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
   
    return result;
};

export const api = createApi({
    reducerPath: 'api', // use store.api to access cached API data (default behavior)
    baseQuery: baseQueryWithReAuth,
    tagTypes: [

        // ? Category Tags

        "CategoryGetData",
        "CategoryGetDataById", 
        "CategoryCreate",
        "CategoryUpdate",
        "CategoryRemove",
      
 

    ],
    endpoints: (build) => ({}),
});
