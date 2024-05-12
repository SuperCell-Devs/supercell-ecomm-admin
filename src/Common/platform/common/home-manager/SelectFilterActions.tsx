import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
    getGlobals as onGetGlobals,
} from 'slices/thunk';
import { IGlobals } from 'helpers/interface/api';
import { useEffect, useState } from 'react';
import DropdownData from '../DropdownData';
import ProductCategoryFilter from './ProductCategoryFilter';


interface ISelectFilterActionProps { 
    itemType?: number | "Initial";
    filterAction: any;
    setFilterAction: React.Dispatch<any>;
    category?: number;
    setCategory?:  React.Dispatch<React.SetStateAction<number | undefined>>;
};
export const SelectFilterAction = (props: ISelectFilterActionProps) => {
    
    
    // get globals
    const dispatch = useDispatch<any>();
    const selectDataList = createSelector(
        (state: any) => state.Ecommerce,
        (state) => ({
            dataList: state.globals
        })
    );
    const { dataList } = useSelector(selectDataList);
    const [data, setData] = useState<IGlobals[]>();

    useEffect(() => {
        dispatch(onGetGlobals());
    }, [dispatch]);

    useEffect(() => {
        setData(dataList);
    }, [dataList]);


    if (props.itemType) {
        const values = data?.find((e) => e.title === "ItemTypeEnum")?.values;
        const ItemTypeName = values && values.find((e) => e.value === parseInt(String(props.itemType)))?.name;

        
        // product = item
        if (ItemTypeName === "Item") {           
            return <ProductCategoryFilter filterAction={props.filterAction} setFilterAction={props.setFilterAction}/>
        }

        // category
        if (ItemTypeName === "Category") {
            if (props.setCategory) // stupid type guard. no logic
                return <div className='xl:col-span-6 ml-10'>
                    <label className="mr-2 inline-block mb-2 text-base font-medium">Select Category</label>
                    <DropdownData data='category' setState={props.setCategory} state={props.category} title='Select Category' />
                </div>;
        }

        // slider
        if (ItemTypeName === "Slider") {
            return null;
        }

        // Merchant = vendor
        if (ItemTypeName === "Merchant") {
            return null;
        }
    }
};

