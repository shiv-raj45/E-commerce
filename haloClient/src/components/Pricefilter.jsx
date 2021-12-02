import React from 'react'

function Pricefilter({products}) {
  const sortPrice=(products)=>{  
  return products.sort((a, b) => (a.price > b.price ? -1 : 1))

  }
  return (
        <div>

<button onClick={() => {sortPrice(products)}}>
              sort asc
            </button>
    
            
        </div>
    )
}

export default Pricefilter
