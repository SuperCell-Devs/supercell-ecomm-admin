import React, { Fragment, useEffect, useMemo, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
// import Flatpickr from 'react-flatpickr';
import { Link } from "react-router-dom";
import { Dropdown } from "Common/Components/Dropdown";

// Icon
import { MoreHorizontal, FileEdit, Search, Plus, View } from 'lucide-react';

// import TableContainer from "Common/TableContainer";

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import {
    getVendorList as onGetVendorsList,
} from 'slices/thunk';
import { IVendor, Paginated } from "helpers/interface/api";
import Modal from "Common/Components/Modal";
import VendorPreviewCard from "../common/VendorPreviewCard";
import TableContainer from "Common/TableContainer";
import { PaginationState } from "@tanstack/react-table";



const VendorsListView = () => {

    const dispatch = useDispatch<any>();
    const [search, setSearch] = useState<string>("");
    const [extraLargeModal, setExtraLargeModal] = useState<boolean>(false);
    const [vendorPreviewData, setVendorPreviewData] = useState<IVendor>(); 
    const vendorPreviewToggle = (data: IVendor) => {
        setVendorPreviewData(data);
        setExtraLargeModal(!extraLargeModal)
    };

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  })

    const selectDataList = createSelector(
        (state: any) => state.Ecommerce,
        (state) => ({
            dataList: state.vendors
        })
    );

    const { dataList } = useSelector(selectDataList);

    const [data, setData] = useState<Paginated<IVendor[]>>();

    // search vendors by name
    const dataSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
    }

    // Get Data
    useEffect(() => {        
        dispatch(onGetVendorsList({
            name: search,
            page: pagination.pageIndex < 1 ? 1 : pagination.pageIndex,
            pageSize: pagination.pageSize
        }));
    }, [dispatch, search, pagination.pageIndex, pagination.pageSize]);

    useEffect(() => {
        setData(dataList);
    }, [dataList]);

    const columns = useMemo(() => [
      
      {
            header: "Name",
            accessorKey: "name",
            enableColumnFilter: false,
            enableSorting: false,
          
        },
        {
            header: "Description",
            accessorKey: "description",
            enableColumnFilter: false,
            enableSorting: false,
            cell: (cell: any) => {
                const descrition = cell.getValue();
                return (<div className="w-80 overflow-x-hidden text-ellipsis ">{descrition}</div>);
            } 
        },
        {
            header: "Email",
            accessorKey: "email",
            enableColumnFilter: false,
            enableSorting: false,
        },
        {
            header: "Address",
            accessorKey: "address",
            enableColumnFilter: false,
            enableSorting: false,
        },
        {
            header: "Vendor",
            accessorKey: "vendorType",
            enableColumnFilter: false,
            enableSorting: false,
        },
        {
            header: "Province",
            accessorKey: "district.province.nameEn",
            enableColumnFilter: false,
            enableSorting: false,
        },
        {
            header: "Action",
            accessorKey: "id",
            enableColumnFilter: false,
            enableSorting: false,
            cell: (cell: any) => {
                return (
                    <Dropdown className="relative dropdown">
                        <Dropdown.Trigger className="flex items-center justify-center size-[30px] dropdown-toggle p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20" id="productAction1" data-bs-toggle="dropdown">
                            <MoreHorizontal className="size-3" />
                        </Dropdown.Trigger>
                        <Dropdown.Content placement={cell.row.index ? "top-end" : "right-end"} className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md dropdown-menu min-w-[10rem] dark:bg-zink-600" aria-labelledby="productAction1">
                            <li>
                                <Link 
                                className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 
                                focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 
                                dark:focus:bg-zink-500 dark:focus:text-zink-200" to={`/vendors-edit/${cell.getValue()}`}><FileEdit className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Edit</span></Link>
                            </li>
                           <li>
                                <div
                                    className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                                    onClick={() => {
                                        const rowData: IVendor = cell.row.original;
                                        vendorPreviewToggle(rowData)
                                    }}>
                                    <View className="inline-block size-3 ltr:mr-1 rtl:ml-1" />
                                    <span className="align-middle">View</span>
                                </div>
                            </li>
                            {/* <li>
                                <Link className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200" to="#!" onClick={() => {
                                    const data = cell.row.original;
                                    onClickDelete(data);
                                }}><Trash2 className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Delete</span></Link>
                            </li> */}
                        </Dropdown.Content>
                    </Dropdown>
                )
            },
        }
    ], []
    );

    return (
        <React.Fragment>
            <BreadCrumb title='Vendors' pageTitle='List' />
            <Modal show={extraLargeModal} onHide={vendorPreviewToggle} id="extraLargeModal" modal-center="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
                dialogClassName="w-screen lg:w-[55rem] bg-white shadow rounded-md dark:bg-zink-600 flex flex-col h-full">
                <Modal.Header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500 dark:text-zink-200 dark:hover:text-red-500">
                    <Modal.Title className="text-16">Vendor preview</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
                    <VendorPreviewCard
                        address={vendorPreviewData?.address}
                        description={vendorPreviewData?.description}
                        title={vendorPreviewData?.name}
                        district={vendorPreviewData?.district?.nameAr}
                        email={vendorPreviewData?.email}
                        logo={vendorPreviewData?.logo?.path}
                        phoneNumber={vendorPreviewData?.phoneNumber}
                        vendorType={vendorPreviewData?.vendorType}
                        cover={vendorPreviewData?.cover?.path}
                    />
                </Modal.Body>
            </Modal>
            <div className="card" id="productListTable">
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-12">
                        <div className="xl:col-span-3">
                            <div className="relative">
                                <input type="text" value={search} className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Search for ..." autoComplete="off" onChange={dataSearch} />
                                <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600" />
                            </div>
                        </div>
                        <div className="lg:col-span-2 ltr:lg:text-right rtl:lg:text-left xl:col-span-2 xl:col-start-11">
                            <Link to="/vendors-add" type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"><Plus className="inline-block size-4" /> <span className="align-middle">Add Vendors</span></Link>
                        </div>
                    </div>
                </div>
                <div className="!pt-1 card-body">
                    {
                        data && data.results &&
                        <TableContainer
                            setPagination={setPagination}
                            pageIndex={pagination.pageIndex}
                            pageSize={pagination.pageSize}
                            isPagination={true}
                            SearchPlaceholder="Search Vendors"
                            columns={(columns || [])}
                            data={(data.results || [])}
                            customPageSize={10}
                            divclassName="overflow-x-auto"
                            tableclassName="w-full whitespace-nowrap"
                            theadclassName="ltr:text-left rtl:text-right bg-slate-100 dark:bg-zink-600"
                            thclassName="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500"
                            tdclassName="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500"
                            PaginationClassName="flex flex-col items-center gap-4 px-4 mt-4 md:flex-row"
                        />
                       }
                </div>
            </div>
        </React.Fragment>
    );
};



export default VendorsListView;