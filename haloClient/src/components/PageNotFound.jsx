import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Css/PageNotFound.css';
function PageNotFound() {
const history=useHistory()

    return (
        <div className="pagenotfound">
            
<span className="error_text">   404 Page Not Found </span>
<button className="error_page_button" onClick={()=>history.replace('/home') } > Go to home </button>

        </div>
    )
}

export default PageNotFound
