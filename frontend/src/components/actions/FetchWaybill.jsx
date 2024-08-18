import React, {useState} from 'react'
import styled from "styled-components"
import axios from 'axios';

function FetchWaybill() {

  const [count, setcount] = useState(1)
  const [response, setResponse] = useState('')
  
  const data = async(count)=>{
    try {
        const API_TOKEN = import.meta.env.VITE_API_TOKEN
        const CLIENT_NAME = import.meta.env.VITE_CLIENT_NAME
      if (!API_TOKEN || !CLIENT_NAME) {
          console.log("API token is required")
      }
      const getresponse = await axios.get(`/api/waybill/api/bulk/json/?cl=${CLIENT_NAME}&count=${count}`, {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Token ${API_TOKEN}`
        }
      })
      
      console.log(getresponse.data.split(',')) 
      
      if(!getresponse.data){
        const errmsg= document.querySelector(".error")
        errmsg.style.display = "block"
        errmsg.innerHTML = "Sorry! your area is not serviceable."
      }else{
        const data = getresponse.data.split(',')
        setResponse(data)
      }
    
    } catch (error) {
      console.log("Error caught - ", error)
    }
  }

  const handleClickEvent =()=>{
    
    const resultContainer = document.querySelector('.result');
    resultContainer.innerHTML = '';

    const count = document.querySelector(".count").value
    console.log(count)
    setcount(count)
    data(count)
    for(const elem of response){
      const div= document.createElement('div')
      div.textContent = elem
      resultContainer.appendChild(div)
    }
  }






  return (
    <Component>
      <div className='fetch'>
        <div className='error'></div>
        {/* <label htmlFor="count">Choose the no of count : </label>
        <input type="number" className='count'/>
        <button onClick={handleClickEvent}>Get waybills</button> */}

        <div className="ttl">Choose the no of count :</div>
        <input type="number"  className="count inpfield" placeholder='Enter count' />
        <button type='button' className='chk-btn' onClick={handleClickEvent} >Get waybills</button>

        <div className='response'>
          <div className=''>Waybils : </div>
          <div className='result'></div>
        </div>
      </div>



    </Component>
  )
}

export default FetchWaybill

const Component = styled.div`
.fetch{
  width: 100%;
  height: auto;
  padding: 20px;
  font-size: 1.1rem;
  input{
    height: 26px;
    width: 60px;
  }

  
  .ttl{
    font-size: 1.1rem;
    line-height: 3;

  }
  .inpfield{
    height: 35px;
    width: min(250px, 40%);
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
  

  .response{
    // display: none;
    padding-top: 20px;
  }
}
    

 
`