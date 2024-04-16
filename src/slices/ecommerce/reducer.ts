import { createSlice } from "@reduxjs/toolkit";
import {
    getOrders,
    addOrders,
    updateOrders,
    deleteOrders,
    getSellers,
    addSellers,
    updateSellers,
    deleteSellers,
    getProductList,
    addProductList,
    updateProductList,
    deleteProductList,
    getBrandsList,
    addBrandsList,
    deleteBrandsList,
    updateBrandsList,
    addCountryList,
    getCountryList,
    updateCountryList,
    deleteCountryList,
    addVendorsList,
    getVendorList, 
    deleteVendorsList, 
    updateVendorsList,
    getOneVendor,
    getOneBrand,
    getOneCountry,
    addDistrictList,
    getDistrictList,
    updateDistrictList,
    deleteDistrictList,
    getOneDistrict,
    addProvinceList,
    getProvinceList,
    deleteProvinceList,
    getOneProvince,
    updateProvinceList,
    getGlobals,
    addCategoryList,
    getCategoryList,
    updateCategoryList,
    getOneCategory,
    getOneProduct
} from './thunk';


export const initialState = {
    brands: [],
    sellers: [],
    products: [],
    province: [],
    districts: [],
    country: [],
    vendors:[],
    reviews: [],
    globals: [],
    category: [],
    errors: {}
};

const EcommerceSlice = createSlice({
    name: 'Ecommerce',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // globals
        builder.addCase(getGlobals.fulfilled, (state: any, action: any) => {
            state.globals = action.payload;
        });
        
        // Orders
        builder.addCase(getOrders.fulfilled, (state: any, action: any) => {
            state.orders = action.payload;
        });
     
        builder.addCase(addOrders.fulfilled, (state: any, action: any) => {
            state.orders.unshift(action.payload);
        });
       
        builder.addCase(updateOrders.fulfilled, (state: any, action: any) => {
            state.orders = state.orders.map((orders: any) =>
                orders.id === action.payload.id
                    ? { ...orders, ...action.payload }
                    : orders
            );
        });
      
        builder.addCase(deleteOrders.fulfilled, (state: any, action: any) => {
            state.orders = state.orders.filter(
                (orders: any) => orders.id.toString() !== action.payload.toString()
            );
        });
     

        // Sellers
        builder.addCase(getSellers.fulfilled, (state: any, action: any) => {
            state.sellers = action.payload;
        });
     
        builder.addCase(addSellers.fulfilled, (state: any, action: any) => {
            state.sellers.unshift(action.payload);
        });
    
        builder.addCase(updateSellers.fulfilled, (state: any, action: any) => {
            state.sellers = state.sellers.map((sellers: any) =>
                sellers.id === action.payload.id
                    ? { ...sellers, ...action.payload }
                    : sellers
            );
        });
    
        builder.addCase(deleteSellers.fulfilled, (state: any, action: any) => {
            state.sellers = state.sellers.filter(
                (sellers: any) => sellers.id.toString() !== action.payload.toString()
            );
        });
     

        // Products
        builder.addCase(getProductList.fulfilled, (state: any, action: any) => {
            state.products = action.payload;
        });
        
        builder.addCase(getOneProduct.fulfilled, (state: any, action: any) => {
            state.products = { ...state.products, results: action.payload };
        });
        
        builder.addCase(addProductList.fulfilled, (state: any, action: any) => {
            state.products = {...state.products, result: action.payload}
        });
        
        // builder.addCase(updateBrandsList.fulfilled, (state: any, action: any) => {
        //     state.brands = { ...state.brands, results: action.payload }
        // });
        

        // brands
        builder.addCase(getBrandsList.fulfilled, (state: any, action: any) => {
            state.brands = action.payload;
        });
        
        builder.addCase(getOneBrand.fulfilled, (state: any, action: any) => {
            state.brands = { ...state.brands, results: action.payload };
        });
        
        builder.addCase(addBrandsList.fulfilled, (state: any, action: any) => {
            state.brands = {...state.brands, result: action.payload}
        });
        
        builder.addCase(updateBrandsList.fulfilled, (state: any, action: any) => {
            state.brands = { ...state.brands, results: action.payload }
        });
        
        // builder.addCase(deleteBrandsList.fulfilled, (state: any, action: any) => {
        //     state.brands = state.brands.results.filter((brandList: any) =>
        //         brandList.id.toString() !== action.payload.toString()
        //     );
        // });

        // country
        builder.addCase(getCountryList.fulfilled, (state: any, action: any) => {
            state.country = action.payload;
        });
        
        builder.addCase(getOneCountry.fulfilled, (state: any, action: any) => {
            state.country = { ...state.country, results: action.payload };
        });
        
        builder.addCase(addCountryList.fulfilled, (state: any, action: any) => {
            state.country = {...state.country, result: action.payload}
        });
        
        builder.addCase(updateCountryList.fulfilled, (state: any, action: any) => {
            state.country = { ...state.country, results: action.payload }
        });
        

        // districts
        builder.addCase(getDistrictList.fulfilled, (state: any, action: any) => {
            state.districts = action.payload;
        });
        
        builder.addCase(getOneDistrict.fulfilled, (state: any, action: any) => {
            state.districts = { ...state.districts, results: action.payload };
        });
        
        builder.addCase(addDistrictList.fulfilled, (state: any, action: any) => {
            state.districts = {...state.districts, result: action.payload}
        });
        
        builder.addCase(updateDistrictList.fulfilled, (state: any, action: any) => {
            state.districts = { ...state.districts, results: action.payload }
        });


        // Province
        builder.addCase(getProvinceList.fulfilled, (state: any, action: any) => {
            state.province = action.payload;
        });
        
        builder.addCase(getOneProvince.fulfilled, (state: any, action: any) => {
            state.province = { ...state.province, results: action.payload };
        });
        
        builder.addCase(addProvinceList.fulfilled, (state: any, action: any) => {
            state.province = {...state.province, result: action.payload}
        });
        
        builder.addCase(updateProvinceList.fulfilled, (state: any, action: any) => {
            state.province = { ...state.province, results: action.payload }
        });
                

        // Vendors
          builder.addCase(getVendorList.fulfilled, (state: any, action: any) => {
            state.vendors = action.payload;
        });
        
        builder.addCase(getOneVendor.fulfilled, (state: any, action: any) => {
            state.vendors = { ...state.vendors, results: action.payload };
        });
        
        builder.addCase(addVendorsList.fulfilled, (state: any, action: any) => {
            state.vendors = {...state.vendors, result: action.payload}
        });
        
        builder.addCase(updateVendorsList.fulfilled, (state: any, action: any) => {
            state.vendors = { ...state.vendors, results: action.payload }
        });

        // category
        builder.addCase(getCategoryList.fulfilled, (state: any, action: any) => {
            state.category = action.payload;
        });
        
        builder.addCase(addCategoryList.fulfilled, (state: any, action: any) => {
            state.category = {...state.category, result: action.payload}
        });
        
          builder.addCase(getOneCategory.fulfilled, (state: any, action: any) => {
            state.category = { ...state.category, results: action.payload };
        });
        


        // Error handling
        builder.addMatcher(
            (action) => {
            return [
                getOrders.rejected,
                addOrders.rejected,
                updateOrders.rejected,
                deleteOrders.rejected,
                getSellers.rejected,
                addSellers.rejected,
                updateSellers.rejected,
                deleteSellers.rejected,
                getProductList.rejected,
                addProductList.rejected,
                updateProductList.rejected,
                deleteProductList.rejected,
                getOneProduct.rejected,
                getBrandsList.rejected,
                updateBrandsList.rejected,
                deleteBrandsList.rejected,
                addBrandsList.rejected,
                getCountryList.rejected,
                updateCountryList.rejected,
                addCountryList.rejected,
                deleteCountryList.rejected,
                addVendorsList.rejected,
                getVendorList.rejected,
                updateVendorsList.rejected,
                deleteVendorsList.rejected,
                getOneVendor.rejected,
                getOneBrand.rejected,
                getOneDistrict.rejected,
                addDistrictList.rejected,
                getDistrictList.rejected,
                updateDistrictList.rejected,
                deleteDistrictList.rejected,
                updateProvinceList.rejected,
                addProvinceList.rejected,
                getProvinceList.rejected,
                deleteProvinceList.rejected,
                getOneProvince.rejected,
                addCategoryList.rejected,
                getCategoryList.rejected,
                updateCategoryList.rejected,
                getOneCategory.rejected
                
            ].includes(action.type);
            },
            (state: any, action: any) => {
            state.error = action.payload.error || null;
            }
        );
    }
    
});

export default EcommerceSlice.reducer;