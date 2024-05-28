
import Login from "pages/Authentication/Login";
import Pages404 from "pages/AuthenticationInner/Pages404";
import Maintenance from "pages/AuthenticationInner/Maintenance";


// Import product views
import ProductsAddNew from "Common/platform/products/add";
import ProductsEdit from "Common/platform/products/edit";
import ProductsListView from "Common/platform/products";
import ProductsOverview from "Common/platform/products/overview";

// Import vendor views
import VendorAddNew from "Common/platform/vendors/add";
import VendorEdit from "Common/platform/vendors/edit";
import VendorListView from "Common/platform/vendors";

// Import brand views
import BrandAddNew from "Common/platform/brands/add";
import BrandEdit from "Common/platform/brands/edit";
import BrandListView from "Common/platform/brands";

// Import country views
import CountryAddNew from "Common/platform/country/add";
import CountryEdit from "Common/platform/country/edit";
import CountryListView from "Common/platform/country";

// Import district views
import DistrictAddNew from "Common/platform/district/add";
import DistrictEdit from "Common/platform/district/edit";
import DistrictListView from "Common/platform/district";
import ProvinceListView from "Common/platform/province";
import ProvinceAddNew from "Common/platform/province/add";
import ProvinceEdit from "Common/platform/province/edit";
import CategoryListView from "Common/platform/category";
import CategoryEdit from "Common/platform/category/edit";
import CategoryAddNew from "Common/platform/category/add";
import HomeManager from "Common/platform/home-manager";
import SliderManager from "Common/platform/slider-manager";
import SlidersAdd from "Common/platform/slider-manager/sliders-add";

interface RouteObject {
  path: string;
  component: React.ComponentType<any>; // Use React.ComponentType to specify the type of the component
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [
  // System routes start here

  // Products
  { path: "/", component: ProductsListView },
  { path: "/products-add", component: ProductsAddNew },
  { path: "/products-edit/:id", component: ProductsEdit },
  { path: "/products-overview/:id", component: ProductsOverview },

  // country
  { path: "/country", component: CountryListView },
  { path: "/country-add", component: CountryAddNew },
  { path: "/country-edit/:id", component: CountryEdit },

  // districts
  { path: "/district", component: DistrictListView },
  { path: "/district-add", component: DistrictAddNew },
  { path: "/district-edit/:id", component: DistrictEdit },

  // Category
  { path: "/category", component: CategoryListView },
  { path: "/category-add", component: CategoryAddNew },
  { path: "/category-edit/:id", component: CategoryEdit },

  // brand
  { path: "/brands", component: BrandListView },
  { path: "/brands-add", component: BrandAddNew },
  { path: "/brands-edit/:id", component: BrandEdit },

  // vendor
  { path: "/vendors", component: VendorListView },
  { path: "/vendors-add", component: VendorAddNew },
  { path: "/vendors-edit/:id", component: VendorEdit },

  // Province
  { path: "/province", component: ProvinceListView },
  { path: "/province-add", component: ProvinceAddNew },
  { path: "/province-edit/:id", component: ProvinceEdit },

  // home manager
  {
    path: "/home-manager", component: HomeManager
  },
  {
    path: "/slider-manager", component: SliderManager
  },
   {
    path: "/sliders-add", component: SlidersAdd
  },
  


];

const publicRoutes = [

  // Error
  { path: "/*", component: Pages404 },

  // Maintenance
  { path: "/pages-maintenance", component: Maintenance },

  // authentication
  { path: "/login", component: Login },
];

export { authProtectedRoutes, publicRoutes };
