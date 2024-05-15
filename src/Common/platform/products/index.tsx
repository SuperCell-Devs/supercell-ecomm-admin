import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
import Flatpickr from 'react-flatpickr';
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
import { PaginatedTableContainer } from "Common/TableContainer";
import { getImagePath } from "../helpers/getImagePath";


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
            accessorKey: "image.path",
            enableColumnFilter: false,
            enableSorting: false,
            cell: (cell: any) => {
                const path = cell.getValue().path;
                return (<img
                    src={getImagePath(path)}
                    alt="image"
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
    const [searchByName, setSearchByName] = useState("");
    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();

    // Get Data
    useEffect(() => {
        dispatch(onGetProductList({
            page: pagination.pageIndex < 1 ? 1 : pagination.pageIndex,
            pageSize: pagination.pageSize
        }));
    }, [dispatch, pagination.pageIndex, pagination.pageSize]);

    useEffect(() => {
        setData(dataList);
    }, [dataList]);

    const handleSearchDataByName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchByName(value);
        dispatch(onGetProductList({
            name: value,
            page: pagination.pageIndex,
            pageSize: pagination.pageSize  }));
    };

    const columns = useMemo(() => productFeaturesColumns, []);

    return (
        <React.Fragment>
            <BreadCrumb title='Products' pageTitle='List' />
          
            <div className="card" id="productListTable">
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-12">
                        <div className="xl:col-span-3">
                            <div className="relative">
                                <input value={searchByName} type="text" className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Search for ..." autoComplete="off" onChange={handleSearchDataByName} />
                                <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600" />
                            </div>
                        </div>
                        <div className="xl:col-span-2">
                            <div>
                                <Flatpickr
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    value={fromDate}
                                    options={{
                                        dateFormat: "d M, Y",
                                        mode: "single"
                                    }}
                                    placeholder='From date'
                                    onChange={(e) => {
                                        const value = e[0];
                                        setFromDate(value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="xl:col-span-2">
                        <div>
                             <Flatpickr
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    value={toDate}
                                    options={{
                                        dateFormat: "d M, Y",
                                        mode: "single",
                                    }}
                                    placeholder='To date'
                                    onChange={(e) => {
                                        const value = e[0];
                                        setToDate(value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-2 ltr:lg:text-right rtl:lg:text-left xl:col-span-2 xl:col-start-11">
                            <Link to="/products-add" type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"><Plus className="inline-block size-4" /> <span className="align-middle">Add Product</span></Link>
                        </div>
                    </div>
                </div>
                <div className="!pt-1 card-body">
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