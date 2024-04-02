import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getOrders as getOrdersApi,
    addOrders as addOrdersApi,
    updateOrders as updateOrdersApi,
    deleteOrders as deleteOrdersApi,
    getSellers as getSellersApi,
    addSellers as addSellersApi,
    updateSellers as updateSellersApi,
    deleteSellers as deleteSellersApi,
    getProductList as getProductListApi,
    addProductList as addProductListApi,
    updateProductList as updateProductListApi,
    deleteProductList as deleteProductListApi,
    addBrandsList as addBrandsListApi,
    getBrandsList as getBrandsListApi, 
    getOneBrand as getOneBrandApi,
    deleteBrandsList as deleteBrandsListApi,
    updateBrandsList as updateBrandsListApi,
    addCountryList as addCountryListApi,
    getCountryList as getCountryListApi,
    getOneCountry as getOneCountryApi,
    updateCountryList as updateCountryListApi,
    deleteCountryList as deleteCountryListApi,
    getDistrictList as getDistrictListApi,
    getOneDistrict as getOneDistrictApi, 
    addDistrictList as addDistrictListApi,
    updateDistrictList as updateDistrictListApi,
    deleteDistrictList as deleteDistrictListApi,
    addVendorsList as addVendorsListApi,
    getVendorsList as getVendorsListApi,
    deleteVendorsList as deleteVendorsListApi,
    updateVendorsList as updateVendorsListApi,
    uploadFile as uploadFileApi,
    addProvinceList as addProvinceListApi,
    getProvinceList as getProvinceListApi, 
    getOneProvince as getOneProvinceApi,
    updateProvinceList as updateProvinceListApi,
    deleteProvinceList as deleteProvinceListApi
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IGetAllBrandsProps, IGetAllCountryProps, IGetAllDistrictProps, IGetAllProvinceProps, IGetOneBrandProps, IGetOneCountryProps, IGetOneDistrictProps, IGetOneProvinceProps, IPostDistrict, IPostVendors, IProvincePost, IUpdateCountryProps } from "helpers/interface/api";

export const getOrders = createAsyncThunk("ecommerce/getOrders", async () => {
    try {
        const response = getOrdersApi();
        return response;
    } catch (error) {
        return error;
    }
});
export const addOrders = createAsyncThunk("ecommerce/addOrders", async (event: any) => {
    try {
        const response = addOrdersApi(event);
        const data = await response;
        toast.success("Order Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Order Added Failed", { autoClose: 2000 });
        return error;
    }
});
export const updateOrders = createAsyncThunk("ecommerce/updateOrders", async (event: any) => {
    try {
        const response = updateOrdersApi(event);
        const data = await response;
        toast.success("Order updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Order updated Failed", { autoClose: 2000 });
        return error;
    }
});
export const deleteOrders = createAsyncThunk("ecommerce/deleteOrders", async (event: any) => {
    try {
        const response = deleteOrdersApi(event);
        toast.success("Order deleted Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("Order deleted Failed", { autoClose: 2000 });
        return error;
    }
});

export const getSellers = createAsyncThunk("ecommerce/getSellers", async () => {
    try {
        const response = getSellersApi();
        return response;
    } catch (error) {
        return error;
    }
});
export const addSellers = createAsyncThunk("ecommerce/addSellers", async (event: any) => {
    try {
        const response = addSellersApi(event);
        const data = await response;
        toast.success("Seller Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Seller Added Failed", { autoClose: 2000 });
        return error;
    }
});
export const updateSellers = createAsyncThunk("ecommerce/updateSellers", async (event: any) => {
    try {
        const response = updateSellersApi(event);
        const data = await response;
        toast.success("Seller updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Seller updated Failed", { autoClose: 2000 });
        return error;
    }
});
export const deleteSellers = createAsyncThunk("ecommerce/deleteSellers", async (event: any) => {
    try {
        const response = deleteSellersApi(event);
        toast.success("Seller deleted Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("Seller deleted Failed", { autoClose: 2000 });
        return error;
    }
});


// Products

export const getProductList = createAsyncThunk("ecommerce/getProductList", async () => {
    try {
        const response = getProductListApi();
        return response;
    } catch (error) {
        return error;
    }
});
export const addProductList = createAsyncThunk("ecommerce/addProductList", async (event: any) => {
    try {
        const response = addProductListApi(event);
        const data = await response;
        toast.success("Data Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Data Added Failed", { autoClose: 2000 });
        return error;
    }
});
export const updateProductList = createAsyncThunk("ecommerce/updateProductList", async (event: any) => {
    try {
        const response = updateProductListApi(event);
        const data = await response;
        toast.success("Data updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Data updated Failed", { autoClose: 2000 });
        return error;
    }
});
export const deleteProductList = createAsyncThunk("ecommerce/deleteProductList", async (event: any) => {
    try {
        const response = deleteProductListApi(event);
        toast.success("Data deleted Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("Data deleted Failed", { autoClose: 2000 });
        return error;
    }
});


// Brands
export const getBrandsList = createAsyncThunk("ecommerce/getBrandsList", async (props? : IGetAllBrandsProps) => {
    try {
        const response = await getBrandsListApi(props);
        return response;
    } catch (error) {
        return error;
    }
});
export const getOneBrand = createAsyncThunk("ecommerce/getOneBrand", async (props : IGetOneBrandProps) => {
    try {
        const response = await getOneBrandApi(props);
        return response;
    } catch (error) {
        return error;
    }
});
export const addBrandsList = createAsyncThunk("ecommerce/addBrandsList", async (event: any) => {
    try {
        const response = await addBrandsListApi(event);
        const data = response;
        toast.success("Data Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Data Added Failed", { autoClose: 2000 });
        return error;
    }
});
export const updateBrandsList = createAsyncThunk("ecommerce/updateBrandsList", async (event: any) => {
    try {
        const response = await updateBrandsListApi(event);
        const data = response;
        toast.success("Brand updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Brand update has Failed", { autoClose: 2000 });
        return error;
    }
});
export const deleteBrandsList = createAsyncThunk("ecommerce/deleteBrandsList", async (event: any) => {
    try {
        const response = deleteBrandsListApi(event);
        toast.success("Data deleted Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("Data deleted Failed", { autoClose: 2000 });
        return error;
    }
});

// Country
export const getCountryList = createAsyncThunk("ecommerce/getCountryList", async (event?: IGetAllCountryProps) => {
    try {
        const response = getCountryListApi(event);
        return response;
    } catch (error) {
        return error;
    }
});

export const getOneCountry = createAsyncThunk("ecommerce/getOneCountry", async (props : IGetOneCountryProps) => {
    try {
        const response = await getOneCountryApi(props);
        return response;
    } catch (error) {
        return error;
    }
});

export const addCountryList = createAsyncThunk("ecommerce/addCountryList", async (event: any) => {
    try {
        const response = addCountryListApi(event);
        const data = await response;
        toast.success("Data Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Data Added Failed", { autoClose: 2000 });
        return error;
    }
});
export const updateCountryList = createAsyncThunk("ecommerce/updateCountryList", async (event: IUpdateCountryProps) => {
    try {
        const response = updateCountryListApi(event);
        const data = await response;
        toast.success("Data updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Data updated Failed", { autoClose: 2000 });
        return error;
    }
});
export const deleteCountryList = createAsyncThunk("ecommerce/deleteCountryList", async (event: any) => {
    try {
        const response = deleteCountryListApi(event);
        toast.success("Data deleted Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("Data deleted Failed", { autoClose: 2000 });
        return error;
    }
});

// District
export const getDistrictList = createAsyncThunk("ecommerce/getDistrictList", async (event?: IGetAllDistrictProps) => {
    try {
        const response = getDistrictListApi(event);
        return response;
    } catch (error) {
        return error;
    }
});

export const getOneDistrict = createAsyncThunk("ecommerce/getOneDistrict", async (event: IGetOneDistrictProps) => {
    try {
        const response = getOneDistrictApi(event);
        return response;
    } catch (error) {
        return error;
    }
});
export const addDistrictList = createAsyncThunk("ecommerce/addDistrictList", async (event: IPostDistrict) => {
    try {
        const response = addDistrictListApi(event);
        const data = await response;
        toast.success("Data Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Data Added Failed", { autoClose: 2000 });
        return error;
    }
});
export const updateDistrictList = createAsyncThunk("ecommerce/updateDistrictList", async (event: any) => {
    try {
        const response = updateDistrictListApi(event);
        const data = await response;
        toast.success("Data updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Data updated Failed", { autoClose: 2000 });
        return error;
    }
});
export const deleteDistrictList = createAsyncThunk("ecommerce/deleteDistrictList", async (event: any) => {
    try {
        const response = deleteDistrictListApi(event);
        toast.success("Data deleted Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("Data deleted Failed", { autoClose: 2000 });
        return error;
    }
});

// Vendor
export const getVendorList = createAsyncThunk("ecommerce/getVendorsList", async () => {
    try {
        const response = getVendorsListApi();
        return response;
    } catch (error) {
        return error;
    }
});
export const addVendorsList = createAsyncThunk("ecommerce/addVendorsList", async (event: IPostVendors) => {
    try {
        const response = addVendorsListApi(event);
        const data = await response;
        toast.success("Data Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Data Added Failed", { autoClose: 2000 });
        return error;
    }
});
export const updateVendorsList = createAsyncThunk("ecommerce/updateVendorsList", async (event: any) => {
    try {
        const response = updateVendorsListApi(event);
        const data = await response;
        toast.success("Data updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Data updated Failed", { autoClose: 2000 });
        return error;
    }
});
export const deleteVendorsList = createAsyncThunk("ecommerce/deleteVendorsList", async (event: any) => {
    try {
        const response = deleteVendorsListApi(event);
        toast.success("Data deleted Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("Data deleted Failed", { autoClose: 2000 });
        return error;
    }
});

// File 
export const uploadFile = createAsyncThunk("ecommerce/uploadFile", async (event: File) => {
    try {
        const response = uploadFileApi(event);
        return response;
    } catch (error) {
        return error;
    }
});



// Province
export const getProvinceList = createAsyncThunk("ecommerce/getProvinceList", async (props? : IGetAllProvinceProps) => {
    try {
        const response = await getProvinceListApi(props);
        return response;
    } catch (error) {
        return error;
    }
});
export const getOneProvince = createAsyncThunk("ecommerce/getOneProvince", async (props : IGetOneProvinceProps) => {
    try {
        const response = await getOneProvinceApi(props);
        return response;
    } catch (error) {
        return error;
    }
});
export const addProvinceList = createAsyncThunk("ecommerce/addProvinceList", async (event: IProvincePost) => {
    try {
        const response = await addProvinceListApi(event);
        const data = response;
        toast.success("Data Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Data Added Failed", { autoClose: 2000 });
        return error;
    }
});
export const updateProvinceList = createAsyncThunk("ecommerce/updateProvinceList", async (event: any) => {
    try {
        const response = await updateProvinceListApi(event);
        const data = response;
        toast.success("Brand updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Brand update has Failed", { autoClose: 2000 });
        return error;
    }
});
export const deleteProvinceList = createAsyncThunk("ecommerce/deleteProvinceList", async (event: any) => {
    try {
        const response = deleteProvinceListApi(event);
        toast.success("Data deleted Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("Data deleted Failed", { autoClose: 2000 });
        return error;
    }
});