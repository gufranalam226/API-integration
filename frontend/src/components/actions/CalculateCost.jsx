import React, { useState } from 'react'
import styled from "styled-components"

function CalculateCost() {

  const [codInputField, setCodInputField]  = useState('null');
  const handlePaymentChange = (event) => {
    setCodInputField(event.target.value);
  };

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

          <button type='submit' className='calc-btn'>Calculate</button>






        </form>
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
width: 45%;
height: 30px;
box-sizing: border-box;
display: grid;
// border: 1px solid red;
margin: 20px;
grid-template-columns: 1fr 1.5fr;

}

`

// md, ss, o_pin, d_pin, cgm, pt, cod