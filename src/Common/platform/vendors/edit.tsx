import React, { useEffect, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
// react-redux
import { useDispatch, useSelector } from 'react-redux';
// import { createSelector } from 'reselect';
import {
    updateVendorsList as onUpdateVendorList,
    getOneVendor as onGetOneVendor,
    getGlobals as onGetGlobals
} from "slices/thunk";
import { createSelector } from "@reduxjs/toolkit";
import {  IVendor, Paginated, VendorType } from "helpers/interface/api";
import { useParams } from "react-router-dom";
import DropdownData from "../common/DropdownData";
import LoadingButton from "../common/LoadingButton";
import VendorPreviewCard from "../common/VendorPreviewCard";


interface IVendorPreviewProps  {
    data?: IVendor 
}
const VendorPreview = (props: IVendorPreviewProps) => {
    const { data } = props;
    return <VendorPreviewCard
        address={data?.address}
        description={data?.description}
        title={data?.name}
        district={data?.district?.nameAr}
        email={data?.email}
        logo={data?.logo.path}
        phoneNumber={data?.phoneNumber}
        vendorType={data?.vendorType}
        cover={data?.cover?.path} />
};


const VendorsEdit = () => {
    const { id } = useParams();

    // State
    const [data, setData] = useState<Paginated<IVendor>>();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<any>();
    const [district, setDistrict] = useState();
    const [vendorType, setVendorType] = useState();

    // Selectors
    const selectDataList = createSelector(
        (state: any) => state.Ecommerce,
        (state) => ({
            dataList: state.vendors
        })
    );
    const { dataList } = useSelector(selectDataList);

    // reset form data
    const resetFormData = (resetForm: any) => {
        resetForm();
        setVendorType(undefined);
        setDistrict(undefined);
    }
    // map globa values 
    // const mapGlobalValues = (globalName: string, value?: string) => {
    //     if (value) return 1;
    //     const list = globals?.find((e) => e.title === globalName)?.values;
    //     const id = list?.find(e => e.name === value)?.value
    //     return id;
    // }
    
    // validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues: {
            name: data?.results?.name || "",
            description: data?.results?.description || "",
            email: data?.results?.email || "",
            phoneNumber: data?.results?.phoneNumber || "",
            address: data?.results?.address || "",
            districId: data?.results?.districtId || 1,
            vendorType: 1,
            userId: data?.results?.userId || ""
        },
        validationSchema: Yup.object({
            name: Yup.string(),
            description: Yup.string(),
            phoneNumber: Yup.string(),
            email: Yup.string(),
            address: Yup.string(),
            districId: Yup.number(),
            userId: Yup.string(),
            vendorType: Yup.number()
        }),
        onSubmit: async (values, { resetForm }) => {
          
            setLoading(true);
            if (id) {
                 const requestObject = { ...values };
               
                if (district)
                    requestObject.districId = district as number;
                if (vendorType)
                    requestObject.vendorType = vendorType as number;

    
                await dispatch(onUpdateVendorList({
                    id: parseInt(id),
                    data: {
                        address: requestObject.address,
                        description: requestObject.description,
                        email: requestObject.email,
                        name: requestObject.name,
                        phoneNumber: requestObject.phoneNumber,
                        districtId: requestObject.districId,
                        userId: requestObject.userId,
                        vendorType: requestObject.vendorType
                        }
                    }));
                resetFormData(resetForm);
                await dispatch(onGetOneVendor({ id: parseInt(id) }))
                setLoading(false);
            }
        },
    });

    // Get Data
    useEffect(() => {
        if (id) {
            dispatch(onGetOneVendor({ id: parseInt(id) }));
        }
        dispatch(onGetGlobals());
    }, [dispatch, id]);

    // update state from server fetched data
    useEffect(() => {
        setDistrict(dataList?.results?.district?.id);
        setVendorType(dataList?.results?.vendorType);
        setData(dataList);
    }, [dataList]);


    
    return (
        <React.Fragment>
            <BreadCrumb title='Edit' pageTitle='Vendors' />
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
                {/* Current Assets: mobile view */}
                <div className="sm:block md:hidden xl:col-span-4">
                  <VendorPreview data={data?.results}/>
                </div>

                <div className="xl:col-span-8">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-15">Edit Vendor</h6>
                            <form
                                action="#!"
                                onSubmit={ async (e) => {
                                    e.preventDefault()                                    
                                    validation.handleSubmit();  // This line will trigger form submission
                                    return false;
                                }}
                            >
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12">
                                    <div className="xl:col-span-6">
                                        <label htmlFor="name" className="inline-block mb-2 text-base font-medium">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Name"
                                            onChange={validation.handleChange}
                                            value={validation.values.name || ""} />
                                        {validation.touched.name && validation.errors.name ? <p className="text-red-400">{validation.errors.name}</p> : null}
                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="description" className="inline-block mb-2 text-base font-medium">Description</label>
                                        <input type="text" id="description"
                                            onChange={validation.handleChange}
                                            value={validation.values.description || ""}
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Description" />
                                        {validation.touched.description && validation.errors.description ? <p className="text-red-400">{validation.errors.description}</p> : null}
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="email" className="inline-block mb-2 text-base font-medium">Email</label>
                                        <input type="email" id="email"
                                            onChange={validation.handleChange}
                                            value={validation.values.email || ""}
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Email" />
                                        {validation.touched.email && validation.errors.email ? <p className="text-red-400">{validation.errors.email}</p> : null}
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="phoneNumber" className="inline-block mb-2 text-base font-medium">Phone number</label>
                                        <input type="tel" id="phoneNumber"
                                            onChange={validation.handleChange}
                                            value={validation.values.phoneNumber || ""}
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Phone" />
                                        {validation.touched.phoneNumber && validation.errors.phoneNumber ? <p className="text-red-400">{validation.errors.phoneNumber}</p> : null}
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="address" className="inline-block mb-2 text-base font-medium">Address</label>
                                        <input type="text" id="address"
                                            onChange={validation.handleChange}
                                            value={validation.values.address || ""}
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Address" />
                                        {validation.touched.address && validation.errors.address ? <p className="text-red-400">{validation.errors.address}</p> : null}
                                    </div>

                                    {/* Districts select */}
                                    <div className="xl:col-span-3">
                                        <label className="inline-block mb-2 text-base font-medium">Select District</label>
                                        {
                                            data && <DropdownData data="districts" title="Select District" state={district} setState={setDistrict} />
                                        }
                                    </div>

                                    {/* Vendory type select */}
                                    <div className="xl:col-span-3">
                                        <label className="inline-block mb-2 text-base font-medium">Select vendor type</label>
                                        {
                                            data && <DropdownData data="VendorType" title="Select Vendor Type" state={vendorType} setState={setVendorType} />
                                        }
                                    </div>
                                </div>
                               
                          
                                <LoadingButton loading={loading} type="submit" title="Edit Vendor" />
                            </form>
                        </div>
                    </div>
                </div>

                {/* Current Assets: desktop view */}
                <div className="hidden md:block xl:col-span-4">
                  <VendorPreview data={data?.results}/>
                </div>

            </div>
        </React.Fragment>
    );
};

export default VendorsEdit;