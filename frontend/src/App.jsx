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
width : max(700px, 1160px);
border: 2px solid black;
margin: auto;
display: flex;
.menuItems{
width: 300px;
}
.action-container{
width: max(400px, 100%)
}
}

`