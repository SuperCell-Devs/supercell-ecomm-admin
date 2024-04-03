import { createSelector } from '@reduxjs/toolkit';
import { GlobalsValue, IBrand, ICategory, ICountry, IDistrict, IGlobals, Paginated, Province } from 'helpers/interface/api';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    getBrandsList as onGetBrandList,
    getCountryList as onGetCountryList,
    getDistrictList as onGetDistrictList,
    getProvinceList as onGetProvinceList,
    getVendorList as onGetVendorList, 
    getProductList as onGetProductList,
    getGlobals as onGetGlobals,
    getCategoryList as onGetCategoryList 
} from 'slices/thunk';

interface IProps {
    data:  'category' | 'brands' | 'products' | 'province' | 'districts' | 'country' | 'vendors' | 'vendorType' | 'FileImageTypeEnum' | 'AspectRatio';
    state: any,
    setState: React.Dispatch<React.SetStateAction<any>>
    title?: string
}

/**
 * Render system global data in a dropdown menu
 * @param props 
 * @returns 
 */
const GlobalsDropDownData = (props: IProps) => {
 const dispatch = useDispatch<any>();
    const selectDataList = createSelector(
        (state: any) => state.Ecommerce,
        (state) => ({
            dataList: state[props.data]
        })
    );

    const { dataList } = useSelector(selectDataList);

    const [data, setData] = useState<IGlobals[]>();

    // Get Data
    useEffect(() => {
        dispatch(onGetGlobals());
    }, [dispatch]);

    useEffect(() => {
        setData(dataList);
    }, [dataList]);


    return (
    <select 
        value={props.state}
        onChange={
            (e) => props.setState(e.target.value)
        } 
        className="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200">
        <option value="">{ props.title || props.data  }</option>
            {
                data?.find((e: IGlobals) => e.title === props.data)?.values?.map((e: any, i: number) => (<option key={i} value={(e as GlobalsValue).value}>{(e as GlobalsValue).name}</option>))
            }
    </select>
  )
}


/**
 * Render dynamic data in dropdown menu
 * @param props 
 * @returns 
 */
const DynamicDataDropdown = (props: IProps) => {
    const dispatch = useDispatch<any>();
    const selectDataList = createSelector(
        (state: any) => state.Ecommerce,
        (state) => ({
            dataList: state[props.data]
        })
    );

    const { dataList } = useSelector(selectDataList);

    const [data, setData] = useState<Paginated<any[]>>();

    // Get Data
    useEffect(() => {
        switch (props.data) {
            case 'brands':
                dispatch(onGetBrandList());
                break;
            case 'country':
                dispatch(onGetCountryList());
                break;
            case 'districts':
                dispatch(onGetDistrictList());
                break;
            case 'province':
                dispatch(onGetProvinceList());
                break;
            case 'vendors':
                dispatch(onGetVendorList());
                break;
            case 'products':
                dispatch(onGetProductList());
                break;
            case 'category':
                dispatch(onGetCategoryList());
                break;

            default:
                break;
        }
        
    }, [dispatch]);

    useEffect(() => {
    
        setData(dataList);
    }, [dataList]);

    return (
    <select 
        value={props.state}
        onChange={
            (e) => props.setState(e.target.value)
        } 
        className="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200">
        <option value="">{ props.title  || "Select" }</option>
        {
            data?.results?.map((e: any, i: number) => {

                switch (props.data) {
                    case 'brands':
                        return <option key={i} value={(e as IBrand).id}>{(e as IBrand).nameEn}</option>
                    case 'country':
                        return <option key={i} value={(e as ICountry).id}>{(e as ICountry).enName}</option>
                    case 'province':
                        return <option key={i} value={(e as Province).id}>{(e as Province).nameEn}</option>
                    case 'districts':
                        return <option key={i} value={(e as IDistrict).id}>{(e as IDistrict).nameEn}</option>
                    case 'category': 
                        return <option key={i} value={(e as ICategory).id}>{(e as ICategory).nameEn}</option>
                    default:
                        return null;
                }
                
            })
        }
    </select>
  )
}


/**
 * Render data in a dropdown for selection operations.
 * @param props 
 * @returns 
 */
const DropdownData = (props: IProps) => {  
       
    if (props.data === 'AspectRatio' || props.data === 'FileImageTypeEnum' || props.data === 'vendorType') {
        return <GlobalsDropDownData {...props} />
    }
    return <DynamicDataDropdown {...props} />
}



export default DropdownData