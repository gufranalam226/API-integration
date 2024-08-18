import React, { useState } from 'react'
import styled from "styled-components"
import axios from 'axios';

function CalculateCost() {

  const [codInputField, setCodInputField]  = useState('null');
  const handlePaymentChange = (event) => {
    setCodInputField(event.target.value);
  };



  // const [pincode, setPincode] = useState('')
  const [response, setResponse] = useState('')





  const data = async(url)=>{
    try {
        const API_TOKEN = import.meta.env.VITE_API_TOKEN
      if (!API_TOKEN) {
          console.log("API token is required")
      }
      const getresponse = await axios.get(`${url}`, {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Token ${API_TOKEN}`
        }
      })
      
      // console.log(getresponse) 
      
      if(getresponse.data.length == 0){
        const errmsg= document.querySelector(".error")
        errmsg.style.display = "block"
        errmsg.innerHTML = "Something went wrong."
      }else{
        document.querySelector('.eligible').style.display = 'block'
        const data = getresponse.data[0]
        console.log(data)
        setResponse(data)

      }
    
    } catch (error) {
      console.log("Error caught - ", error)
    }
  }

  
  const handleClickEvent =()=>{
      const errmsg= document.querySelector(".error")
      errmsg.style.display = "none"
      const md = document.querySelector("#mode").value
      const ss = document.querySelector("#status").value
      const o_pin = document.querySelector("#opin").value
      const d_pin = document.querySelector("#dpin").value
      const cgm = document.querySelector("#weight").value
      const pt = document.querySelector("#payment").value
      const cod = document.querySelector("#cod-amt")? document.querySelector("#cod-amt").value : 0;

      console.log(ss, md)


      if(!md|| !ss || !o_pin || !d_pin || !cgm | !pt){
        const errmsg= document.querySelector(".error")
        errmsg.style.display = "block"
        errmsg.innerHTML = "All fields are required!"
        return;      
      }
      const url = `/api/api/kinko/v1/invoice/charges/.json?md=${md}&ss=${ss}&d_pin=${d_pin}&o_pin=${o_pin}&cgm=${cgm}&pt=${pt}${(pt=="cod")?`&cod=${cod}`:`&cod=0`}`
      // setPincode(url)
      data(url)
    }
  





  // const payment = document.querySelector("#payment");
  // payment.addEventListener('onselect', ()=>{
  //   const amountfield  = document.querySelector('.amount')
  //   amountfield.addClassList('.hidden') 
  // })

  return (
    <>
    <Component>
      <div>
        <h3>Calculate your shipping cost</h3>
        <form action="" >
          <div className='grid-form'>
            <div className='mode'>
              <label htmlFor="mode">Shipping mode : </label>
              <select name="" id="mode">
                <option value="E">Express</option>
                <option value="S">Surface</option>
              </select>
            </div>
            {/* "ss is mandatory field and possible values can be Delivered,RTO,DTO" */}
            <div>
              <label htmlFor="status">Shipping Type : </label>
              <select name="" id="status">
                <option value="Delivered">Delivery</option>
                <option value="DTO">Deliver to origin</option>
                <option value="RTO">Return to origin</option>
              </select>
            </div>

            <div>
              <label htmlFor="opin">Origin Pin : </label>
              <input type="text" id='opin' />
            </div>

            <div>
            <label htmlFor="dpin">Destination Pin : </label>
            <input type="text" id='dpin' />

            </div>

            <div>

              <label htmlFor="weight">Weight(In gram) : </label>
              <input type="text" id='weight'/>
            </div>

            <div>
              <label htmlFor="payment">Payment mode : </label>
              <select name="" id="payment" onChange={handlePaymentChange}>
                <option value="Pre-paid">Pre-paid</option>
                <option value="COD">COD</option>
              </select>
            </div>

            {/* <div className='amount'>            
              <label htmlFor="cod-amt">Amount :</label>
              <input type="number" id='cod-amt' />
            </div> */}
            {codInputField === 'COD' && (
              <div className="form-row amount">
                <label htmlFor="cod-amt">Amount :</label>
                <input type="number" id='cod-amt' />
              </div>
            )}
          </div>

          <button type='button' className='calc-btn' onClick={handleClickEvent}>Calculate</button>
          <div className='not-eligible error'></div>







        </form>
        <div className='eligible'>
          <h3>Approximate shipping cost will be : {response.total_amount} &#8377;</h3>
           
        </div>
      </div>
    </Component>

    </>
  )
}

export default CalculateCost


const Component = styled.div`

.calc-btn{
  // height: 30px;
  margin-left: 20px;
  background-color: #ef4136;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 1.1rem;
}

.grid-form{
  height: auto;
  display: flex;
  flex-wrap: wrap; 
  .amount{
    // display : none;
  }

}

.grid-form>div{
width: 35%;
height: 40px;
box-sizing: border-box;
display: grid;
// border: 1px solid red;
margin: 20px;
grid-template-columns: 2fr 2fr;

 

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


@media only screen and (max-width: 668px) {
  .grid-form>div{
    width: 80%;
    
  }
  
  
}
`

// md, ss, o_pin, d_pin, cgm, pt, cod