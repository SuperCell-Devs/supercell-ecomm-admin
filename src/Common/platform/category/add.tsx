import React, { useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";


// react-redux
import { useDispatch } from 'react-redux';
// import { createSelector } from 'reselect';
import { addBrandsList as onAddBrandsList} from "slices/thunk";

const BrandAddNew = () => {

    const title = "Category";
    const dispatch = useDispatch<any>();

    const [loading, setLoading] = useState(false);

        // validation
        const validation: any = useFormik({
            // enableReinitialize : use this flag when initial values needs to be changed
            enableReinitialize: true,
    
            initialValues: {
                nameAr: '',
                nameEn: ''
            },
            validationSchema: Yup.object({
                nameAr: Yup.string(),
                nameEn: Yup.string()
            }),
    
            onSubmit: (values, {resetForm}) => {
                setLoading(true);

               
                // Dispatch onAddBrandsList action
                dispatch(onAddBrandsList(values));
          
                resetForm();
                setLoading(false);
            },
        });
    

    return (
        <React.Fragment>
            <BreadCrumb title='Add New' pageTitle={title} />
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
                <div className="xl:col-span-9">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-15">Add new {title}</h6>

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
                                            id="nameAr"
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Brand Name arabic"
                                            onChange={validation.handleChange}
                                            value={validation.values.nameAr || ""}  />
                                        {validation.touched.nameAr && validation.errors.nameAr ?  <p className="text-red-400">{validation.errors.nameAr}</p>:null}
                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="nameEn" className="inline-block mb-2 text-base font-medium">Name english</label>
                                        <input type="text" id="nameEn"
                                        onChange={validation.handleChange}
                                        value={validation.values.nameEn || ""} 
                                        className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                         placeholder="Brand Name english" />
                                           {validation.touched.nameEn && validation.errors.nameEn ?  <p className="text-red-400">{validation.errors.nameEn}</p>:null}
                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="webSite" className="inline-block mb-2 text-base font-medium">Website</label>
                                        <input
                                             onChange={validation.handleChange}
                                             value={validation.values.webSite || ""}
                                              id="webSite" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Brand website"  />
                                            {validation.touched.webSite && validation.errors.webSite ?  <p className="text-red-400">{validation.errors.webSite}</p>:null}
                                    
                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="description" className="inline-block mb-2 text-base font-medium">Description</label>
                                        <textarea
                                            onChange={validation.handleChange}
                                            value={validation.values.description || ""} 
                                            id="description" className="max-h-60 form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Brand description" ></textarea>
                                        {validation.touched.description && validation.errors.description ?  <p className="text-red-400">{validation.errors.description}</p>:null}
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

export default BrandAddNew;