import React from 'react'
import { getImagePath } from '../helpers/getImagePath';
import { ChevronDown, ChevronUp, ImageOff, LocateFixed, Mail, Phone, Map, CircleUser } from 'lucide-react';
import Collapse from 'Common/Components/Collapse/Collapse';


interface IProps {
    cover?: string;
    logo?: string;
    description?: string;
    title?: string;
    email?: string;
    phoneNumber?: string;
    vendorType?: string;
    district?: string;
    address?: string;
}
const VendorPreviewCard = (props: IProps) => {
    const { cover, description, logo, title, email, address, district, phoneNumber, vendorType } = props;
    const hasMetaInfo = Object.values(props).length > 0;

    return (
        <div className="block overflow-hidden transition card group/card hover:shadow-lg">
            <div className="relative">
                {
                    cover
                        ?
                        <img className="transition-transform duration-500 ease-in-out group-hover/card:scale-105 rounded-t-md" src={getImagePath(cover)} alt={title} />
                        :
                        <div className='flex items-center justify-center  p-4'>
                            <div><ImageOff size={32} /></div>
                        </div>
                }
            </div>
            <div className="card-body">
                <h6 className="mb-4 text-15 flex items-center gap-x-4">
                    {
                        logo ?
                            <div className='felx items-center justify-center'>
                                <img src={getImagePath(logo)} alt="logo" className="h-10 rounded-full border" />
                            </div> :
                            <div className='felx items-center justify-center'>
                                <ImageOff size={16} />
                            </div>
                    }
                    { title }
                </h6>
                <p className="my-2 text-slate-500 dark:text-zink-200">
                    {description}
                </p>

                {
                    hasMetaInfo && 
                    <Collapse>
                        <Collapse.Trigger className="flex text-white collapsible-header group/item btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                            More
                            <div className="ltr:ml-2 rtl:mr-2 shrink-0">
                                <ChevronDown className="hidden size-4 group-[.show]/item:inline-block"></ChevronDown>
                                <ChevronUp className="inline-block size-4 group-[.show]/item:hidden"></ChevronUp>
                            </div>
                        </Collapse.Trigger>
                        <Collapse.Content className="mt-2 mb-0 collapsible-content card">
                            <div className="card-body">
                            <ul className="space-y-5 list-none list-inside rounded-md">
                                {vendorType && <li className='flex gap-x-2 items-center'><CircleUser />   {vendorType}</li>}
                                {email &&  <li className='flex gap-x-2 items-center'><Mail /> { email }</li>}
                                {phoneNumber && <li className='flex gap-x-2 items-center'><Phone /> {phoneNumber}</li>}
                                {district && <li className='flex gap-x-2 items-center'><Map /> {district}</li>}
                                {address && <li className='flex gap-x-2 items-center'><LocateFixed /> {address}</li>}
                                
                            </ul>
                            </div>
                        </Collapse.Content>
                </Collapse>
                }
            </div>
                 
        </div>
    )
};

export default VendorPreviewCard