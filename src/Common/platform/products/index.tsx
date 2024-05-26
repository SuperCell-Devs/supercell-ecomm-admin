import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
import Slider from '@mui/material/Slider';
import { Link } from "react-router-dom";
import { Dropdown } from "Common/Components/Dropdown";

// Icon
import {
    MoreHorizontal, Eye, FileEdit,
    Search, Plus,
    CheckCircle2,
    XCircle,
} from 'lucide-react';


// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import {
    getProductList as onGetProductList,
} from 'slices/thunk';
import { GeTProductsLight,  Paginated } from "helpers/interface/api";
import { PaginationState } from "@tanstack/react-table";
import { PaginatedTableContainer } from "Common/platform/common/TableContainer";
import { getImagePath } from "../helpers/getImagePath";
import Modal from "Common/Components/Modal";
import DropdownData from "../common/DropdownData";


const productFeaturesColumns = [
    {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell: any) => (
            <span className="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600">{cell.getValue()}</span>
        ),
    },
    {
        header: "Available",
        accessorKey: "isAvailable",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
            <>
                {cell.getValue() ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">
                        <CheckCircle2 className="size-3 ltr:mr-1 rtl:ml-1"></CheckCircle2>
                        {cell.row.original.status}
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent">
                        <XCircle className="size-3 ltr:mr-1 rtl:ml-1"></XCircle>
                        {cell.row.original.status}
                    </span>
                )
                }

            </>
        ),
    },
    {
        header: "New",
        accessorKey: "isNew",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
            <>
                {cell.getValue() ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">
                        <CheckCircle2 className="size-3 ltr:mr-1 rtl:ml-1"></CheckCircle2>
                        {cell.row.original.status}
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent">
                        <XCircle className="size-3 ltr:mr-1 rtl:ml-1"></XCircle>
                        {cell.row.original.status}
                    </span>
                )
                }

            </>
        ),
    },
    {
        header: "On Sale",
        accessorKey: "isOnSale",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
            <>
                {cell.getValue() ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">
                        <CheckCircle2 className="size-3 ltr:mr-1 rtl:ml-1"></CheckCircle2>
                        {cell.row.original.status}
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent">
                        <XCircle className="size-3 ltr:mr-1 rtl:ml-1"></XCircle>
                        {cell.row.original.status}
                    </span>
                )
                }

            </>
        ),
    },
    {
        header: "Best seller",
        accessorKey: "isBestSeller",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
            <>
                {cell.getValue() ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">
                        <CheckCircle2 className="size-3 ltr:mr-1 rtl:ml-1"></CheckCircle2>
                        {cell.row.original.status}
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent">
                        <XCircle className="size-3 ltr:mr-1 rtl:ml-1"></XCircle>
                        {cell.row.original.status}
                    </span>
                )
                }

            </>
        ),
    },
    {
        header: "Published",
        accessorKey: "isPublished",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
            <>
                {cell.getValue() ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">
                        <CheckCircle2 className="size-3 ltr:mr-1 rtl:ml-1"></CheckCircle2>
                        {cell.row.original.status}
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent">
                        <XCircle className="size-3 ltr:mr-1 rtl:ml-1"></XCircle>
                        {cell.row.original.status}
                    </span>
                )
                }

            </>
        ),
    },
    {
        header: "Featured",
        accessorKey: "isFeatured",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
            <>
                {cell.getValue() ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">
                        <CheckCircle2 className="size-3 ltr:mr-1 rtl:ml-1"></CheckCircle2>
                        {cell.row.original.status}
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent">
                        <XCircle className="size-3 ltr:mr-1 rtl:ml-1"></XCircle>
                        {cell.row.original.status}
                    </span>
                )
                }

            </>
        ),
    },
       {
        header: "Variable",
        accessorKey: "isVariable",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
            <>
                {cell.getValue() ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">
                        <CheckCircle2 className="size-3 ltr:mr-1 rtl:ml-1"></CheckCircle2>
                        {cell.row.original.status}
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded border bg-red-100 border-transparent text-red-500 dark:bg-red-500/20 dark:border-transparent">
                        <XCircle className="size-3 ltr:mr-1 rtl:ml-1"></XCircle>
                        {cell.row.original.status}
                    </span>
                )
                }

            </>
        ),
    },
    {
            header: "Image",
            accessorKey: "image",
            enableColumnFilter: false,
            enableSorting: false,
            cell: (cell: any) => {
                const path = cell.getValue().path;
                return (<img
                    src={getImagePath(path)}
                    alt="image"
                    width={100}
                    height={100}
                    className="avatar-md rounded-circle img-thumbnail"
                  />);
            } 
        },
    {
        header: "Action",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell: any) => (
            <Dropdown className="relative dropdown">
                <Dropdown.Trigger className="flex items-center justify-center size-[30px] dropdown-toggle p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20" id="productAction1" data-bs-toggle="dropdown">
                    <MoreHorizontal className="size-3" />
                </Dropdown.Trigger>
                <Dropdown.Content placement={cell.row.index ? "top-end" : "right-end"} className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md dropdown-menu min-w-[10rem] dark:bg-zink-600" aria-labelledby="productAction1">
                    <li>
                        <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                            to={`/products-overview/${cell.getValue()}`}>
                            <Eye className="inline-block size-3 ltr:mr-1 rtl:ml-1" />
                            <span className="align-middle">Overview</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to={`/products-edit/${cell.getValue()}`}><FileEdit className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Edit</span></Link>
                    </li>
                </Dropdown.Content>
            </Dropdown>
        ),
    }
];


const ProductsListView = () => {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });
    const dispatch = useDispatch<any>();
    const selectDataList = createSelector(
        (state: any) => state.Ecommerce,
        (state) => ({
            dataList: state.products
        })
    );
    const { dataList } = useSelector(selectDataList);
    const [data, setData] = useState<Paginated<GeTProductsLight[]>>();
    // Search state hooks
    const [searchByName, setSearchByName] = useState("");
    const [price, setPrice] = React.useState<number[]>([0, 1000000]);
    const [extraLargeModal, setExtraLargeModal] = useState<boolean>(false);
    const [brand, setBrand] = useState();
    const [vendor, setVendor] = useState();
    const [productFeats, setProductFeats] = useState({
        isPublished: false,
        isOnSale: false,
        isBestSeller: false,
        isNew: false,
        isFeatured: false,
        isAvailable: false
    });
    // Serach handlers
    const openSearchToggle = (e?: any) => {
    setExtraLargeModal(!extraLargeModal)
    };
    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPrice(newValue as number[]);
    };
    const handleSearchDataByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchByName(value);
    dispatch(onGetProductList({
        name: value,
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
        fromPrice: price[0],
        toPrice: price[1],
        isPublished: productFeats.isPublished,
        isOnSale:productFeats.isOnSale,
        isBestSeller:productFeats.isBestSeller,
        isNew: productFeats.isNew,
        isFeatured:productFeats.isFeatured,
        isAvailable:productFeats.isAvailable,
    }));
    };
    function valuetext(value: number) {
        return `${value}IQD`;
    }
    const handleFeatsChange = (e: any) => setProductFeats({ ...productFeats, [e.target.name]: e.target.checked });

    const handleResetSearch = () => { 
        setPrice([0, 1000000]);
        setProductFeats({
             isPublished: false,
             isOnSale: false,
             isBestSeller: false,
             isNew: false,
             isFeatured: false,
             isAvailable: false
         });
        openSearchToggle()
    };
    const handleSubmitSearch = () => { 
        openSearchToggle();
        dispatch(onGetProductList({
                name: searchByName,
                page: pagination.pageIndex < 1 ? 1 : pagination.pageIndex,
                pageSize: pagination.pageSize,
                fromPrice: price[0],
                toPrice: price[1],
                isPublished: productFeats.isPublished,
                isOnSale:productFeats.isOnSale,
                isBestSeller:productFeats.isBestSeller,
                isNew:productFeats.isNew,
                isFeatured:productFeats.isFeatured,
            isAvailable: productFeats.isAvailable,
        }));
    };

    // Get Data
    useEffect(() => {
        dispatch(onGetProductList({
                name: searchByName,
                page: pagination.pageIndex < 1 ? 1 : pagination.pageIndex,
                pageSize: pagination.pageSize,
                fromPrice: price[0],
                toPrice: price[1],
                isPublished: productFeats.isPublished,
                isOnSale:productFeats.isOnSale,
                isBestSeller:productFeats.isBestSeller,
                isNew:productFeats.isNew,
                isFeatured:productFeats.isFeatured,
            isAvailable: productFeats.isAvailable,
        }));
    }, [dispatch, pagination.pageIndex, pagination.pageSize]);

    useEffect(() => {
        setData(dataList);
    }, [dataList]);


    const columns = useMemo(() => productFeaturesColumns, []);
    const SearchModal = (<Modal
        show={extraLargeModal}
        onHide={openSearchToggle}
        modal-center="true"
        className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen lg:w-[55rem] bg-white shadow rounded-md dark:bg-zink-600 flex flex-col h-full">
            <Modal.Header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500 dark:text-zink-200 dark:hover:text-red-500">
                    <Modal.Title className="text-16">Products Advanced Search</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <div className="w-1/2 mx-auto py-8">
                        <label className="inline-block mb-2 text-base font-medium"><span className="font-bold">Price Range(IQD)</span>: <span className="text-lg">{price[0]}</span> - <span className="text-lg">{price[1]}</span></label>
                        <Slider
                            getAriaLabel={() => 'Price range'}
                            value={price}
                            defaultValue={0}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                />
                    
                    <label className="inline-block mb-2 text-base font-medium">Select Brand</label>
                    <DropdownData data="brands" setState={setBrand} state={brand} title="Select Brand" />
                    <div className="my-6"></div>
                    <label className="inline-block mb-2 text-base font-medium">Select Vendor</label>
                    <DropdownData data="vendors" setState={setVendor} state={vendor} title="Select Vendor" />
                        <label className="inline-block mb-2 text-base font-medium mt-8">Product features</label>
                        <div className="flex  flex-wrap justify-start items-center gap-4">
                            <input
                                id="checkboxOutline14"
                                className="size-4 cursor-pointer bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-sky-500 checked:border-sky-500 dark:after:text-sky-500 dark:checked:border-sky-800"
                                type="checkbox"
                            name="isPublished"
                            onChange={handleFeatsChange}
                                checked={productFeats["isPublished"]}
                                />
                                <label htmlFor="checkboxOutline14" className="align-middle">
                                        Published
                                </label>
                        
                        <input
                                id="checkboxOutline14"
                                className="size-4 cursor-pointer bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-sky-500 checked:border-sky-500 dark:after:text-sky-500 dark:checked:border-sky-800"
                            type="checkbox"
                            onChange={handleFeatsChange}
                                name="isNew"
                                checked={productFeats["isNew"]}
                                />
                                    <label htmlFor="checkboxOutline14" className="align-middle">
                                        New
                        </label>
                        
                        <input
                            onChange={handleFeatsChange}
                                id="checkboxOutline14"
                                className="size-4 cursor-pointer bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-sky-500 checked:border-sky-500 dark:after:text-sky-500 dark:checked:border-sky-800"
                                type="checkbox"
                                name="isFeatured"
                                checked={productFeats["isFeatured"]}
                                />
                                    <label htmlFor="checkboxOutline14" className="align-middle">
                                        Featured
                        </label>
                        
                        <input
                            onChange={handleFeatsChange}
                                id="checkboxOutline14"
                                className="size-4 cursor-pointer bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-sky-500 checked:border-sky-500 dark:after:text-sky-500 dark:checked:border-sky-800"
                                type="checkbox"
                                name="isBestSeller"
                                checked={productFeats["isBestSeller"]}
                                />
                                    <label htmlFor="checkboxOutline14" className="align-middle">
                                        Best Seller
                        </label>
                        
                        <input
                            onChange={handleFeatsChange}
                                id="checkboxOutline14"
                                className="size-4 cursor-pointer bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-sky-500 checked:border-sky-500 dark:after:text-sky-500 dark:checked:border-sky-800"
                                type="checkbox"
                                name="isOnSale"
                                checked={productFeats["isOnSale"]}
                                />
                                    <label htmlFor="checkboxOutline14" className="align-middle">
                                        On Sale
                        </label>
                        
                        <input
                            onChange={handleFeatsChange}
                                id="checkboxOutline14"
                                className="size-4 cursor-pointer bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-sky-500 checked:border-sky-500 dark:after:text-sky-500 dark:checked:border-sky-800"
                                type="checkbox"
                                name="isAvailable"
                                checked={productFeats["isAvailable"]}
                                />
                                    <label htmlFor="checkboxOutline14" className="align-middle">
                                        Available
                                    </label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex items-center justify-between p-4 mt-auto border-t border-slate-200 dark:border-zink-500">
                    <div className="flex gap-x-3">
                        <button
                    type="button"
                        onClick={handleResetSearch}
                            className="text-red-500 bg-white border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:bg-zink-700 dark:hover:bg-red-500 dark:ring-red-400/20 dark:focus:bg-red-500">
                            Cancel
                        </button>
                <button
                            onClick={handleSubmitSearch}
                            type="button"
                            className="bg-white text-slate-500 btn border-slate-500 hover:text-white hover:bg-slate-600 hover:border-slate-600 focus:text-white focus:bg-slate-600 focus:border-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:border-slate-600 active:ring active:ring-slate-100 dark:bg-zink-700 dark:hover:bg-slate-500 dark:ring-slate-400/20 dark:focus:bg-slate-500">
                            Search
                         </button>
                    </div>
                </Modal.Footer>
            </Modal>);
    
    
    return (
        <React.Fragment>
            <BreadCrumb title='Products' pageTitle='List' />
            {SearchModal}
            <div className="card">
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-12">
                        <div className="xl:col-span-3">
                            <div className="relative">
                                <input value={searchByName} type="text" className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Search for ..." autoComplete="off" onChange={handleSearchDataByName} />
                                <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600" />
                            </div>
                        </div>
                    
                        <div className="lg:col-span-3 ltr:lg:text-right rtl:lg:text-left xl:col-span-3 xl:col-start-10 flex gap-x-3">
                            <Link to="/products-add" type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"><Plus className="inline-block size-4" /> <span className="align-middle">Add Product</span></Link>
                            <button
                                type="button"
                                onClick={openSearchToggle}
                                className="text-white bg-green-500 border-green-500 btn hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/10">
                                Advanced Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    {
                        data && data.results &&
                        <PaginatedTableContainer
                            columns={columns}
                            data={data}
                            pagination={pagination}
                            setPagination={setPagination}
                        />
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProductsListView;