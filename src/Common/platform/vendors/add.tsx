import React, { useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
// Formik
import * as Yup from "yup";
import "yup-phone";
import { useFormik } from "formik";


// react-redux
import { useDispatch } from 'react-redux';
// import { createSelector } from 'reselect';
import {
    uploadFile as onfileUpload,
} from "slices/thunk";
import { addVendorsList as onAddVendorList } from "slices/thunk";
import { getLoggedUser } from "helpers/api_helper";
import DropdownData from "../common/DropdownData";
import { emailSchema } from "helpers/validation";
import LoadingButton from "../common/LoadingButton";
import { toast } from "react-toastify";
import AssetUpload from "../common/AssetUpload";



const VendorAddNew = () => {
    const [selectCoverImagefiles, setselectCoverImagefiles] = useState<any[]>([]);
    const [selectLogoImagefiles, setselectLogoImagefiles] = useState<any[]>([]);
    const [logoAspectRatio, setLogoAspectRatio] = useState<undefined | number>();
    const [logoImageFileType, setLogoImageFileType] = useState();
    const [coverAspectRatio, setCoverAspectRatio] = useState();
    const [coverImageFileType, setCovergImageFileType] = useState();
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false);
    const [vendorType, setVendorType] = useState<number | "Initial" | undefined>();
    const [district, setDistrict] = useState<number | "initial" | undefined>();

    const user = getLoggedUser();
    const resetFormData = (resetForm: any) => {
            resetForm();
            setselectCoverImagefiles([]);
            setselectLogoImagefiles([]);
            setVendorType("Initial");
            setDistrict("initial");
            setCoverAspectRatio(undefined);
            setCovergImageFileType(undefined);
            setLogoAspectRatio(undefined);
            setLogoImageFileType(undefined);
    }
    
    // Formik
    const initialValues = {
        test: "",
        name: '',
        description: '',
        email: '',
        phoneNumber: '',
        address: '',
        districtId: 1,
        vendorType: 1,
        userId: user.id
    };
    const validationSchema = Yup.object({
        test: Yup.string(),
        email: emailSchema({ required: false }),
        phoneNumber: Yup.string().required("Phone number is required"),
        districtId: Yup.number().required("District is required"),
        vendorType: Yup.number().required("Vendor Type is required"),
        userId: Yup.string().required("User ID is required")
    });

    // validation
    const { values, resetForm, handleSubmit, handleChange, errors, touched } = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit: async () => {         
            const requestObject = { ...values, logo: {}, cover: {} };
            setLoading(true);
            // Upload logo
            if (selectLogoImagefiles?.length && selectLogoImagefiles?.length > 0) {
                try {
                    // Dispatch onFileUpload action
                    const response = await dispatch(onfileUpload(selectLogoImagefiles[0]))
                    // Assuming response contains the URL of the uploaded file
                    const imageUrl = response.payload;
                    requestObject.logo = {
                        asprctRatio: logoAspectRatio,
                        imageType: logoImageFileType,
                        path: imageUrl
                    };
                } catch (error) {
                    // Handle error if any
                    toast.error("File upload failed", { autoClose: 3000 });
                }
               
            }
            // Upload cover image
            if (selectCoverImagefiles?.length && selectCoverImagefiles?.length > 0) {
                try {
                    // Dispatch onFileUpload action
                    const response = await dispatch(onfileUpload(selectCoverImagefiles[0]))
                    // Assuming response contains the URL of the uploaded file
                    const imageUrl = response.payload;
                    requestObject.cover = {
                        asprctRatio: coverAspectRatio,
                        imageType: coverImageFileType,
                        path: imageUrl
                    };
                } catch (error) {
                    // Handle error if any
                    toast.error("File upload failed", { autoClose: 3000 });
                }
            }


            // submit form
            if (district)
                requestObject.districtId = district as number;
            if (vendorType)
                requestObject.vendorType = vendorType as number;
            
            await dispatch(onAddVendorList(requestObject));
            resetFormData(resetForm);
            setLoading(false);
        }
    });

    return (
        <React.Fragment>
            <BreadCrumb title='Add' pageTitle='Vendor' />
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
                <div className="xl:col-span-9">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-15">Add new Vendor</h6>

                            <form action="#!" onSubmit={ async (e) => {
                                e.preventDefault();        
                                
                                // submit
                                handleSubmit();
                                return false;
                            }}>
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12">
                                    <div className="xl:col-span-6">
                                        <label htmlFor="name" className="inline-block mb-2 text-base font-medium">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Name"
                                            onChange={handleChange}
                                            value={values.name || ""} />
                                        {touched.name && errors.name ? <p className="text-red-400">{errors.name}</p> : null}
                                    </div>
                                    <div className="xl:col-span-6">
                                        <label htmlFor="description" className="inline-block mb-2 text-base font-medium">Description</label>
                                        <input type="text" id="description"
                                            onChange={handleChange}
                                            value={values.description || ""}
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Description" />
                                        {touched.description && errors.description ? <p className="text-red-400">{errors.description}</p> : null}
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="email" className="inline-block mb-2 text-base font-medium">Email</label>
                                        <input type="email" id="email"
                                            onChange={handleChange}
                                            value={values.email || ""}
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Email" />
                                        {touched.email && errors.email ? <p className="text-red-400">{errors.email}</p> : null}
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="phoneNumber" className="inline-block mb-2 text-base font-medium">Phone number</label>
                                        <input type="tel" id="phoneNumber"
                                            onChange={handleChange}
                                            value={values.phoneNumber || ""}
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Phone" />
                                        {touched.phoneNumber && errors.phoneNumber ? <p className="text-red-400">{errors.phoneNumber}</p> : null}
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="address" className="inline-block mb-2 text-base font-medium">Address</label>
                                        <input type="text" id="address"
                                            onChange={handleChange}
                                            value={values.address || ""}
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            placeholder="Address" />
                                        {touched.address && errors.address ? <p className="text-red-400">{errors.address}</p> : null}
                                    </div>

                                    {/* Districts select */}
                                    <div className="xl:col-span-3">
                                        <label className="inline-block mb-2 text-base font-medium">Select District</label>
                                        <DropdownData data="districts" title="Select District" state={district} setState={setDistrict} />
                                    </div>

                                    {/* Vendor type select */}
                                    <div className="xl:col-span-3">
                                        <label className="inline-block mb-2 text-base font-medium">Select Vendor Type</label>
                                        <DropdownData data="VendorType" setState={setVendorType} state={vendorType} />
                                    </div>
                                </div>

                                {/* Vendor Cover image */}
                                <AssetUpload title="Upload vendor cover image" aspectRatio={coverAspectRatio} setAspectRatio={setCoverAspectRatio} imageFileType={coverImageFileType} setImageFileType={setCovergImageFileType} selectImagefiles={selectCoverImagefiles} setselectImagefiles={setselectCoverImagefiles}/>
                               
                                {/* Vendor logo image */}
                                <AssetUpload title="Upload vendor logo" aspectRatio={logoAspectRatio} setAspectRatio={setLogoAspectRatio} imageFileType={logoImageFileType} setImageFileType={setLogoImageFileType} selectImagefiles={selectLogoImagefiles} setselectImagefiles={setselectLogoImagefiles}/>
                          
                                


                                <LoadingButton title="Create Venodr" loading={loading} type="submit" />
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
};

export default VendorAddNew;