import React from 'react'
import { getImagePath } from '../helpers/getImagePath';
import { ChevronDown, ChevronUp, ImageOff, LocateFixed, Mail, Phone, Map, CircleUser } from 'lucide-react';
import Collapse from "../../Components/Collapse/Collapse";
import { IProduct } from 'helpers/interface/api';


export interface IProductPreviewCard {
    name: string,
    image: {
        path?: string,
        imageType?: string,
        aspectRatio?: string
    },
    isNew: boolean,
    isOnSale: boolean,
    isBestSeller: boolean,
    price: number,
    isAvailable: boolean,
    id: number
};
const ProductPreviewCard = (props: IProductPreviewCard) => {
    const { image } = props;

    const {
        name } = props;
    
    return (
        <div className="block overflow-hidden transition card group/card hover:shadow-lg">
            <div className="relative">
                {
                    image?.path ? <img className="transition-transform duration-500 ease-in-out group-hover/card:scale-105 rounded-t-md" src={getImagePath(image?.path)} alt={name} /> : <ImageOff size={32}/>
                }
            </div>         
        </div>
    )
};

export default ProductPreviewCard