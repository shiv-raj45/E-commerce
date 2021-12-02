import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import Pricefilter from './Pricefilter'
import ProductCard from './ProductCard'

function CategoryFilter() {
    const {id}=useParams()
    
const [product, setProduct] = useState([])

useEffect(()=>{
const filterBycategory=()=>{
    axios.get(`http://localhost:2000/category/${id}`).then((response)=>{
        console.log(response.data);
setProduct(response.data)
})
}
filterBycategory()
},[id])


    return (
        <div>
            <ProductCard data={product}/>
            <Pricefilter products={product}/>
        </div>
    )
}

export default CategoryFilter
