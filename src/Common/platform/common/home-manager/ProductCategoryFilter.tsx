import React from 'react'
interface IProps {
    filterAction: any;
    setFilterAction: React.Dispatch<any>;
};

const ProductCategoryFilter = (props: IProps) => {
    if (props.filterAction) {
        
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setFilterAction({
            ...props.filterAction,
            productFilter: {
            ...props.filterAction.productFilter,
            [e.target.name]: e.target.value  === "on" ? true : false
        } });
    };
    return (
        <div className="ml-10">
            <label htmlFor="qualityInput" className="inline-block mb-2 text-base font-medium">Product options</label>
            <div className="flex flex-wrap justify-start items-start gap-2">
                <div>
                    <input
                        onChange={handleChange}
                        checked={props.filterAction.isPublished}
                        id="isPublished"
                        className="inline-block size-5 align-middle border rounded-sm appearance-none cursor-pointer bg-sky-500 border-sky-500 checked:bg-sky-500 checked:border-sky-500 disabled:opacity-75 disabled:cursor-default"
                        type="checkbox"
                        name="isPublished" />
                    <label htmlFor="isPublished" className="mx-3 inline-block mb-2 text-base font-medium">Is Published</label>

                </div>

                <div >
                    <input id="isFeatured"
                        className="inline-block size-5 align-middle border rounded-sm appearance-none cursor-pointer bg-sky-500 border-sky-500 checked:bg-sky-500 checked:border-sky-500 disabled:opacity-75 disabled:cursor-default"
                        type="checkbox"
                        onChange={handleChange}
                        checked={props.filterAction.isFeatured}
                        name="isFeatured" />
                    <label htmlFor="isFeatured" className="mx-3 inline-block mb-2 text-base font-medium">Is Featured</label>

                </div>

                <div >
                    <input id="isNew"
                        className="inline-block size-5 align-middle border rounded-sm appearance-none cursor-pointer bg-sky-500 border-sky-500 checked:bg-sky-500 checked:border-sky-500 disabled:opacity-75 disabled:cursor-default"
                        type="checkbox"
                        onChange={handleChange}
                        checked={props.filterAction.isNew}
                        name="isNew" />
                    <label htmlFor="isNew" className="mx-3 inline-block mb-2 text-base font-medium">Is New</label>

                </div>

                <div >
                    <input id="isOnSale"
                        className="inline-block size-5 align-middle border rounded-sm appearance-none cursor-pointer bg-sky-500 border-sky-500 checked:bg-sky-500 checked:border-sky-500 disabled:opacity-75 disabled:cursor-default"
                        type="checkbox"
                        onChange={handleChange}
                        checked={props.filterAction.isOnSale}
                        name="isOnSale" />
                    <label htmlFor="isOnSale" className="mx-3 inline-block mb-2 text-base font-medium">Is On Sale</label>
                                
                </div>

                <div >
                    <input id="isBestSeller"
                        className="inline-block size-5 align-middle border rounded-sm appearance-none cursor-pointer bg-sky-500 border-sky-500 checked:bg-sky-500 checked:border-sky-500 disabled:opacity-75 disabled:cursor-default"
                        type="checkbox"
                        onChange={handleChange}
                        checked={props.filterAction.isBestSeller}
                        name="isBestSeller" />
                    <label htmlFor="isBestSeller" className="mx-3 inline-block mb-2 text-base font-medium">Is Best Seller</label>
                </div>

                <div >
                    <input id="isAvailable"
                        className="inline-block size-5 align-middle border rounded-sm appearance-none cursor-pointer bg-sky-500 border-sky-500 checked:bg-sky-500 checked:border-sky-500 disabled:opacity-75 disabled:cursor-default"
                        type="checkbox"
                        onChange={handleChange}
                        checked={props.filterAction.isAvailable}
                        name="isAvailable" />
                    <label htmlFor="isVariable" className="mx-3 inline-block mb-2 text-base font-medium">Is available</label>

                </div>


            </div>
        </div>

    );
    }
   
};
export default ProductCategoryFilter;