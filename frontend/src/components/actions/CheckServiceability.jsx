import React from 'react'
import styled from "styled-components"
import { useState } from 'react';
import axios from "axios"

// dotenv.config({
//   path : "/.end"
// })

function CheckServiceability() {
  // set state to reflect update and send pincode
  const [pincode, setPincode] = useState('')
  const [response, setResponse] = useState('')





  const data = async(pincode)=>{
    try {
        const API_TOKEN = import.meta.env.VITE_API_TOKEN
      if (!API_TOKEN) {
          console.log("API token is required", API_TOKEN , "  ", import.meta.env)
      }
      const getresponse = await axios.get(`/api/c/api/pin-codes/json/?filter_codes=${pincode}`, {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Token ${API_TOKEN}`
        }
      })
      
      console.log(getresponse.data) 
      
      if(getresponse.data.delivery_codes.length == 0){
        const errmsg= document.querySelector(".error")
        errmsg.style.display = "block"
        errmsg.innerHTML = "Sorry! your area is not serviceable."
      }else{
        document.querySelector('.eligible').style.display = 'block'
        const data = getresponse.data.delivery_codes[0].postal_code
        setResponse(data)
      }
    
    } catch (error) {
      console.log("Error caught - ", error)
    }
  }

  const handleClickEvent =()=>{
    document.querySelector(".error").style.display = "none"
    document.querySelector('.eligible').style.display = 'none'
    const userPincode = document.querySelector(".inpfield").value
    if(!userPincode){
      const errmsg= document.querySelector(".error")
      errmsg.style.display = "block"
      errmsg.innerHTML = "Pincode is required!"
      return;      
    }
    setPincode(userPincode)
    data(userPincode)
  }
  

  return (
    <>
      <Container>
        <div className='serviceability'>
          <div className="ttl">Enter pincode of the city you want to check</div>
          <input type="text" name='pincode' className="inpfield" placeholder='Enter pincode' />
          <button type='submit' className='chk-btn' onClick={handleClickEvent} >Check</button>
          <div className='not-eligible error'></div>
          <div className='eligible'>
            <p>This area is eligible for delivery</p>
            <div>Pincode : {response.pin} </div>
            <div>City : {response.city}</div>
          </div>
          
        </div>
      </Container>
    </>
  )
}

export default CheckServiceability
const Container = styled.div`
.serviceability{
  padding: 20px;
  .ttl{
    font-size: 1.1rem;
    line-height: 3;

  }
  .inpfield{
    height: 35px;
    width: min(300px, 60%);
    border-radius: 8px 0px 0px 8px;
    border: none;
    outline: none;
    padding-left: 10px;
    box-sizing: border-box;
    background-color: rgba(135, 135, 135, 0.4)
  }
  
  .chk-btn{
    height: 35px;
    padding: 0px 15px;
    border:none;
    border-radius: 0px 8px 8px 0px;
    cursor: pointer;
    background-color: red;
    font-weight: 500;
    box-sizing: border-box;
  }
  .not-eligible{
    color: red;
    padding-left: 8px;
    display: none;
  }
  .eligible{
    font-size: 1.1rem;
    display: none;
  }
}



`