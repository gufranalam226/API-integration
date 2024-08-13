import React from 'react'
import styled from "styled-components"

function FetchWaybill() {
  return (
    <Component>
      <div className='fetch'>
        <label htmlFor="count">Choose the no of count : </label>
        <input type="number" />

        <div className='response'>
          Response will display here
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

  .response{
    // display: none;
    padding-top: 20px;
  }
}

`