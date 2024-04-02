import React, { useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";


// react-redux
import { useDispatch } from 'react-redux';
// import { createSelector } from 'reselect';
import { addCountryList as onAddCountryList } from "slices/thunk";



const CountryAddNew = () => {

    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false);

        // validation
        const validation: any = useFormik({
            // enableReinitialize : use this flag when initial values needs to be changed
            enableReinitialize: true,
    
            initialValues: {
                arName: '',
                enName: ''
            },
            validationSchema: Yup.object({
                arName: Yup.string(),
                enName: Yup.string()
            }),
    
            onSubmit: (values, {resetForm}) => {
                setLoading(true);
                dispatch(onAddCountryList(values));
                resetForm();
                setLoading(false);
            },
        });
    

    return (
        <React.Fragment>
            <BreadCrumb title='Add' pageTitle='Country' />
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
                <div className="xl:col-span-9">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-15">Add new Country</h6>

                            <form action="#!" onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}>
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12">
                                    <div className="xl:col-span-6">
                                        <label htmlFor="nameAr" className="inline-block mb-2 text-base font-medium">Name Arabic</label>
                                        <input 
                                            type="text"
                                            id="arName"
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Country Name arabic"
                                            onChange={validation.handleChange}
                                            value={validation.values.arName || ""}  />
                                        {validation.touched.arName && validation.errors.arName ?  <p className="text-red-400">{validation.errors.arName}</p>:null}
                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="enName" className="inline-block mb-2 text-base font-medium">Name english</label>
                                        <input type="text" id="enName"
                                        onChange={validation.handleChange}
                                        value={validation.values.enName || ""} 
                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                         placeholder="Country Name english" />
                                           {validation.touched.enName && validation.errors.enName ?  <p className="text-red-400">{validation.errors.enName}</p>:null}
                                    </div>
                           
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

export default CountryAddNew;