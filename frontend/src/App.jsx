import { useState } from 'react'
import styled from "styled-components"
import './App.css'
import MenuItems from './components/MenuItems'
import ActionContainer from './components/ActionContainer'

function App() {

  const [selectedAction, setSelectedAction] = useState(null);

  

  return (
    <Container>
      <div className='container'>

        <div className='menuItems'>
          <MenuItems onSelectItem = {setSelectedAction}/>
        </div>
        <div className='action-container'>
          <ActionContainer selectedAction = {selectedAction}/>
        </div>
          

      </div>
    </Container>
  )

}

export default App

const Container = styled.div`
.container{
  height : auto;
  max-width : 1280px;
  border: 2px solid black;
  margin: auto;
  display: flex;
  box-sizing : border-box;
  .menuItems{
    width: 300px;
    height: 100%;
    border-right: rgba(155, 155, 155, 0.5) 3px solid;

  }
  .action-container{
    width: 100%;
    height: 100%;
  }
}

@media only screen and (max-width: 668px) {

  .container{
    display: block;
    width: 100vw;
    .menuItems{
      border: none;
    }
  }
  
}

`