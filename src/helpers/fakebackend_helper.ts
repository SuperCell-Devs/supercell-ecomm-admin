import { User } from "slices/thunk";
import { APIClient, AuthenticationAPIClient } from "./api_helper";
import { IGetAllBrandsProps, IGetAllCountryProps, IGetAllDistrictProps, IGetAllProvinceProps, IGetOneBrandProps, IGetOneCountryProps, IGetOneDistrictProps, IGetOneProvinceProps, IPostBrand, IPostDistrict, IPostVendors, IProvincePost, IUpdateBrandProps, IUpdateCountryProps, IUpdateDistrictProps, IUpdateProvinceProps } from "./interface/api";
import * as url from "./url_helper";


const productsApi = new APIClient();
const brandsApi = new APIClient();
const countryApi = new APIClient();
const vendorApi = new APIClient();
const districtApi = new APIClient();
const provinceApi = new APIClient();
const fileApi = new APIClient();
const authApi = new AuthenticationAPIClient();

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

// postForgetPwd
export const postFakeForgetPwd = (data: any) => api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data: any) => api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data: any) => api.create(url.POST_EDIT_PROFILE, data);
// export const postFakeProfile = (data: any) => api.update(url.POST_EDIT_PROFILE + '/' + data.idx, data);

// Register Method
export const postJwtRegister = (url: any, data: any) => {
  return api.create(url, data)
    .catch((err: any) => {
      let message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message = "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};
// Login Method
export const postJwtLogin = (data: any) => api.create(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = (data: any) => api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data: any) => api.create(url.SOCIAL_LOGIN, data);

// Chat
export const getChat = (roomId: any) => api.get(`${url.GET_CHAT}/${roomId}`, { params: { roomId } });
export const addChat = (data: any) => api.create(url.ADD_CHAT, data);
export const deleteChat = (data: any) => api.delete(url.DELETE_CHAT, { headers: { data } });
export const bookmarkChat = (data: any) => api.delete(url.BOOKMARK_CHAT, { headers: { data } });

// Mailbox
export const getMail = () => api.get(url.GET_MAIL, null);
export const deleteMail = (data: any) => api.delete(url.DELETE_MAIL, { headers: { data } });
export const unreadMail = (data: any) => api.delete(url.UNREAD_MAIL, { headers: { data } });
export const staredMail = (data: any) => api.delete(url.STARED_MAIL, { headers: { data } });
export const trashMail = (data: any) => api.delete(url.TRASH_MAIL, { headers: { data } });

// Calendar
export const getEvents = () => api.get(url.GET_EVENT, null);
export const addEvents = (data: any) => api.create(url.ADD_EVENT, data);
export const updateEvents = (data: any) => api.update(url.UPDATE_EVENT, data);
export const deleteEvents = (data: any) => api.delete(url.DELETE_EVENT, { headers: { data } });

// Category
export const getCategory = () => api.get(url.GET_CATEGORY, null);
export const deleteCategory = (data: any) => api.delete(url.DELETE_CATEGORY, { headers: { data } });

// Ecommerce
// Orders
export const getOrders = () => api.get(url.GET_ORDERS, null);
export const addOrders = (data: any) => api.create(url.ADD_ORDERS, data);
export const updateOrders = (data: any) => api.update(url.UPDATE_ORDERS, data);
export const deleteOrders = (data: any) => api.delete(url.DELETE_ORDERS, { headers: { data } });

// Sellers
export const getSellers = () => api.get(url.GET_SELLERS, null);
export const addSellers = (data: any) => api.create(url.ADD_SELLERS, data);
export const updateSellers = (data: any) => api.update(url.UPDATE_SELLERS, data);
export const deleteSellers = (data: any) => api.delete(url.DELETE_SELLERS, { headers: { data } });

// Products
export const getProductList = () => productsApi.get(url.GET_PRODUCT_LIST, null);
export const addProductList = (data: any) => productsApi.create(url.ADD_PRODUCT_LIST, data);
export const updateProductList = (data: any) => productsApi.update(url.UPDATE_PRODUCT_LIST, data);
export const deleteProductList = (data: any) => productsApi.delete(url.DELETE_PRODUCT_LIST, { headers: { data } });


// Brands
export const getBrandsList = (props? : IGetAllBrandsProps) => brandsApi.get(url.GET_BRANDS_LIST, props);
export const getOneBrand = (props: IGetOneBrandProps) => brandsApi.get(`${url.GET_BRANDS_LIST}/${props.id}`);
export const addBrandsList = (data: IPostBrand) => brandsApi.create(url.ADD_BRANDS_LIST, data);
export const updateBrandsList = (body: IUpdateBrandProps) => brandsApi.put(`${url.UPDATE_BRANDS_LIST}/${body.id}`, body.data);
export const deleteBrandsList = (data: any) => brandsApi.delete(url.DELETE_BRANDS_LIST, { headers: { data } });


// Province
export const getProvinceList = (props? : IGetAllProvinceProps) => provinceApi.get(url.GET_PROVINCE_LIST, props);
export const getOneProvince = (props: IGetOneProvinceProps) => provinceApi.get(`${url.GET_PROVINCE_LIST}/${props.id}`);
export const addProvinceList = (data: IProvincePost) => provinceApi.create(url.ADD_PROVINCE_LIST, data);
export const updateProvinceList = (body: IUpdateProvinceProps) => provinceApi.put(`${url.UPDATE_PROVINCE_LIST}/${body.id}`, body.data);
export const deleteProvinceList = (data: any) => provinceApi.delete(url.DELETE_PROVINCE_LIST, { headers: { data } });



// Country
export const getCountryList = (props?: IGetAllCountryProps) => countryApi.get(url.GET_COUNTRYS_LIST, props);
export const getOneCountry = (props: IGetOneCountryProps) => countryApi.get(`${url.GET_COUNTRYS_LIST}/${props.id}`, null);
export const addCountryList = (data: any) => countryApi.create(url.ADD_COUNTRYS_LIST, data);
export const updateCountryList = (props: IUpdateCountryProps) => countryApi.put(`${url.UPDATE_COUNTRYS_LIST}/${props.id}`, props.data);
export const deleteCountryList = (data: any) => countryApi.delete(url.DELETE_COUNTRYS_LIST, { headers: { data } });


// District
export const getDistrictList = (props?: IGetAllDistrictProps) => districtApi.get(url.GET_DISTRICT_LIST, props);
export const getOneDistrict = (props: IGetOneDistrictProps) => districtApi.get(`${url.GET_DISTRICT_LIST}/${props.id}`, props)
export const addDistrictList = (data: IPostDistrict) => districtApi.create(url.ADD_DISTRICT_LIST, data);
export const updateDistrictList = (props: IUpdateDistrictProps) => districtApi.update(`${url.UPDATE_DISTRICT_LIST}/${props.id}`, props.data);
export const deleteDistrictList = (data: any) => districtApi.delete(url.DELETE_DISTRICT_LIST, { headers: { data } });


// Vendor
export const getVendorsList = () => vendorApi.get(url.GET_DISTRICT_LIST, null);
export const addVendorsList = (data: IPostVendors) => vendorApi.create(url.ADD_DISTRICT_LIST, data);
export const updateVendorsList = (data: any) => vendorApi.update(url.UPDATE_DISTRICT_LIST, data);
export const deleteVendorsList = (data: any) => vendorApi.delete(url.DELETE_DISTRICT_LIST, { headers: { data } });

// File
export const uploadFile = (data: File) => {
    return fileApi.upload(url.UPLOAD_FILE, data);
};

// // Grid View
// export const getProductGrid = () => api.get(url.GET_PRODUCT_GRID, null);
// export const addProductGrid = (data: any) => api.create(url.ADD_PRODUCT_GRID, data);
// export const updateProductGrid = (data: any) => api.update(url.UPDATE_PRODUCT_GRID, data);
// export const deleteProductGrid = (data: any) => api.delete(url.DELETE_PRODUCT_GRID, { headers: { data } });

// // Overview
// export const getReview = () => api.get(url.GET_REVIEW, null);
// export const addReview = (data: any) => api.create(url.ADD_REVIEW, data);
// export const updateReview = (data: any) => api.update(url.UPDATE_REVIEW, data);
// export const deleteReview = (data: any) => api.delete(url.DELETE_REVIEW, { headers: { data } });

// HR Management
// Employee List
export const getEmployee = () => api.get(url.GET_EMPLOYEE, null);
export const addEmployee = (data: any) => api.create(url.ADD_EMPLOYEE, data);
export const updateEmployee = (data: any) => api.update(url.UPDATE_EMPLOYEE, data);
export const deleteEmployee = (data: any) => api.delete(url.DELETE_EMPLOYEE, { headers: { data } });

// Holidays
export const getHolidays = () => api.get(url.GET_HOLIDAYS, null);
export const addHolidays = (data: any) => api.create(url.ADD_HOLIDAYS, data);
export const updateHolidays = (data: any) => api.update(url.UPDATE_HOLIDAYS, data);
export const deleteHolidays = (data: any) => api.delete(url.DELETE_HOLIDAYS, { headers: { data } });

// Leaves Manage

// Leave Manage (Employee)
export const getLeaveManageEmployee = () => api.get(url.GET_LEAVE_MANAGE_EMPLOYEE, null);

// Leave Manage (HR)
export const getLeaveManageHR = () => api.get(url.GET_LEAVE_MANAGE_HR, null);
export const addLeaveManageHR = (data: any) => api.create(url.ADD_LEAVE_MANAGE_HR, data);
export const updateLeaveManageHR = (data: any) => api.update(url.UPDATE_LEAVE_MANAGE_HR, data);
export const deleteLeaveManageHR = (data: any) => api.delete(url.DELETE_LEAVE_MANAGE_HR, { headers: { data } });

// Attendance
// Attendance (HR)
export const getAttendance = () => api.get(url.GET_ATTENDANCE, null);

// Main Attendance
export const getMainAttendance = () => api.get(url.GET_MAIN_ATTENDANCE, null);

// Departments
export const getDepartments = () => api.get(url.GET_DEPARTMENTS, null);
export const addDepartments = (data: any) => api.create(url.ADD_DEPARTMENTS, data);
export const updateDepartments = (data: any) => api.update(url.UPDATE_DEPARTMENTS, data);
export const deleteDepartments = (data: any) => api.delete(url.DELETE_DEPARTMENTS, { headers: { data } });

// Sales
// Estimates
export const getEstimates = () => api.get(url.GET_ESTIMATES, null);
export const addEstimates = (data: any) => api.create(url.ADD_ESTIMATES, data);
export const updateEstimates = (data: any) => api.update(url.UPDATE_ESTIMATES, data);
export const deleteEstimates = (data: any) => api.delete(url.DELETE_ESTIMATES, { headers: { data } });

// Payments
export const getPayments = () => api.get(url.GET_PAYMENTS, null);

// Expenses
export const getExpenses = () => api.get(url.GET_EXPENSES, null);
export const addExpenses = (data: any) => api.create(url.ADD_EXPENSES, data);
export const updateExpenses = (data: any) => api.update(url.UPDATE_EXPENSES, data);
export const deleteExpenses = (data: any) => api.delete(url.DELETE_EXPENSES, { headers: { data } });

// Payroll
// Employee Salary
export const getEmployeeSalary = () => api.get(url.GET_EMPLOYEE_SALARY, null);
export const addEmployeeSalary = (data: any) => api.create(url.ADD_EMPLOYEE_SALARY, data);
export const updateEmployeeSalary = (data: any) => api.update(url.UPDATE_EMPLOYEE_SALARY, data);
export const deleteEmployeeSalary = (data: any) => api.delete(url.DELETE_EMPLOYEE_SALARY, { headers: { data } });

// Notes
export const getNotes = () => api.get(url.GET_NOTES, null);
export const addNotes = (data: any) => api.create(url.ADD_NOTES, data);
export const updateNotes = (data: any) => api.update(url.UPDATE_NOTES, data);
export const deleteNotes = (data: any) => api.delete(url.DELETE_NOTES, { headers: { data } });

// Social
// Friends
export const getSocialFriends = () => api.get(url.GET_SOCIAL_FRIENDS, null);

// Events
export const getSocialEvent = () => api.get(url.GET_SOCIAL_EVENTS, null);
export const addSocialEvent = (data: any) => api.create(url.ADD_SOCIAL_EVENTS, data);
export const updateSocialEvent = (data: any) => api.update(url.UPDATE_SOCIAL_EVENTS, data);
export const deleteSocialEvent = (data: any) => api.delete(url.DELETE_SOCIAL_EVENTS, { headers: { data } });

// Invoices
export const getInvoiceList = () => api.get(url.GET_INVOICE_LIST, null);

// Users
// List View
export const getUserList = () => api.get(url.GET_USER_LIST, null);
export const addUserList = (data: any) => api.create(url.ADD_USER_LIST, data);
export const updateUserList = (data: any) => api.update(url.UPDATE_USER_LIST, data);
export const deleteUserList = (user: any) => api.delete(url.DELETE_USER_LIST, { headers: { user } });

// Grid View
export const getUserGrid = () => api.get(url.GET_USER_GRID, null);
export const addUserGrid = (data: any) => api.create(url.ADD_USER_GRID, data);
export const updateUserGrid = (data: any) => api.update(url.UPDATE_USER_GRID, data);
export const deleteUserGrid = (user: any) => api.delete(url.DELETE_USER_GRID, { headers: { user } });