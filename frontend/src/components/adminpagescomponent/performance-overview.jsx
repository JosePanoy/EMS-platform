import React from 'react'
import { useOutletContext } from 'react-router-dom';

function PerformanceOverview() {
  const admin = useOutletContext();
    return(
        <>
        <h2 style={{ textAlign: 'center', margin: '100px 0 auto', fontWeight: '600' }}>
      Performance Overview
        </h2>


        </>
    )
}

export default PerformanceOverview;