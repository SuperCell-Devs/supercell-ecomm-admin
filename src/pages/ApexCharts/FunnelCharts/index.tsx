import BreadCrumb from 'Common/BreadCrumb';
import React from 'react';
import { BasicFunnel, PyramidFunnel } from './BasicFunnel';

const FunnelCharts = () => {
    return (
        <>
            <BreadCrumb title='Funnel Charts' pageTitle='Apexcharts' />
            <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-2">
                <div className="card">
                    <div className="card-body">
                        <h6 className="mb-4 text-15">Basic</h6>
                        <BasicFunnel chartId="basicFunnel" />
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h6 className="mb-4 text-15">Pyramid</h6>
                        <PyramidFunnel chartId="pyramidChart" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FunnelCharts;
