import { useFormik } from "formik";
import { ProductImage } from "helpers/interface/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';

import {
    uploadFile as onfileUpload,
    updateProductList as onUpdateProductList
} from "slices/thunk";
import { toast } from "react-toastify";
import DropdownData from "./DropdownData";
import Dropzone from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface IProductCategory {
    productId: number;
    categoryId?: number;
    thumbnail?: string;
}
export const ProductCategory = (props: IProductCategory) => {
    const dispatch = useDispatch<any>();
    const [selectfiles, setSelectfiles] = useState([]);
    const [category, setCategory] = useState<number>();
    const handleAcceptfiles = (files: any) => {
        files?.map((file: any) => {
            return Object.assign(file, {
                priview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            });
        });
        setSelectfiles(files);
    };

    const formatBytes = (bytes: any, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    const validationSchema = Yup.object().shape({
        productId: Yup.number(),
        categoryId: Yup.number(),
        images: Yup.object().shape({
            path: Yup.string(),
            imageType: Yup.string(),
            aspectRatio: Yup.string(),
        })
        // Add more validation rules for other inputs
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            productId: props.productId || 1,
            categoryId: 1,
            thumbnail: {
                path: props.thumbnail || "",
                imageType: 1,
                aspectRatio: 1
            }
        },
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

                const operations = selectfiles.map((file) => imageUploadRequest(file));
                images = (await Promise.all(operations)).map((e: string) => ({
                    path: e,
                    imageType: 1,
                    aspectRatio: 1
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
                categoryId: category
            };
            setValues(productFinalValues);
            dispatch(onUpdateProductList(productFinalValues));
            setSubmitting(false);
        },
    });


    return <div className="xl:col-span-4">

        <div className="card p-4">
            <div className="xl:col-span-12">
                <label className="mr-2 inline-block mb-2 text-base font-medium">Product Category</label>
                <div className="xl:col-span-6 mt-4">
                    <form onSubmit={formik.handleSubmit}>
                        <label className="mr-2 inline-block mb-2 text-base font-medium">Select Category</label>
                        <DropdownData data="category" title="Select Category" state={category} setState={setCategory} />

                        <div className="col-span-12">
                            <label className="mt-6 mr-2 inline-block mb-2 text-base font-medium">Upload Product category thumbnail</label>
                            <Dropzone
                                maxFiles={1}
                                onDrop={(acceptfiles: any) => {
                                    handleAcceptfiles(acceptfiles);
                                }}>
                                {({ getRootProps }: any) => (
                                    <div className="flex w-full items-center justify-center bg-white border border-dashed rounded-md cursor-pointer dropzone border-slate-300 dark:bg-zink-700 dark:border-zink-500 dropzone2">
                                        <div className="w-full py-5 text-lg text-center dz-message needsclick" {...getRootProps()} >
                                            <div className="mb-3">
                                                <UploadCloud className="block size-12 mx-auto text-slate-500 fill-slate-200 dark:text-zink-200 dark:fill-zink-500" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                            <ul className="flex flex-wrap mb-0 gap-x-5" id="dropzone-preview2">
                                {
                                    (selectfiles || [])?.map((file: any, index: number) => {
                                        return (
                                            <li key={index} className="mt-5" id="dropzone-preview-list2">
                                                <div className="border rounded border-slate-200 dark:border-zink-500">
                                                    <div className="p-2 text-center">
                                                        <div>
                                                            <div className="p-2 mx-auto rounded-md size-14 bg-slate-100 dark:bg-zink-600">
                                                                <img className="block w-full h-full rounded-md" src={file.priview} alt={file.name} />
                                                            </div>
                                                        </div>
                                                        <div className="pt-3">
                                                            <h5 className="mb-1 text-15" data-dz-name>{file.path}</h5>
                                                            <p className="mb-0 text-slate-500 dark:text-zink-200" data-dz-size>{file.formattedSize}</p>
                                                            <strong className="error text-danger" data-dz-errormessage></strong>
                                                        </div>
                                                        <div className="mt-2">
                                                            <button data-dz-remove className="px-2 py-1.5 text-xs text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20" onClick={() => {
                                                                const newImages = [...selectfiles];
                                                                newImages.splice(index, 1);
                                                                setSelectfiles(newImages);
                                                            }}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button type="submit" className="text-white btn bg-custom-500 border-custom-500 ...">Edit Product Category</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
}