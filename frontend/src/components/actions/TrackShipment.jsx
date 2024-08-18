import React from 'react'
import styled from "styled-components"
import { useState, useEffect } from 'react';
import axios from "axios"



function TrackShipment() {

  const [waybill, setwaybill] = useState('')
  const [response, setResponse] = useState('')


  useEffect(() => {
    // Reset styles or state when location changes
    const errmsg = document.querySelector(".error");
    const eligibleMsg = document.querySelector(".eligible");
    
    if (errmsg) errmsg.style.display = "none";
    if (eligibleMsg) eligibleMsg.style.display = "none";
    
    // Clear response if needed when navigating away
    setResponse(null);
  }, [location]);


  const data = async(waybill)=>{
    try {
        const API_TOKEN = import.meta.env.VITE_API_TOKEN
      if (!API_TOKEN) {
          console.log("API token is required", API_TOKEN , "  ", import.meta.env)
      }
      const getresponse = await axios.get(`/api/api/v1/packages/json/?waybill=${waybill}`, {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Token ${API_TOKEN}`
        }
      })
      
      console.log(getresponse.data.ShipmentData[0].Shipment) 
      
      if(getresponse.data.ShipmentData.length == 0){
        const errmsg= document.querySelector(".error")
        errmsg.style.display = "block"
        errmsg.innerHTML = "Sorry! your area is not serviceable."
      }else{
        document.querySelector('.eligible').style.display = 'block'
        const data = getresponse.data.ShipmentData[0].Shipment
        setResponse(data)
      }
    
    } catch (error) {
      console.log("Error caught - ", error)
    }
  }

  const handleClickEvent =()=>{
    document.querySelector(".error").style.display = "none"
    document.querySelector('.eligible').style.display = 'none'
    const waybill = document.querySelector(".inpfield").value
    if(!waybill){
      const errmsg= document.querySelector(".error")
      errmsg.style.display = "block"
      errmsg.innerHTML = "AWB or waybill is required!"
      return;      
    }
    setwaybill(waybill)
    data(waybill)
  }

  return (
    <>
      <Container>
        <div className='serviceability'>
          <div className="ttl">Enter AWB To track the order :</div>
          <input type="text" name='waybill' className="inpfield" placeholder='Enter pincode' />
          <button type='submit' className='chk-btn' onClick={handleClickEvent} >Check</button>
          <div className='not-eligible error'></div>
          <div className='eligible'>
            <h3>Shipment sttaus : </h3>
            <div>AWB No. : {response?.AWB ?? 'Not available'} </div>
            <div>Last Status : {response?.Status?.Status ?? 'Not available'}</div>
            <div>Date : {response?.Status?.StatusDateTime.split('T')[0] ?? 'Not available'}</div>
            
          </div>
          
        </div>
      </Container>
    </>
  )
}

export default TrackShipment

const Container = styled.div`
.serviceability{
  padding: 20px;
  .ttl{
    font-size: 1.1rem;
    line-height: 3;

  }
  .inpfield{
    height: 35px;
    width: min(300px, 50%);
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
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 30px;

    display: none;
  }
}
`