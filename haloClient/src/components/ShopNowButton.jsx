import React from 'react'
import { useHistory } from 'react-router-dom'
import './Css/ShopnowButton.css'

function ShopNowButton({text}) {
const history=useHistory()

    return (
        <div className="continue_shopping" onClick={()=>history.push('/home')}>
          {text}  
        </div>
    )
}

export default ShopNowButton
