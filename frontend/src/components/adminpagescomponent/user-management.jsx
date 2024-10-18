import React from 'react';
import { useOutletContext } from 'react-router-dom';
import "../../assets/css/subpages-css/user-management.css"
import DisplayAllAdmin from '../subcomponent/displayAll-Admin';
import DisplayAllEmployee from '../subcomponent/displayAll-Employee';

function UserManagement() {
    const admin = useOutletContext();

    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '30px 0 auto', cursor: 'default', fontWeight: '600' }}>
                User Management
            </h2>

            <DisplayAllEmployee />
            <hr style={{ width: '60%', margin: '20px auto', border: '1px solid #ccc' }} />
            <DisplayAllAdmin />
        </>
    );
}

export default UserManagement;
