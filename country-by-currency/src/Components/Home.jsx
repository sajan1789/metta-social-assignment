import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Card from './Card'
import { useRef } from 'react'
import '../Styles/Home.css'
import myImage from '../Image/nodata.jpeg';
import LoadingImage from '../Image/loadings.gif';
export const Home = () => {
    const [country,setCountry]=useState([])
  const [query,setQuery]=useState('')
  const [loading,setLoading]=useState(false);
  const getCountry=async (search)=>{
    
    
    let url='https://restcountries.com/v3.1/all'
    
    if(!query.trim()){
        try{
          setLoading(true)
            let res=await axios.get(url);
            setCountry(res.data)
            setLoading(false)
        }
        catch(err){
          setLoading(false)
            
            setCountry([])
        }
     
      
    }
    
    else{  
        try{
          setLoading(true)
            url=`https://restcountries.com/v3.1/currency/${search}`
            let responce=await axios.get(url)
            console.log("cs",responce.data)
            setCountry(responce.data)
            setLoading(false)
            console.log(country)
        }   catch(err){
            console.error(err)
            setCountry([])
            setLoading(false)
        }
        
    }
    

  } 
    useEffect(()=>{
        
       if(query.trim()){
        const debounceTimer = setTimeout(() => {
            getCountry(query)
          }, 600);
    
          return () => {
            clearTimeout(debounceTimer);
          };
       }
      else{
        getCountry()
        
      }
    },[query])
    if(loading) return <img src={LoadingImage} alt="" className='loading-img'/>
    
  return (
    <div className='home-container'>
        <div className='search'>
            <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)}/> 
        </div>
        {country.length>0?(
          <div className='country-list'>
            {
                country.map((country)=>(
                    <Card key={country.cca2} name={country.name.common} capital={country.capital} countryCode={country.cca2} continent={country.continents}/>
                ))
            }
          </div>
        ):<img src={myImage} width="40%"/>}
       
        
        
    </div>
  )
}
export default Home