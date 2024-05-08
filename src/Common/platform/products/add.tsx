import React, { useEffect, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
import Flatpickr from 'react-flatpickr';
import * as Yup from 'yup';
import {
    uploadFile as onfileUpload,
    addProductList as onAddProductList
} from "slices/thunk";
import { useFormik } from "formik";
import DropdownData from "../common/DropdownData";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ProductImage } from "helpers/interface/api";
import AssetUpload from "../common/AssetUpload";

const ProductsAddNew = () => {
    const [selectProductImagefiles, setSelectProductImagefiles] = useState<any[]>([]);
    const [productAspectRatio, setProductAspectRatio] = useState<number>();
    const [productImageFileType, setProductgImageFileType] = useState<number>();
    const [date, setDate] = useState<Date[]>([new Date(), new Date()]);
    const [vendor, setVendor] = useState(0);
    const [brand, setBrand] = useState(0);
 
    const dispatch = useDispatch<any>();
    const validationSchema = Yup.object().shape({
        nameAr: Yup.string(),
        nameEn: Yup.string(),
        descriptionAr: Yup.string(),
        descriptionEn: Yup.string(),
        shortDescriptionAr: Yup.string(),
        shortDescriptionEn: Yup.string(),
        sku: Yup.string(),
        price: Yup.number(),
        oldPrice: Yup.number(),
        isPublished: Yup.boolean(),
        isFeatured: Yup.boolean(),
        isNew: Yup.boolean(),
        isOnSale: Yup.boolean(),
        isAvailable: Yup.boolean(),
        isBestSeller: Yup.boolean(),
        isVariable: Yup.boolean(),
        availableFrom: Yup.date(),
        availableTo: Yup.date(),
        vendorId: Yup.number(),
        brandId: Yup.number(),
        images: Yup.array(Yup.object().shape({
            path: Yup.string(),
            imageType: Yup.string(),
            aspectRatio: Yup.string(),
        }))
        // Add more validation rules for other inputs
    });
    const initialValues = {
        nameAr: '',
        nameEn: '',
        descriptionAr: "",
        descriptionEn: "",
        shortDescriptionAr: "",
        shortDescriptionEn: "",
        sku: "",
        price: 0,
        oldPrice: 0,
        isPublished: false,
        isFeatured: false,
        isNew: false,
        isOnSale: false,
        isBestSeller: false,
        isVariable: false,
        isAvailable: false,
        availableFrom: new Date(),
        availableTo: new Date(),
        vendorId: 0,
        brandId: 0,
        images: undefined
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setValues }) => {
            let images: ProductImage[] = [];
            let productFinalValues: any = {};
            try {
                // Upload selected imaegs
                const imageUploadRequest = function uploadImagefile(file: any) {
                   
                    // Dispatch onFileUpload action
                    return dispatch(onfileUpload(file)).then((response: any) => {
                        // Assuming response contains the URL of the uploaded file
                        const imageUrl = response.payload;
                        return imageUrl
                    })
                }

                const operations = selectProductImagefiles.map((file) => imageUploadRequest(file));
                images = (await Promise.all(operations)).map((e: string) => ({
                    path: e,
                    imageType: productImageFileType || 1,
                    aspectRatio: productAspectRatio || 1
                }));

                
                productFinalValues.images = images;
            } catch (error) {
                console.error(error);
                toast.error("Image files upload failed.", { autoClose: 3000 });
            }
            // Submit form
            productFinalValues = {
                    ...values,
                    ...productFinalValues,
                    availableFrom: date[0],
                    availableTo: date[1],
                    vendorId: vendor,
                    brandId: brand
                };
                setValues(productFinalValues);
                dispatch(onAddProductList(productFinalValues));
            setSubmitting(false);         
        },
    });
    return (
        <React.Fragment>
            <BreadCrumb title='Add New' pageTitle='Products' />
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
                <div className="xl:col-span-8">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-15">Create Product</h6>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-12">
                                    <div className="xl:col-span-6">
                                        <label htmlFor="nameAr" className="inline-block mb-2 text-base font-medium">Product Name in Arabic</label>
                                        <input
                                            type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.nameAr}
                                            name="nameAr"
                                            id="nameAr"
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 ..."
                                            placeholder="Product Name"
                                        />
                                        {formik.touched.nameAr && formik.errors.nameAr ? <p className="text-red-400">{formik.errors.nameAr}</p> : null}
                                    </div>
                                   
                                    <div className="xl:col-span-6">
                                        <label htmlFor="nameEn" className="inline-block mb-2 text-base font-medium">Product Name in English</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.nameEn}
                                            type="text" id="nameEn" name="nameEn" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Product Name" />
                                        {formik.touched.nameEn && formik.errors.nameEn ? <p className="text-red-400">{formik.errors.nameEn}</p> : null}
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="descriptionAr" className="inline-block mb-2 text-base font-medium">Product descrition in Arabic</label>
                                        <input
                                            type="text"
                                            id="descriptionAr"
                                            name="descriptionAr"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.descriptionAr}
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Product Description" />
                                        {formik.touched.descriptionAr && formik.errors.descriptionAr ? <p className="text-red-400">{formik.errors.descriptionAr}</p> : null}
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="descriptionEn" className="inline-block mb-2 text-base font-medium">Product descrition in English</label>
                                        <input
                                            type="text"
                                            id="descriptionEn"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.descriptionEn}
                                            name="descriptionEn"
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Product Description" />
                                        {formik.touched.descriptionEn && formik.errors.descriptionEn ? <p className="text-red-400">{formik.errors.descriptionEn}</p> : null}

                                    </div>
  
                                    <div className="xl:col-span-6">
                                        <label htmlFor="shortDescriptionAr" className="inline-block mb-2 text-base font-medium">Product short descrition in Arabic</label>
                                        <input
                                            type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.shortDescriptionAr}
                                            id="shortDescriptionAr"
                                            name="shortDescriptionAr" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Product Short Description" />
                                        {formik.touched.shortDescriptionAr && formik.errors.shortDescriptionAr ? <p className="text-red-400">{formik.errors.shortDescriptionAr}</p> : null}
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="shortDescriptionEn" className="inline-block mb-2 text-base font-medium">Product short descrition in English</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.shortDescriptionEn}
                                            type="text" id="shortDescriptionEn" name="shortDescriptionEn" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Product Short Description" />

                                        {formik.touched.shortDescriptionEn && formik.errors.shortDescriptionEn ? <p className="text-red-400">{formik.errors.shortDescriptionEn}</p> : null}

                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="sku" className="inline-block mb-2 text-base font-medium">SKU</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.sku}
                                            type="text" id="sku" name="sku" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="SKU" />
                                        {formik.touched.sku && formik.errors.sku ? <p className="text-red-400">{formik.errors.sku}</p> : null}

                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="price" className="inline-block mb-2 text-base font-medium">Price</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.price}
                                            type="number" id="price" name="price" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Price" />
                                        {formik.touched.price && formik.errors.price ? <p className="text-red-400">{formik.errors.price}</p> : null}


                                    </div>

                                    <div className="xl:col-span-6">
                                        <label htmlFor="oldPrice" className="inline-block mb-2 text-base font-medium">Old Price</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.oldPrice}
                                            type="number" id="oldPrice" name="oldPrice" className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200" placeholder="Old Price" />
                                        {formik.touched.oldPrice && formik.errors.oldPrice ? <p className="text-red-400">{formik.errors.oldPrice}</p> : null}
                                    </div>

                                    <div className="xl:col-span-12">
                                        <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Other Options</label>
                                        <div className="flex flex-wrap justify-around items-center gap-2 w-full">
                                            <div >
                                                <label htmlFor="isPublished" className="mr-2 inline-block mb-2 text-base font-medium">Is Published</label>
                                                <input
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    checked={formik.values.isPublished}
                                                    id="isPublished"
                                                    className="inline-block size-5 align-middle border rounded-sm appearance-none cursor-pointer bg-sky-500 border-sky-500 checked:bg-sky-500 checked:border-sky-500 disabled:opacity-75 disabled:cursor-default"
                                                    type="checkbox"
                                                    name="isPublished" />
                                            </div>

                                            <div >
                                                <label htmlFor="isFeatured" className="mr-2 inline-block mb-2 text-base font-medium">Is Featured</label>
                                                <input id="isFeatured"
                                                    className="inline-block size-5 align-middle border rounded-sm appearance-none cursor-pointer bg-sky-500 border-sky-500 checked:bg-sky-500 checked:border-sky-500 disabled:opacity-75 disabled:cursor-default"
                                                    type="checkbox"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    checked={formik.values.isFeatured}
                                                    name="isFeatured" />
                                            </div>

                                            <div >
                                                <label htmlFor="isNew" className="mr-2 inline-block mb-2 text-base font-medium">Is New</label>
                                                <input id="isNew"
                                                    className="inline-block size-5 align-middle border rounded-sm appearance-none cursor-pointer bg-sky-500 border-sky-500 checked:bg-sky-500 checked:border-sky-500 disabled:opacity-75 disabled:cursor-default"
                                                    type="checkbox"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    checked={formik.values.isNew}
                                                    name="isNew" />
                                            </div>

                                            <div >
                                                <label htmlFor="isOnSale" className="mr-2 inline-block mb-2 text-base font-medium">Is On Sale</label>
                                                <input id="isOnSale"
                                                    className="inline-block size-5 align-middle border rounded-sm appearance-none cursor-pointer bg-sky-500 border-sky-500 checked:bg-sky-500 checked:border-sky-500 disabled:opacity-75 disabled:cursor-default"
                                                    type="checkbox"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    checked={formik.values.isOnSale}
                                                    name="isOnSale" />
                                            </div>

                                            <div >
                                                <label htmlFor="isBestSeller" className="mr-2 inline-block mb-2 text-base font-medium">Is Best Seller</label>
                                                <input id="isBestSeller"
                                                    className="inline-block size-5 align-middle border rounded-sm appearance-none cursor-pointer bg-sky-500 border-sky-500 checked:bg-sky-500 checked:border-sky-500 disabled:opacity-75 disabled:cursor-default"
                                                    type="checkbox"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    checked={formik.values.isBestSeller}
                                                    name="isBestSeller" />
                                            </div>

                                            <div >
                                                <label htmlFor="isVariable" className="mr-2 inline-block mb-2 text-base font-medium">Is Variable</label>
                                                <input id="isVariable"
                                                    className="inline-block size-5 align-middle border rounded-sm appearance-none cursor-pointer bg-sky-500 border-sky-500 checked:bg-sky-500 checked:border-sky-500 disabled:opacity-75 disabled:cursor-default"
                                                    type="checkbox"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    checked={formik.values.isVariable}
                                                    name="isVariable" />
                                            </div>


                                        </div>
                                    </div>

                                    {/* Add more inputs here */}
                                    <div className="xl:col-span-6">
                                        <label className="mr-2 inline-block mb-2 text-base font-medium">Availability Date</label>

                                        <Flatpickr
                                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                            // value={toDate}
                                            options={{
                                                dateFormat: "d M, Y",
                                                mode: "range",
                                            }}
                                            placeholder='Available From/To'
                                            onChange={(e) => {
                                                const from = e[0];
                                                const to = e[1];
                                                setDate([from, to]);
                                            }}
                                        />
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label className="mr-2 inline-block mb-2 text-base font-medium">Select Vendor type</label>
                                        <DropdownData data="vendors" title="Select Vendor" state={vendor} setState={setVendor} />
                                    </div>

                                    <div className="xl:col-span-6">
                                        <label className="mr-2 inline-block mb-2 text-base font-medium">Select Brand</label>
                                        <DropdownData data="brands" title="Select Brand" state={brand} setState={setBrand} />
                                    </div>

                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button type="submit" className="text-white btn bg-custom-500 border-custom-500 ...">Create Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* Product image */}
                <div className="xl:col-span-4">
                    <div className="card p-2">
                        <div className="xl:col-span-12">
                            {/* <label className="mr-2 inline-block mb-2 text-base font-medium">Upload Product featured image:</label> */}
                            <AssetUpload title="Upload Product featured image" aspectRatio={productAspectRatio} imageFileType={productImageFileType} setAspectRatio={setProductAspectRatio} setImageFileType={setProductgImageFileType} selectImagefiles={selectProductImagefiles} setselectImagefiles={setSelectProductImagefiles} multiple/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProductsAddNew;