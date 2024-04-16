import React, { useEffect, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

// react-redux
import { useDispatch, useSelector } from 'react-redux';
// import { createSelector } from 'reselect';
import {
    updateCategoryList as onUpdateCategoryList,
    getCategoryList as onGetCategoryList
} from "slices/thunk";
import { createSelector } from "@reduxjs/toolkit";
import { ICategory } from "helpers/interface/api";
import { useParams } from "react-router-dom";
import DropdownData from "../common/DropdownData";
import LoadingButton from "../common/LoadingButton";


const CategoryEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch<any>();
    const [data, setData] = useState<ICategory>();
    const [parent, setParent] = useState<number>();
    const selectDataList = createSelector(
        (state: any) => state.Ecommerce,
        (state) => ({
            dataList: state.category
        })
    );



    const { dataList } = useSelector(selectDataList);
    const [loading, setLoading] = useState(false);

    // validation
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            nameAr: data?.nameAr || "",
            nameEn: data?.nameEn || "",
            parentId: data?.parent?.id || ""
        },
        validationSchema: Yup.object({
            nameAr: Yup.string(),
            nameEn: Yup.string(),
            parentId: Yup.number()
        }),

        onSubmit: (values, { resetForm }) => {
            setLoading(true);
            if (id) {
                dispatch(onUpdateCategoryList({ id: parseInt(id), data: values }));
                resetForm();
                setData({ id: parseInt(id), ...values })
            }
            setLoading(false);
        },
    });

    // Get Data
    useEffect(() => {
        if (id) {
            dispatch(onGetCategoryList());
        }
    }, [dispatch, id]);

    // get targeted data from cahced list of category.
    useEffect(() => {
        if (id) {
            const targetedData: ICategory | undefined = dataList?.results?.find((e: ICategory) => e.id === parseInt(id))
            if (targetedData) {
                // set parent id 
                setParent(targetedData.parent?.id)
                // set form fields
                setData(targetedData);
            }
        }
    }, [dataList]);

    return (
        <React.Fragment>
            <BreadCrumb title='Edit' pageTitle='Category' />
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
                <div className="xl:col-span-9">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-15">Edit Category</h6>

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
                                            placeholder="Category Name arabic"
                                            onChange={validation.handleChange}
                                            value={validation.values.nameAr || ""} />
                                        {validation.touched.nameAr && validation.errors.nameAr ? <p className="text-red-400">{validation.errors.nameAr}</p> : null}
                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="nameEn" className="inline-block mb-2 text-base font-medium">Name english</label>
                                        <input type="text" id="nameEn"
                                            onChange={validation.handleChange}
                                            value={validation.values.nameEn || ""}
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Category Name english" />
                                        {validation.touched.nameEn && validation.errors.nameEn ? <p className="text-red-400">{validation.errors.nameEn}</p> : null}
                                    </div>

                                    <div className="xl:col-span-2">
                                        {
                                            data && <DropdownData data="category" title="Select parent Category" state={parent} setState={setParent} />
                                        }
                                    </div>


                                </div>

                                {/*                                  
                                <div className="flex justify-end gap-2 mt-4">
                                    <button  type="submit" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                                        {loading ? "..." : "Edit Category"}
                                    </button>
                                </div> */}

                                <LoadingButton title="Edit Category" type="submit" loading={loading} />
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
};

export default CategoryEdit;