import React, { useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    uploadFile as onfileUpload,
} from "slices/thunk";
import {
    addSliderList as onAddSlider
} from "slices/thunk";
import { useDispatch } from 'react-redux';
import AssetUpload from '../common/AssetUpload';
import { toast } from 'react-toastify';
import LoadingButton from '../common/LoadingButton';

const initialValues = {
    redirect: "",
    title: "",
    isPreview: false,
    background: "",
    description: ""

};

// Regular expression to match both full URLs and path names
const urlOrPathRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)|(\/[^\s]*)$/;

const formikValidationSchema = Yup.object().shape({
    redirect: Yup.string().matches(urlOrPathRegex, 'Must be a valid URL or path'),
    title: Yup.string(),
    isPreview: Yup.boolean(),
    background: Yup.string(),
    description: Yup.string(),
});


const SlidersAdd = () => {
    const dispatch = useDispatch<any>();
    const [aspectRatio, setAspectRatio] = useState<number>();
    const [imageFileType, setImageFileType] = useState<number>();
    const [selectImagefiles, setselectImagefiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { handleSubmit, values, handleBlur, handleChange, errors, touched, resetForm } = useFormik({
        initialValues,
        validationSchema: formikValidationSchema,
        onSubmit: async () => {
            let req: any = {}; 
            
            setLoading(true);
            if (selectImagefiles && selectImagefiles?.length > 0) {
                try {
                
                     // Dispatch onFileUpload action
                    const response = await dispatch(onfileUpload(selectImagefiles[0]))
                    // Assuming response contains the URL of the uploaded file
                    const imageUrl = response.payload;
                     req.image = {
                        asprctRatio: aspectRatio,
                        imageType: imageFileType,
                        path: imageUrl
                    };

                    // submit to server
                    req = { ...req, ...values };
                    await dispatch(onAddSlider(req));
                        resetForm();
                    setLoading(false);
                    setselectImagefiles([]);
                    setAspectRatio(undefined);
                    setImageFileType(undefined);
                } catch (error) {
                     // Handle error if any
                    toast.error("Operation has failed", { autoClose: 3000 });
                }
            } else {
                setLoading(false);
                // Handle error if any
                toast.error("Slider image is required", { autoClose: 3000 });
            }
            
    },
});
    
return (

        <form action="#!" className='w-3/4 p-10 mx-auto' onSubmit={(event: any) => {
            event.preventDefault();
            handleSubmit();
        }}>
    

                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="inline-block my-2 text-base font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                            placeholder="Enter Title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            touched.title && errors.title ?
                                <p id="lastName" className="mt-1 text-sm text-red-500">{errors.title}</p>
                                : null
                        }
        </div>

                      {/* Description */}
                    <div>
                        <label htmlFor="description" className="inline-block my-2 text-base font-medium">Description</label>
                        <textarea
                            name="description"
                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                            placeholder="Enter description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></textarea>
                        {
                            touched.description && errors.description ?
                                <p id="lastName" className="mt-1 text-sm text-red-500">{errors.description}</p>
                                : null
                        }
        </div>
        
        
                    {/* Redirect */}
                    <div className="mb-4">
                        <label htmlFor="redirect" className="inline-block my-2 text-base font-medium">Redirect</label>
            <input
                            title='Enter Either full URL (https://example.com) or path name (/path/dest)'
                            type="text"
                            name="redirect"
                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                            placeholder="Insert full URL (https://example.com), path name like (/path/dest)"
                            value={values.redirect}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            touched.redirect && errors.redirect ?
                                <p id="lastName" className="mt-1 text-sm text-red-500">{errors.redirect}</p>
                                : null
                        }
                    </div>

                    {/* Background */}
                    <div className="mb-4 w-1/2">
                        <label htmlFor="background" className="inline-block my-2 text-base font-medium">Background</label>
                        <input
                            type="color"
                            name="background"
                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                            value={values.background}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            touched.background && errors.background ?
                                <p id="lastName" className="mt-1 text-sm text-red-500">{errors.background}</p>
                                : null
                        }
                    
                        <div className="my-4">
                            <input
                                 id="isPreview"
                                 className="size-4 border rounded-sm appearance-none bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500 checked:disabled:bg-custom-400 checked:disabled:border-custom-400"
                                 type="checkbox"
                                 checked={values.isPreview}
                                 onChange={handleChange}/>
                            <label htmlFor="termsCondition" className="text-sm align-top text-slate-400"> Preview </label>
                                {
                                    touched.isPreview && errors.isPreview ?
                                        <p id="isPreview" className="mt-1 text-sm text-red-500">{errors.isPreview}</p>
                                            :
                                        null
                                }
                        </div>
        </div>
        
        {/* Image */}
        <AssetUpload
            aspectRatio={aspectRatio}
            imageFileType={imageFileType}
            setAspectRatio={setAspectRatio}
            setImageFileType={setImageFileType}
            selectImagefiles={selectImagefiles}
            setselectImagefiles={setselectImagefiles}
            title='Image' />

              
                <div className="flex justify-start gap-2 mt-5">
                    <LoadingButton  loading={loading} title='Create Slider' type='submit'/>
                </div>


      
        </form>
    );
}


export default SlidersAdd