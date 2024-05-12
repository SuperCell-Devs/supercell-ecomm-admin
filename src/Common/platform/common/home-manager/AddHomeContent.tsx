import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { X } from 'lucide-react';
import DropdownData from '../DropdownData';
import { SelectFilterAction } from './SelectFilterActions';
import { toast } from 'react-toastify';
import {
    postHomeManager as onAddHomeManager
} from "slices/thunk";
import { useDispatch } from 'react-redux';
interface IProps {
    close: React.MouseEventHandler<HTMLButtonElement> | undefined
};


const initialValues = {
    redirect: "",
    title: "",
    isPreview: false,
    background: "",

};
const formikValidationSchema = Yup.object().shape({
    redirect: Yup.string(),
    title: Yup.string(),
    isPreview: Yup.boolean(),
    background: Yup.string(),
});
const otherValidationSchema = Yup.object().shape({
    itemType: Yup.number().nullable(),
    showType: Yup.number().nullable(),
    filterActions: Yup.array(Yup.object().shape({
        categoryFilter: Yup.object().shape({
            parentId: Yup.number().nullable()
        }),
        productFilter: Yup.object().shape({
            isPublished: Yup.boolean(),
            isFeatured: Yup.boolean(),
            isNew: Yup.boolean(),
            isOnSale: Yup.boolean(),
            isBestSeller: Yup.boolean(),
            isAvailable: Yup.boolean(),
            vendor: Yup.number().nullable(),
            brand: Yup.number().nullable()
        }),
    })),
});
const AddHomeContent = (props: IProps) => {
    const dispatch = useDispatch<any>();
    const [itemType, setItemtype] = useState<number | "Initial">("Initial");
    const [showType, setShowType] = useState<number | "Initial">("Initial");
    const [category, setCategory] = useState<number>(); // category parent id
    const [filterAction, setFilterAction] = useState<any>({
        categoryFilter: {
            parentId: null
        },
        productFilter: {
            isPublished: false,
            isFeatured: false,
            isNew: false,
            isOnSale: false,
            isBestSeller: false,
            isAvailable: false,
            vendor: null,
            brand: null
        }
    });

    const { handleSubmit, values, handleBlur, handleChange, errors, touched, resetForm } = useFormik({
        initialValues,
        validationSchema: formikValidationSchema,
        onSubmit: async () => {
            let req: any = {};
            try {
                const validatedData = await otherValidationSchema.validate({itemType, showType, filterAction})
                req = { ...validatedData };
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const { path } = error;
                    
                    switch (path) {
                        case 'showType':
                            toast.error("Show type is required", { autoClose: 3000 });
                            return;
                        case 'itemType':
                            toast.error("Item type is required", { autoClose: 3000 });
                            return;
                    }
                }
                
            }      
            req = { ...req, ...values };

            // submit to server
           await dispatch(onAddHomeManager(req));
            resetForm();
            setCategory(undefined);
            setItemtype("Initial");
            setShowType("Initial");
    },
});
    
return (
    <div className="mx-auto md:max-w-lg">
        <form action="#!" onSubmit={(event: any) => {
                event.preventDefault();
                handleSubmit()
        }}>
            <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-2 gap-y-6">
                    {/* Item type */}
                    <div className="xl:col-span-6">
                        <label className="mr-2 inline-block mb-2 text-base font-medium">Select Item type</label>
                        <DropdownData data='ItemTypeEnum' title='Item type' state={itemType} setState={setItemtype}/>
                    </div>
                
                        {/* Filter actions */}
                    <div className='xl:col-span-6'>
                        <SelectFilterAction filterAction={filterAction} setFilterAction={setFilterAction} itemType={itemType} category={category} setCategory={setCategory} />
                    </div>
                    {/* Show Type */}
                    <div className="xl:col-span-6">
                        <label className="mr-2 inline-block mb-2 text-base font-medium">Select Show type</label>
                    <DropdownData data='ShowTypeEnum' title='Show type' state={showType} setState={setShowType}/>
                    </div>

                    {/* Title */}
                    <div className="xl:col-span-6">
                        <label htmlFor="title" className="inline-block mb-2 text-base font-medium">Title</label>
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

                    {/* Redirect */}
                    <div className="mb-4">
                        <label htmlFor="redirect" className="inline-block mb-2 text-base font-medium">Redirect</label>
                        <input
                            type="text"
                            name="redirect"
                            className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                            placeholder="Enter redirect"
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
                    <div className="mb-4">
                        <label htmlFor="background" className="inline-block mb-2 text-base font-medium">Background</label>
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
                </div>
                

            </div>
            <div className="mb-4">
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
                            : null
                    }
            </div>
                <div className="flex justify-end gap-2 mt-5">
                    <button onClick={props.close} type="button" className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"><X className="inline-block size-4" /> <span className="align-middle">Cancel</span></button>
                    <button type="submit" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AddHomeContent
