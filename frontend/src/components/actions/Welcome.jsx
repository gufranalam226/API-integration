import React from 'react'
import styled from 'styled-components'
import welcomeImg from '../../assets/welcome.png'


function Welcome() {
  return (
    <Component>
      <div className='welcome'>
        <img src={welcomeImg} alt="welcome" />
        <h2>Hi, Welcome Back!</h2>
        <p>Choose from the menu section...</p>
      </div>

    </Component>
  )
}

export default Welcome


const Component = styled.div`
.welcome{
  width: 100%;
  height: auto;
  padding: 20px;
  display: block;
  text-align: center;
}

`