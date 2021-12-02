import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import ChangePassword from './ChangePassword'
function AccountControls() {
    const {accountControls}=useParams();
    return (
        <div>
            {accountControls==="changepassword" && <ChangePassword/>}
        </div>
    )
}

export default AccountControls
