/**
 * Common
 */


// Pagination
export interface Paginated<T> {
    results: T;
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    firstRowOnPage: number;
    lastRowOnPage: number;
}


/**
 * API
 * 
 */

// GLOBALS
export interface GlobalsValue {
  name: string;
  value: number;
}
export interface IGlobals {
  title: string;
  values: GlobalsValue[];
}

// Brands

interface IBrandLogo {
  path?: string;
  imageType?: any;
  aspectRatio?: any;
}
interface Brand {
  nameAr: string;
  nameEn: string;
  description: string;
  webSite: string;
  logo: IBrandLogo
}
export interface IBrand extends Brand {
  id: number;
}
export type IPostBrand = Omit<IBrand, 'id'>;
export interface IPutBrand extends IBrand {}
export interface IGetAllBrandsProps { name?: string, page?: number, pageSize?: number }
export interface IGetOneBrandProps { id: number }
export interface IUpdateBrandProps { id: number, data: Partial<Brand> }

// Country
export interface Country {
    enName: string;
    arName: string;
}
export interface ICountry extends Country {
    id: number;
}
export type IPostCountry = Omit<ICountry, 'id'>;
export interface IPutCountry extends ICountry {}
export interface IGetAllCountryProps { name?: string, page?: number, pageSize?: number }
export interface IGetOneCountryProps { id: number }
export interface IUpdateCountryProps { id: number, data: Partial<Country> }

// Province
export interface Province {
  nameAr: string;
  nameEn: string;
  id: number;
  country: ICountry;
}

export interface IProvincePost {
  nameAr: string;
  nameEn: string;
  countryId: number;
}

export interface IPutProvince extends Province {}
export interface IGetAllProvinceProps { name?: string, countryId?: number, page?: number, pageSize?: number }
export interface IGetOneProvinceProps { id: number }
export interface IUpdateProvinceProps { id: number, data: Partial<IProvincePost> }




// Districts

export interface District {
  nameAr: string;
  nameEn: string;
  province: Province;
}
export interface IDistrict extends District {
    id: number;
}
export type IPutDistrict = Partial<IPostDistrict>; 
export interface IPostDistrict {
  nameAr: string;
  nameEn: string;
  provinceId: number
}
export interface IPutCountry extends ICountry {}
export interface IGetAllDistrictProps { name?: string, page?: number, pageSize?: number }
export interface IGetOneDistrictProps { id: number }
export interface IUpdateDistrictProps { id: number, data: Partial<District> }

// Vendors
export interface IGetOneVendor { id: number }
export interface IVendor {
    id: number;
    name: string;
    description: string;
    email: string;
    phoneNumber: string;
    address: string;
    districtId: number;
    vendorType: number;
    userId: string;
}
export type IPostVendors = Omit<IVendor, 'id'>;
export type IPutVendor =  Partial<IVendor>;
export interface IGetAllVendorProps { name?: string, page?: number, pageSize?: number }
export interface IGetOneVendorProps { id: number }




// Category
export interface Category {
  nameAr?: string;
  nameEn?: string;
  parent?: ICategory;
}
export interface ICategory extends Category {
    id: number;
}
export interface IPostCategory {
  nameAr: string;
  nameEn: string;
  parentId: number
}
export type IPutCategory = Partial<IPostCategory>; 

export interface IGetAllCategoryProps { parentId?: number;  name?: string, page?: number, pageSize?: number }
export interface IGetOneCategoryProps { id: number }
export interface IUpdateCategoryProps { id: number, data: Partial<ICategory> }
