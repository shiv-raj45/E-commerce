import axios from 'axios'
import {useEffect, useState} from 'react'

async function useFetch(baseUrl,keyword) {
const [fetchedData, setFetchedData] = useState([]);
const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
    setIsLoading(true)
    const {data}=axios.get(`${baseUrl}/products`)
setFetchedData(data)
setIsLoading(false);
}, [keyword,baseUrl])

return {fetchedData,isLoading}

}

export default useFetch
