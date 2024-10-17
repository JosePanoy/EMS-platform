import React from 'react'
import { useOutletContext } from 'react-router-dom';
import DashboardOverviewContent from '../subcomponent/dashboard-overview-content';

function DashboardOverview() {
    const admin = useOutletContext();
    return(
        <>

        <DashboardOverviewContent />


        </>
    )
}

export default DashboardOverview;