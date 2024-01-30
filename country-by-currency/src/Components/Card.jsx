import React from 'react'
import '../Styles/Card.css'
const Card = ({name, capital, countryCode,continent}) => {
    
  return (
    <div className='card-container'>
        <img src={`https://flagsapi.com/${countryCode}/flat/64.png`}/>
        
            <h3>{countryCode}</h3>
            <h4>{name}</h4>
        
    </div>
  )
}

export default Card