import React from 'react'
import './Css/HomeAboutus.css'
function HomeAboutus({text,icon}) {
    return (
        <div className="aboutus">
            <div className="home_aboutus">
                {icon}
                {text}

</div>
        </div>
    )
}

export default HomeAboutus
