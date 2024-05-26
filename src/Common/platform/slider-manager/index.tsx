import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
import { Link } from "react-router-dom";
import { Dropdown } from "Common/Components/Dropdown";

// Icon
import {
    MoreHorizontal,
    Plus,
    CheckCircle2,
    XCircle,
    Trash2,
} from 'lucide-react';


// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import {
    getSliderList as onGetSliderList,
    removeSliderList as onDeleteSlider
} from 'slices/thunk';
import {  GetSlider,  Paginated } from "helpers/interface/api";
import { PaginationState } from "@tanstack/react-table";
import { PaginatedTableContainer } from "Common/platform/common/TableContainer";
import { getImagePath } from "../helpers/getImagePath";
import DeleteModal from "Common/DeleteModal";




const SliderManager = () => {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const dispatch = useDispatch<any>();
    const selectDataList = createSelector(
        (state: any) => state.Ecommerce,
        (state) => ({
            dataList: state.sliders
        })
    );

    const { dataList } = useSelector(selectDataList);

    const [data, setData] = useState<Paginated<GetSlider[]>>();
    const [eventData, setEventData] = useState<any>();
    

//  Delete Modal
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const deleteToggle = () => setDeleteModal(!deleteModal);

    // Delete Data
    const onClickDelete = (cell: any) => { 
        setDeleteModal(true);
        if (cell.id) {
            setEventData(cell);
        }
    };

    const handleDelete = () => {
        if (eventData) {
            dispatch(onDeleteSlider({id: eventData.id}));
            setDeleteModal(false);
            dispatch(onGetSliderList({
                page: pagination.pageIndex < 1 ? 1 : pagination.pageIndex,
                pageSize: pagination.pageSize
        }));
        }
    };

    
    // Columns
    const sliderFeaturesColumns = [
        {
            header: "Title",
            accessorKey: "title",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <span className="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600">{cell.getValue()}</span>
            ),
        },
        {
            header: "Description",
            accessorKey: "description",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <span className="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600">{cell.getValue()}</span>
            ),
        },
        {
            header: "Background",
            accessorKey: "background",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <span className="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600">{cell.getValue()}</span>
            ),
        },
        {
            header: "Redirect",
            accessorKey: "redirect",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <span className="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600">{cell.getValue()}</span>
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
                        width={250}
                        height={250}
                        className="avatar-md rounded-circle img-thumbnail"
                    />);
                } 
        },
            {
            header: "Preview",
            accessorKey: "isPreview",
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
                            <Link
                                to={"#"}
                                className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                                onClick={ () => {
                                    const data = cell.row.original;
                                    onClickDelete(data);
                                }}
                            >
                            <Trash2 className="inline-block size-3 ltr:mr-1 rtl:ml-1" /> <span className="align-middle">Delete</span></Link>
                    </li> 

                    </Dropdown.Content>
                </Dropdown>
            ),
        }
    ];

    
    const columns = useMemo(() => sliderFeaturesColumns, []);
    

        // Get Data
    useEffect(() => {
        dispatch(onGetSliderList({
            page: pagination.pageIndex < 1 ? 1 : pagination.pageIndex,
            pageSize: pagination.pageSize
        }));
    }, [dispatch, pagination.pageIndex, pagination.pageSize]);

    useEffect(() => {
        setData(dataList);
    }, [dataList]);


    // update data on delete modal open/close 
    useEffect(() => {
          dispatch(onGetSliderList({
                page: pagination.pageIndex < 1 ? 1 : pagination.pageIndex,
                pageSize: pagination.pageSize
        }));
    },[deleteModal])
    
    return (
        <React.Fragment>
            <BreadCrumb title='Sliders' pageTitle='List' />
          <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
            <div className="card">
                <div className="card-body">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-12 ">
                        <div className="lg:col-span-2 ltr:lg:text-right rtl:lg:text-left xl:col-span-2 xl:col-start-11">
                            <Link to="/sliders-add" type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"><Plus className="inline-block size-4" /> <span className="align-middle">Add Slider</span></Link>
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

export default SliderManager;