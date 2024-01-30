import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
export const Home = () => {
    const [country,setCountry]=useState([])
  const [query,setQuery]=useState('')
  const [loading,setLoading]=useState(false);
  const getCountry=async (search)=>{
    
    try{
    let url='https://restcountries.com/v3.1/all'
    if(!query.trim()){
      let res=await axios.get(url);
      setCountry(res.data)
    }
    else{
       
        url=`https://restcountries.com/v3.1/currency/${search}`
        let responce=await axios.get(url)
        console.log("cs",responce.data)
        setCountry(responce.data)
        console.log(country)
    }
    }catch(error){
            console.error('Error fetching country data:', error);        
    }

  } 
      console.log(country)
    useEffect(()=>{
       if(query.trim()){
        const debounceTimer = setTimeout(() => {
            getCountry(query)
          }, 1000);
    
          return () => {
            clearTimeout(debounceTimer);
          };
       }
      else{
        getCountry()
      }
    },[query])
    
  return (
    <div>
        <input type="text" onChange={(e)=>setQuery(e.target.value)}/>
    </div>
  )
}
export default Home