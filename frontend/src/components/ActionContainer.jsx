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
            <div className='title'>{selectedAction || "Welcome Back!"}</div>
            <div className='action-area'>
                <Action />
                
            </div>    


        </div>
    </Container>
   </>
  )
}

export default ActionContainer


const Container = styled.div`

.title-head{
    padding-bottom: 20px;
    width: 100%;
    .title{
        text-align: center;
        width: 100%;
        height: 80px;
        font-size: 1.8rem;
        display: block;
        align-content: center;
        border-bottom: rgba(155, 155, 155, 0.5) 2px solid;
        
    }
    .action-area{
        padding: 20px;
        width: 100%;
        overflow: hidden;
    }
}
`