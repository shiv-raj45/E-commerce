import { Star, StarBorder } from "@material-ui/icons";
import React, { useState,useEffect } from "react";
import './Css/Rating.css'
function Rating({ rate}) {
    const [rating, setRating] = useState(0);

    useEffect(() => {
setRating(rate)
    

}, [rate])
  return (<>
    <div className="rating">
      {[...Array(5)]?.map((_, i) => (
        <div className="rating_star"  key={i}  >
        
    
        {rating>i?(<Star style={{color: 'rgb(255, 25, 25)'}} />):(<StarBorder style={{color: 'rgb(255, 25, 25)'}} />)}
        </div>
      ))}
 
      
       
    </div>
</>
  );
}


export default Rating;
