import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/styles/marvel-devices.min.css'
import 'react-device-frameset/styles/device-selector.min.css'
import { createSelector } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { GetHomeManager, Paginated } from 'helpers/interface/api';
import { useSelector } from 'react-redux';

interface IMobilePreview { 
    openAddForm: boolean;
    setOpenAddForm:React.Dispatch<React.SetStateAction<boolean>>;
    openMobilePreview: boolean;
    setOpenMobilePreview: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MobilePreview = (props: IMobilePreview) => { 
    const {setOpenAddForm, setOpenMobilePreview } = props;
   
    const handleCloseMobilePreview = () => { 
        setOpenAddForm(false);
        setOpenMobilePreview(false);
    }; 
    
    
    const selectDataList = createSelector(
        (state: any) => state.Ecommerce,
        (state) => ({
            dataList: state.homeManager
        })
    );


    const { dataList } = useSelector(selectDataList);

    
    const [data, setData] = useState<Paginated<GetHomeManager[]>>();
    
    useEffect(() => { 
       
        if (dataList) {
            setData(dataList);
        }
    }, [data]);


    return (<div className='overflow-y-scroll 2xl:overflow-hidden h-full'>

              <button
                    type="button"
                    autoFocus
                    onClick={handleCloseMobilePreview}
                    className="text-custom-500 btn bg-custom-100 hover:text-white hover:bg-custom-600 focus:text-white focus:bg-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:ring active:ring-custom-100 dark:bg-custom-500/20 dark:text-custom-500 dark:hover:bg-custom-500 dark:hover:text-white dark:focus:bg-custom-500 dark:focus:text-white dark:active:bg-custom-500 dark:active:text-white dark:ring-custom-400/20">
                          Close
            </button>
        <div className='flex justify-center'>
            <DeviceFrameset
                device="Samsung Galaxy S5"
                color="black"
                zoom={1}
            >
                <div className='overflow-y-scroll overflow-x-hidden h-full no-scrollbar'>
                    {
                        data?.results.map((e) => (<pre key={e.id}>{JSON.stringify(e, null, 10)}</pre>))
                    }
                </div>
            </DeviceFrameset>
        </div>
    </div>);
};
 