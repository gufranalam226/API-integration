import React from 'react'
import logo from "../assets/logo.svg"
import styled from 'styled-components'


function MenuItems({ onSelectItem }) {
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
        <div className='logo'><img src={logo} alt="logo" /></div>
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
    height: auto;
    width: 300px;
    border-right: rgba(155, 155, 155, 0.5) 3px solid;

}

.logo{
    height: 80px;
    width: 100%;
    margin: auto;
    display: block;
    align-content: center;
    backgound-color: black;
    border-bottom: rgba(155, 155, 155, 0.5) 2px solid ;
    img{
        height: 40px;
        width: 100%;
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
`