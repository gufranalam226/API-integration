import React from 'react'
import styled from 'styled-components'
import Welcome from './actions/Welcome'
import CheckServiceability from './actions/CheckServiceability'
import CalculateCost from './actions/CalculateCost'
import FetchWaybill from './actions/FetchWaybill'
import TrackShipment from './actions/TrackShipment'
import GenerateShippingLabel from './actions/GenerateShippingLabel'



function ActionContainer({ name, selectedAction }) {

    let Action;
    switch (selectedAction) {
        case 'Check Serviceability':
            Action = CheckServiceability 
            break;
        case 'Calculate Cost':
            Action = CalculateCost
            break;
        case 'Fetch Waybill':
            Action = FetchWaybill
            break;
        case 'Track Shipment':
            Action = TrackShipment
            break;
        case 'Generate Shipping Label':
            Action = GenerateShippingLabel
            break;
    
        default: 
        Action = Welcome
            break;
    }
  return (
   <>
     <Container>
        <div className='title-head'>
            <div className='title'>Welcome Back!</div>
            <div className='action-area'>
                <Action />
                
            </div>
                    {/* {selectedAction ? (
                <p>Action for {selectedAction}</p>
            ) : (
                <p>Please select a menu item to see the action.</p>
            )} */}
            


        </div>
    </Container>
   </>
  )
}

export default ActionContainer


const Container = styled.div`
.title-head{
    height: 80px;
    width: 100%;
    border-bottom: rgba(155, 155, 155, 0.5) 2px solid;
    .title{
        text-align: center;
        height: 60px;
        font-size: 2.2rem;
        display: block;
        align-content: center;
        
    }
        .action-area{
            padding: 20px;
        }
}
`