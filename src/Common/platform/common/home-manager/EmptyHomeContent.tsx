import React from 'react'


interface IProps {
    show: React.MouseEventHandler<HTMLButtonElement> | undefined
    isEmpty: boolean
};

const EmptyHomeContent = (props: IProps) => {
    if (props.isEmpty) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className='border'>
                    <button
                        onClick={props.show}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Add Home Page Content
                    </button>
                </div>
            </div>
        );      
    }
    return null;
  
}

export default EmptyHomeContent