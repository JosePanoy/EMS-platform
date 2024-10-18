import React from 'react'
import { useOutletContext } from 'react-router-dom';

function MessagingNotification() {

    const admin = useOutletContext();
    return(
        <>

        <h2 style={{ textAlign: 'center', margin: '100px 0 auto', fontWeight: '600' }}>
         Messaging Notification
        </h2>

        <h2 style={{ textAlign: 'center', margin: '100px 0 auto', fontWeight: '600' }}>
         Hi {admin.idNum}
        </h2>
        </>
    )
}

export default MessagingNotification;