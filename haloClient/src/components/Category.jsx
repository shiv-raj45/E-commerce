import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Category () {
    const history=useHistory()
  const [categories, setCategories] = useState(null);

useEffect(()=>{
    const fetchcategory = () => {
        axios.get(`http://localhost:2000/category`).then((res) => {
          console.log(res.data);
          setCategories(res.data);
        });
      };
      fetchcategory()
},[])
    
const productByCategory=(id)=>{
    console.log(id);
    history.push(`/Category/${id}`)
}
    return (
        <div>
        {categories?.map((category, index) => (
          <div key={index}>
           <button onClick={()=>{productByCategory(category.categoryId)}}>{category.productCategory} </button>
          </div>
        ))}
        </div>
    )
}

export default Category
