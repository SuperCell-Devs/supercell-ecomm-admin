/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
// import Flatpickr from 'react-flatpickr';
import { Link } from "react-router-dom";
import { Dropdown } from "Common/Components/Dropdown";

// Icon
import { MoreHorizontal, FileEdit, Search, Plus } from 'lucide-react';

// import DeleteModal from "Common/DeleteModal";

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import {
    getCountryList as onGetCountryList,
    // deleteCountryList as onDeleteCountryList
} from 'slices/thunk';
import { ToastContainer } from "react-toastify";
import { ICountry, Paginated } from "helpers/interface/api";
import { PaginationState } from "@tanstack/react-table";
import { PaginatedTableContainer } from "Common/TableContainer";
// import filterDataBySearch from "Common/filterDataBySearch";

const CountryListView = () => {

    const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  })
    const dispatch = useDispatch<any>();
    const [, setSearch] = useState("");
    const selectDataList = createSelector(
        (state: any) => state.Ecommerce,
        (state) => ({
            dataList: state.country
        })
    );

    const { dataList } = useSelector(selectDataList);

    const [data, setData] = useState<Paginated<ICountry[]>>();
    // const [eventData, setEventData] = useState<any>();

    // Get Data
    useEffect(() => {
        dispatch(onGetCountryList());
    }, [dispatch]);

    useEffect(() => {
        setData(dataList);
    }, [dataList]);

    const handleDataSearch = (e: any) => {
        const value = e.target.value;
        dispatch(onGetCountryList({name: value}));
        setSearch(value);
    }

    // Delete Modal
    // const [deleteModal, setDeleteModal] = useState<boolean>(false);
    // const deleteToggle = () => setDeleteModal(!deleteModal);

    // // Delete Data
    // const onClickDelete = (cell: any) => {
    //     setDeleteModal(true);
    //     if (cell.id) {
    //         setEventData(cell);
    //     }
    // };

    // const handleDelete = () => {
    //     if (eventData) {
    //         dispatch(onDeleteCountryList(eventData.id));
    //         setDeleteModal(false);
    //     }
    // };

    // // Search Data
    // const filterSearchData = (e: any) => {
    //     const search = e.target.value;
    //     const keysToSearch = ['productCode', 'productName', 'category', 'status'];
    //     filterDataBySearch(dataList, search, keysToSearch, setData);
    // };

    
    
    const columns = useMemo(() => [
        {
            header: "Name English",
            accessorKey: "enName",
            enableColumnFilter: false,
            enableSorting: true,
            cell: (cell: any) => (
                <span className="category px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-500/20 dark:border-slate-500/20 dark:text-zink-200">{cell.getValue()}</span>
            ),
        },
        {
            header: "Name Arabic",
            accessorKey: "arName",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <span className="category px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-500/20 dark:border-slate-500/20 dark:text-zink-200">{cell.getValue()}</span>
            ),
        },
        {
            header: "Action",
            accessorKey: "id",
            enableColumnFilter: false,
            enableSorting: true,
            cell: (cell: any) => (
                <Dropdown className="relative dropdown">
                    <Dropdown.Trigger className="flex items-center justify-center size-[30px] dropdown-toggle p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20" id="productAction1" data-bs-toggle="dropdown">
                        <MoreHorizontal className="size-3" />
                    </Dropdown.Trigger>
                    <Dropdown.Content placement={cell.row.index ? "top-end" : "right-end"} className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md dropdown-menu min-w-[10rem] dark:bg-zink-600" aria-labelledby="productAction1">
                    
                        <li>
                            <Link className="block px-4 py-1.5 text-base 
                            transition-all duration-200 ease-linear
                             text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 
                             focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100
                              dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500
                               dark:focus:text-zink-200" to={`/country-edit/${cell.getValue()}`}><FileEdit className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Edit</span></Link>
                        </li>
                     
                    </Dropdown.Content>
                </Dropdown>
            ),
        }
    ], []
    );

    return (
        <React.Fragment>
            <BreadCrumb title='Dashboard' pageTitle='Country' />
            {/* <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} /> */}
            <ToastContainer closeButton={false} limit={1} />
            <div className="card" id="productListTable">
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-12">
                        <div className="xl:col-span-3">
                            <div className="relative">
                                <input type="text" className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Search for ..." autoComplete="off" onChange={handleDataSearch} />
                                <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600" />
                            </div>
                        </div>
                        <div className="lg:col-span-2 ltr:lg:text-right rtl:lg:text-left xl:col-span-2 xl:col-start-11">
                            <Link to="/country-add" type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"><Plus className="inline-block size-4" /> <span className="align-middle">Add Country</span></Link>
                        </div>
                    </div>
                </div>
                <div className="!pt-1 card-body">
                    {data && data.results &&
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

export default CountryListView;