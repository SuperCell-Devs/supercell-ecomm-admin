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
  title: 'AsepectRatio' | 'FileImageTypeEnum' | 'ItemTypeEnum' | 'ShowTypeEnum' | 'VendorType'; 
  values: GlobalsValue[];
}

export enum GlobalsNames {
  'AsepectRatio',
  'FileImageTypeEnum',
  'ItemTypeEnum',
  'ShowTypeEnum',
  'VendorType' 
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
interface DistrictWithProvince extends IDistrict {
  province: Province;
}
export enum VendorType {
  Retailer = "Retailer",
  Reseller = "Reseller",
  Wholesaler = "Wholesaler"
}
export interface IVendor {
    id: number;
    name: string;
    description: string;
    email: string;
    phoneNumber: string;
    address: string;
    districtId: number;
    district: DistrictWithProvince;
    vendorType: VendorType;
    userId: string;
    logo: ImageAsset;
    cover: ImageAsset;
}
export interface IPostVendors {
    name: string;
    description: string;
    email: string;
    phoneNumber: string;
    address: string;
    districtId: number;
    vendorType: number;
    userId: string;
    logo?: {
      path?: string;
      aspectRatio?: number;
      imageFileType?: number;
    };
    cover?: {
      path?: string;
      aspectRatio?: number;
      imageFileType?: number;
    }
};
export interface IPutVendor  {
  id: number;
  data: {
    name?: string;
    description?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    districtId?: number;
    vendorType?: number;
    userId?: string;
  }
}

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


// Products

export enum FileImageType {
  Original,
  Small,
  Medium,
  Large
}

export enum AspectRatio {
  _1_1,
  _4_3,
  _16_9,
  _21_9
}
export interface ImageAsset {
  path: string;
  imageType: "Original" | "Small" | "Medium" | "Large";
  aspectRatio:   "_1_1" | "_4_3" | "_16_9" | "_21_9"
}
export interface ProductImage {
  path: string;
  imageType: number,
  aspectRatio: number
}
export interface Product {
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  sku: string;
  isPublished: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  isBestSeller: boolean;
  isVariable: boolean;
  price: number;
  oldPrice: number;
  isAvailable: boolean;
  availableFrom: Date;
  availableTo: Date;
  vendorId: number;
  images: ProductImage[],
  brandId: number;
}

export interface GetProduct {
  name: string,
  description: string,
  shortDescription: string,
  sku: string,
  isPublished: boolean,
  isFeatured: boolean,
  isNew: boolean,
  isOnSale: boolean,
  isBestSeller: boolean,
  price: number,
  oldPrice: number,
  isAvailable: boolean,
  availableFrom: string,
  availableTo: string,
  isVariable: boolean,
  images: ProductImage[],
  vendorId: number,
  vendor: {
    name: string,
    vendorType: VendorType,
    id: number
  },
  brandId: number,
  brand: {
    name: string,
    id: number
  },
  id: number
}

export interface IProduct extends Product {
  id: number;
}

export interface IPostProduct extends Partial<Product> {
  
}

export interface IUpdateProduct {
  id: number;
  data: Partial<IProduct>
}

export interface IGetProductProps {
  name?: string;
  fromPrice?: number;
  toPrice?: number;
  page?: number;
  pageSize?: number;
  isPublished?: boolean;
  isOnSale?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isAvailable?: boolean;
}

export interface IGetOneProductProps {
  id: number;
}

export interface GeTProductsLight {
  name: string;
  image: ProductImage;
  isNew: boolean;
  isOnSale: boolean;
  isBestSeller: boolean;
  price: number;
  isAvailable: boolean;
  id: number;
}

/**
 * Home manager
 */


interface FilterAction {
  categoryFilter: {
        parentId: 0
      },
      productFilter: {
        isPublished: boolean,
        isFeatured: boolean,
        isNew: boolean,
        isOnSale: boolean,
        isBestSeller: boolean,
        isAvailable: boolean,
        vendorId: number,
        brandId: number
      },
      vendorFilter: {},
      sliderFilter: {}
};
export interface CreateHome {
  index: number;
  itemType: number; 
  limit: number,
  redirect: string,
  title: string,
  showType: number,
  backGround: string,
  filterActions: FilterAction[],
  isPreview: boolean
};

export interface IGetHomeManagerProps {
  itemType?: number;
  showType?: number;
  isPreview?: boolean;
  isDeleted?: boolean;
}


export interface HomeItem    {
  id: number;
  redirect?: string;
  title?: string;
  image?: string;
  description?: string;
  backGround?: string;
};
export interface GetHomeManager   {
      index: number;
      itemType: string;
      limit: number;
      redirect: string;
      title: string;
      showType: string;
      backGround: string;
      items: HomeItem[];
      isPreview: boolean;
  id: number;
};

interface UpdateHomeManagerPayload  {
  id: number;
  index: number;
};
export interface UpdateHomeManager {
  newIndexes: UpdateHomeManagerPayload[];
};

// Sliders

export interface Slider {
  image: ImageAsset;
  redirect: string;
  title: string;
  description: string;
  backGround: string;
  isPreview: boolean;
};
export interface GetSlider extends Slider { 
  id: number;
};

export interface PostSlider {
  image: ImageAsset;
  redirect?: string;
  title?: string;
  description?: string;
  backGround?: string;
  isPreview?: boolean;
};