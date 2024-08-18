import React, { useState } from 'react'
import logo from "../assets/logo.svg"
import styled from 'styled-components'
import burger from '../assets/menu-burger.svg'


function MenuItems({ onSelectItem }) {

  // const [menu, setmenu] = useState(none)

  const toggleMenu = ()=>{
    const menu_items = document.querySelector('.menu_items')
    menu_items.classList.toggle('show-hide')

  }


  const menuItems = [
    'Check Serviceability',
    'Calculate Cost',
    'Fetch Waybill',
    'Track Shipment',
    'Generate Shipping Label'
  ];
  return (
    <Container>
      <div className='menu'>
        <div className='logo'>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div>
            <img src={burger} className='burger' alt='ham_burger' onClick={toggleMenu} />
          </div>
        </div>
        <div className='menu_items'>
            {/* <div className='items'>Check Serviceability</div>
            <div className='items'>Calculate Cost</div>
            <div className='items'>Fetch Waybill</div>
            <div className='items'>Track Shipment</div>
            <div className='items'>Generate shipping Label</div> */}
            {menuItems.map((item, index) => (
            <div 
              key={index} 
              className='items' 
              onClick={() => onSelectItem(item)}
            >
              {item}
            </div>
          ))}
        </div>

      </div>
    </Container>
  )
}

export default MenuItems


const Container = styled.div`
.menu{
    height: 100%;
    width: 300px;

}

.logo{
    height: 80px;
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    backgound-color: black;
    border-bottom: rgba(155, 155, 155, 0.5) 2px solid ;
    img{
        height: 40px;
        width: 100%;
    }
   
    .burger{
      display: none;
    }
}

.menu_items{
    padding: 20px ;
    display: block;
    .items{
        height: 50px;
        border-bottom:rgba(155, 155, 155, 0.5) 1px solid; 
        align-content: center;
        padding-left: 10px;
        font-size: 1.2rem;
        cursor: pointer;
        font-weight: 500;

    }
}

@media only screen and (max-width: 668px) {

  .menu{
    width: 100vw;
    
  }

  .menu_items{
    display: none;
  }

  .show-hide{
    display: block;
  }

  .logo{
    justify-content: space-between;
    padding: 0px 15px;
  
  .burger{
      display: flex;
      cursor: pointer;
    }
  }
  
  
}


`