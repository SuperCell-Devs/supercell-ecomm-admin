import React, { useState } from 'react'
import AddHomeContent from '../common/home-manager/AddHomeContent';
import EmptyHomeContent from '../common/home-manager/EmptyHomeContent';
import { HomeSectionsLib } from '../common/home-manager/HomeSectionsLib';

const HomeManager = () => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [openAddForm, setOpenAddForm] = useState(false);

    const handleAddContent = () => {
        setIsEmpty(false);
        setOpenAddForm(true);
    };
    const handleCloseAddContent = () => {
        setIsEmpty(true);
        setOpenAddForm(false);
    };

    return (
        <div className='h-screen'>
            {/* Library manager */}
                <div className="h-full p-4">
                    <div className="bg-white rounded-lg shadow-md p-4 h-full">
                        {
                            !openAddForm ?
                            <HomeSectionsLib setIsEmpty={setIsEmpty} openAddForm={openAddForm} setOpenAddForm={setOpenAddForm} />
                            :
                            <AddHomeContent close={handleCloseAddContent} />
                        }
                    </div>
                </div>
        </div>

    )
};

export default HomeManager;