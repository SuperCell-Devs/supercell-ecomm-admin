import React, { useState } from 'react'
import AddHomeContent from '../common/home-manager/AddHomeContent';
// import EmptyHomeContent from '../common/home-manager/EmptyHomeContent';
import { HomeSectionsLib } from '../common/home-manager/HomeSectionsLib';
import { MobilePreview } from '../common/home-manager/MobilePreview';



const HomeManager = () => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openMobilePreview, setOpenMobilePreview] = useState(false); 

    const handleCloseAddContent = () => {
        setIsEmpty(true);
        setOpenAddForm(false);
    };

    return (
        <div className='h-[85vh]'>
                <div className="h-full p-4">
                    <div className="bg-white rounded-lg shadow-md p-4 h-full">
                        {
                            !openAddForm && !openMobilePreview?
                            <HomeSectionsLib setOpenMobilePreview={setOpenMobilePreview} openMobilePreview={openMobilePreview} setIsEmpty={setIsEmpty} openAddForm={openAddForm} setOpenAddForm={setOpenAddForm} />
                            :
                            openMobilePreview ? 
                                <MobilePreview openAddForm={openAddForm} openMobilePreview={openMobilePreview} setOpenAddForm={setOpenAddForm} setOpenMobilePreview={setOpenMobilePreview}/>
                                :
                                <AddHomeContent close={handleCloseAddContent} />
                        }
                        
                    </div>
                </div>
        </div>

    )
};

export default HomeManager;