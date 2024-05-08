import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCheck, CheckCircle2, LucideMessageCircleX, XCircle } from 'lucide-react';

import BreadCrumb from "Common/BreadCrumb";

import {
    getOneProduct as onGetOneProdut
} from 'slices/thunk';

import { ChevronLeft, ChevronRight } from "lucide-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

import { Link, useParams } from "react-router-dom";

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { GetProduct } from "helpers/interface/api";
import { getImagePath } from "../helpers/getImagePath";


const ProductsOverview = () => {
    const { id } = useParams();
    const dispatch = useDispatch<any>();
    const selectDataList = createSelector(
        (state: any) => state.Ecommerce,
        (state) => ({
            dataList: state.products
        })
    );

    const { dataList } = useSelector(selectDataList);

    const [data, setData] = useState<GetProduct>();
    const [eventData, setEventData] = useState<any>();

    const [show, setShow] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    // Get Data
    useEffect(() => {
        if (id) {
            dispatch(onGetOneProdut({ id: parseInt(id) }));
        }
    }, [dispatch]);

    useEffect(() => {
        setData(dataList.results);
    }, [dataList]);
    
    // validation
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            img: (eventData && eventData.img) || '',
            customerName: (eventData && eventData.customerName) || '',
            date: (eventData && eventData.date) || '',
            rating: (eventData && eventData.rating) || '',
            review: (eventData && eventData.review) || '',
            like: (eventData && eventData.like) || '',
            dislike: (eventData && eventData.dislike) || ''
        },
        validationSchema: Yup.object({
            date: Yup.string().required("Please Enter Date"),
            rating: Yup.string().required("Please Enter Rating"),
            review: Yup.string().required("Please Enter review")
        }),

        onSubmit: (values) => {
            if (isEdit) {
                // const updateData = {
                //     id: eventData ? eventData.id : 0,
                //     ...values,
                // };
                // update user
                // dispatch(onUpdateReview(updateData));
            } else {
                // const newData = {
                //     ...values,
                //     id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                //     img: userDummy,
                //     customerName: "Paula Keenan",
                //     like: "0",
                //     dislike: "0"
                // };
                // save new user
                // dispatch(onAddReview(newData));
            }
            toggle();
        },
    });



    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
            setEventData("");
            setIsEdit(false);
        } else {
            setShow(true);
            setEventData("");
            validation.resetForm();
        }
    }, [show, validation]);


    return (
        <React.Fragment>
            <BreadCrumb title='Overview' pageTitle='Products' />

            <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12">
                {
                    data && data?.images?.length > 0
                    &&
                    <div className="xl:col-span-4">
                        <div className="sticky top-[calc(theme('spacing.header')_*_1.3)] mb-5">
                            <div className="card">
                                <div className="card-body">
                                    <Swiper
                                        navigation={true}
                                        modules={[Navigation]}>
                                        {
                                            data?.images?.map((e, i) => <SwiperSlide key={i}><img width={300} height={300} src={getImagePath(e.path)} alt={`product_${e.path}`} /></SwiperSlide>)        
                                        }
                                    </Swiper>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="xl:col-span-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="mt-3 mb-1">{data?.name}</h5>
                            <ul className="flex flex-wrap items-center gap-4 mb-5 text-slate-500 dark:text-zink-200">
                                <li><Link to="#!" className="font-medium underline text-custom-500">{data?.brand?.name}</Link></li>
                                <li>Seller: <Link to="#!" className="font-medium">{data?.vendor?.name}</Link></li>
                                {data?.availableFrom && <li>Available from: <span className="font-medium">{new Date(data?.availableFrom).toLocaleDateString()}</span></li>}
                                {data?.availableTo && <li>Available to: <span className="font-medium">{new Date(data?.availableTo).toLocaleDateString()}</span></li>}
                                {data?.sku && <li><span className="underline">SKU:</span> <span className="font-medium">{data.sku}</span></li>}
                            </ul>

                            <div className="mb-4">
                                <p className="mb-1 text-green-500">Price</p>
                                {data && data?.price < data?.oldPrice ?
                                    <h4>${data.price} <small className="font-normal line-through align-middle text-slate-500 dark:text-zink-200">${data.oldPrice}</small></h4>
                                    :
                                    <h4>${data?.price} </h4>
                                 }
                            </div>

                           
                            {
                                data?.description
                                && 
                                <div className="mt-5">
                                    <h6 className="mb-3 text-15">Product Description:</h6>
                                    <p className="mb-2 text-slate-500 dark:text-zink-200">
                                        {data?.description}
                                    </p>
                                </div>        
                            }

                            {
                                data?.description
                                && 
                                <div className="mt-5">
                                    <h6 className="mb-3 text-15">Product short description:</h6>
                                    <p className="mb-2 text-slate-500 dark:text-zink-200">
                                        {data?.shortDescription}
                                    </p>
                                </div>        
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProductsOverview;