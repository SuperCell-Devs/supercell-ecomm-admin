import { User } from "slices/thunk";
import { APIClient, AuthenticationAPIClient } from "./api_helper";
import { IGetOneVendor, IGetAllBrandsProps, IGetAllCountryProps, IGetAllDistrictProps, IGetAllProvinceProps, IGetOneBrandProps, IGetOneCountryProps, IGetOneDistrictProps, IGetOneProvinceProps, IPostBrand, IPostDistrict, IPostVendors, IProvincePost, IUpdateBrandProps, IUpdateCountryProps, IUpdateDistrictProps, IUpdateProvinceProps, IPostCategory, IGetAllCategoryProps, IUpdateCategoryProps, IGetOneCategoryProps, IGetAllVendorProps, IPutVendor, IGetProductProps, IPostProduct, IGetOneProductProps, CreateHome, IGetHomeManagerProps, UpdateHomeManager, PostSlider, GetSlider } from "./interface/api";
import * as url from "./url_helper";

const globalsApi = new APIClient();
const productsApi = new APIClient();
const brandsApi = new APIClient();
const countryApi = new APIClient();
const vendorApi = new APIClient();
const districtApi = new APIClient();
const provinceApi = new APIClient();
const fileApi = new APIClient();
const categoryApi = new APIClient();
const authApi = new AuthenticationAPIClient();
const homeApi = new APIClient();
const sliderApi = new APIClient();


const api = new APIClient();
// Gets the logged in user data from local session

// Gets the logged in user data from local session
export const getLoggedUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedUser() !== null;
};

// Register Method
export const postRegister = (data: User) => authApi.create(url.POST_REGISTER, data);

// Login Method
export const postLogin = (data: any) => authApi.create(url.POST_LOGIN, data);


export const postFakeProfile = (data: any) => api.create(url.POST_EDIT_PROFILE, data);
// export const postFakeProfile = (data: any) => api.update(url.POST_EDIT_PROFILE + '/' + data.idx, data);



// Products
export const getProductList = (props?: IGetProductProps) => productsApi.get(url.GET_PRODUCT_LIST, props);
export const addProductList = (data: IPostProduct) => productsApi.create(url.ADD_PRODUCT_LIST, data);
export const updateProductList = (data: any) => productsApi.put(url.UPDATE_PRODUCT_LIST, data);
export const deleteProductList = (data: any) => productsApi.delete(url.DELETE_PRODUCT_LIST, { headers: { data } });
export const getOneProduct = (props: IGetOneProductProps) => productsApi.get(`${url.GET_PRODUCT_LIST}/${props.id}`, null);

// Brands
export const getBrandsList = (props? : IGetAllBrandsProps) => brandsApi.get(url.GET_BRANDS_LIST, props);
export const getOneBrand = (props: IGetOneBrandProps) => brandsApi.get(`${url.GET_BRANDS_LIST}/${props.id}`, null);
export const addBrandsList = (data: IPostBrand) => brandsApi.create(url.ADD_BRANDS_LIST, data);
export const updateBrandsList = (body: IUpdateBrandProps) => brandsApi.put(`${url.UPDATE_BRANDS_LIST}/${body.id}`, body.data);
export const deleteBrandsList = (data: any) => brandsApi.delete(url.DELETE_BRANDS_LIST, { headers: { data } });


// Province
export const getProvinceList = (props? : IGetAllProvinceProps) => provinceApi.get(url.GET_PROVINCE_LIST, props);
export const getOneProvince = (props: IGetOneProvinceProps) => provinceApi.get(`${url.GET_PROVINCE_LIST}/${props.id}`, null);
export const addProvinceList = (data: IProvincePost) => provinceApi.create(url.ADD_PROVINCE_LIST, data);
export const updateProvinceList = (body: IUpdateProvinceProps) => provinceApi.put(`${url.UPDATE_PROVINCE_LIST}/${body.id}`, body.data);
export const deleteProvinceList = (data: any) => provinceApi.delete(url.DELETE_PROVINCE_LIST, { headers: { data } });


// Home manager
export const addHomeManager = (props: CreateHome) => homeApi.create(url.ADD_HOME_LIST, props);
export const getHomeList = (props?: IGetHomeManagerProps) => homeApi.get(`${url.GET_HOME_LIST}`, props);
export const updateHomeManager = (props: UpdateHomeManager) => homeApi.put(`${url.ADD_HOME_LIST}/index`, props);


export const addSliderManager = (props: PostSlider) => sliderApi.create(url.ADD_SLIDER_LIST, props);
export const getSliderList = (props?: GetSlider) => sliderApi.get(`${url.GET_SLIDER_LIST}`, props);
export const removeSlider = (props: {id: number}) => sliderApi.delete(`${url.DELETE_SLIDER_LIST}/${props.id}`, null)

// Globals
export const getGlobalsList = () => globalsApi.get(url.GLOBALS_GET);




// Country
export const getCountryList = (props?: IGetAllCountryProps) => countryApi.get(url.GET_COUNTRYS_LIST, props);
export const getOneCountry = (props: IGetOneCountryProps) => countryApi.get(`${url.GET_COUNTRYS_LIST}/${props.id}`, null);
export const addCountryList = (data: any) => countryApi.create(url.ADD_COUNTRYS_LIST, data);
export const updateCountryList = (props: IUpdateCountryProps) => countryApi.put(`${url.UPDATE_COUNTRYS_LIST}/${props.id}`, props.data);
export const deleteCountryList = (data: any) => countryApi.delete(url.DELETE_COUNTRYS_LIST, { headers: { data } });


// District
export const getDistrictList = (props?: IGetAllDistrictProps) => districtApi.get(url.GET_DISTRICT_LIST, props);
export const getOneDistrict = (props: IGetOneDistrictProps) => districtApi.get(`${url.GET_DISTRICT_LIST}/${props.id}`, null)
export const addDistrictList = (data: IPostDistrict) => districtApi.create(url.ADD_DISTRICT_LIST, data);
export const updateDistrictList = (props: IUpdateDistrictProps) => districtApi.update(`${url.UPDATE_DISTRICT_LIST}/${props.id}`, props.data);
export const deleteDistrictList = (data: any) => districtApi.delete(url.DELETE_DISTRICT_LIST, { headers: { data } });

// Category 
export const addCategoryList = (data: IPostCategory) => categoryApi.create(url.ADD_CATEGORY_LIST, data)
export const getCategoryList = (props?: IGetAllCategoryProps) => categoryApi.get(url.GET_CATEGORY_LIST, props);
export const updateCategoryList = (props: IUpdateCategoryProps) => categoryApi.put(`${url.UPDATE_CATEGORY_LIST}/${props.id}`, props.data);
export const getOneCategory = (props: IGetOneCategoryProps) => categoryApi.get(`${url.GET_CATEGORY_LIST}/${props.id}`, null)
// Vendor
export const getVendorsList = (props?: IGetAllVendorProps) => vendorApi.get(url.GET_VENDORS_LIST, props);
export const addVendorsList = (data: IPostVendors) => vendorApi.create(url.ADD_VENDORS_LIST, data);
export const updateVendorsList = (props: IPutVendor) => vendorApi.put(`${url.UPDATE_VENDORS_LIST}/${props.id}`, props.data);
export const deleteVendorsList = (data: any) => vendorApi.delete(url.DELETE_VENDORS_LIST, { headers: { data } });
export const getOneVendor = (props: IGetOneVendor) => vendorApi.get(`${url.GET_VENDORS_LIST}/${props.id}`, null)
// File
export const uploadFile = (data: File) => {
    return fileApi.upload(url.UPLOAD_FILE, data);
};




// Users
// List View
export const getUserList = () => api.get(url.GET_USER_LIST, null);
export const addUserList = (data: any) => api.create(url.ADD_USER_LIST, data);
export const updateUserList = (data: any) => api.update(url.UPDATE_USER_LIST, data);
export const deleteUserList = (user: any) => api.delete(url.DELETE_USER_LIST, { headers: { user } });



