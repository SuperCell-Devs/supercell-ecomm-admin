import React, { useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";


// react-redux
import { useDispatch } from 'react-redux';
// import { createSelector } from 'reselect';
import { addVendorsList as onAddVendorList } from "slices/thunk";
import { getLoggedUser } from "helpers/api_helper";
import DropdownData from "../common/DropdownData";



const VendorAddNew = () => {

    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false);
    const [district, setDistrict] = useState<number>();

    const user = getLoggedUser();
        // validation
        const validation: any = useFormik({
            // enableReinitialize : use this flag when initial values needs to be changed
            enableReinitialize: true,
            initialValues: {
                name: '',
                description: '',
                email: '',
                phoneNumber: '',
                address: '',
                districtId: 1,
                vendorType: 1,
                userId: user.userId
            },
            validationSchema: Yup.object({
                email: Yup.string().email(),
                phoneNumber: Yup.string(),

            }),
    
            onSubmit: (values, {resetForm}) => {
                setLoading(true);
                dispatch(onAddVendorList(values));
                resetForm();
                setLoading(false);
            },
        });
    

    return (
        <React.Fragment>
            <BreadCrumb title='Add' pageTitle='Vendor' />
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
                <div className="xl:col-span-9">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-15">Add new Vendor</h6>

                            <form action="#!" onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}>
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12">
                                    <div className="xl:col-span-6">
                                        <label htmlFor="name" className="inline-block mb-2 text-base font-medium">Name Arabic</label>
                                        <input 
                                            type="text"
                                            id="name"
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Name"
                                            onChange={validation.handleChange}
                                            value={validation.values.name || ""}  />
                                        {validation.touched.name && validation.errors.name ?  <p className="text-red-400">{validation.errors.name}</p>:null}
                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="description" className="inline-block mb-2 text-base font-medium">Description</label>
                                        <input type="text" id="description"
                                        onChange={validation.handleChange}
                                        value={validation.values.description || ""} 
                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                         placeholder="Description" />
                                           {validation.touched.description && validation.errors.description ?  <p className="text-red-400">{validation.errors.description}</p>:null}
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="email" className="inline-block mb-2 text-base font-medium">Email</label>
                                        <input type="email" id="description"
                                        onChange={validation.handleChange}
                                        value={validation.values.email || ""} 
                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                         placeholder="Description" />
                                           {validation.touched.email && validation.errors.email ?  <p className="text-red-400">{validation.errors.email}</p>:null}
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="phoneNumber" className="inline-block mb-2 text-base font-medium">Phone number</label>
                                        <input type="tel" id="phoneNumber"
                                        onChange={validation.handleChange}
                                        value={validation.values.phoneNumber || ""} 
                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                         placeholder="Phone" />
                                           {validation.touched.phoneNumber && validation.errors.phoneNumber ?  <p className="text-red-400">{validation.errors.phoneNumber}</p>:null}
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="address" className="inline-block mb-2 text-base font-medium">Address</label>
                                        <input type="text" id="address"
                                        onChange={validation.handleChange}
                                        value={validation.values.address || ""} 
                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                         placeholder="Address" />
                                           {validation.touched.address && validation.errors.address ?  <p className="text-red-400">{validation.errors.address}</p>:null}
                                    </div>
                                    {/* Districts select */}
                                    <DropdownData data="districts" title="Select District" state={district} setState={setDistrict}/>

                                    {/* Vendor type select */}
                                    {/* <DropdownData data/> */}
                                </div>
                                 
                                <div className="flex justify-end gap-2 mt-4">
                                    <button  type="submit" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                        {loading ? "..." : "Create"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
               
            </div>
        </React.Fragment>
    );
};

export default VendorAddNew;