import React from 'react'
import { useEffect, useState } from "react";
import { Button, Modal} from 'react-bootstrap';
import "../Components/Dashboard/Dashboard.css"
import "../Components/Dashboard/DashboardNavbar"
import BuyModal from './Modals/BuyModal';
import SellModal from './Modals/SellModal';
import DashboardNavBar from './Dashboard/DashboardNavbar';

const TradePage = () => {

  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const handleShowBuy = () => setShowBuyModal(true);
  const handleShowSell = () => setShowSellModal(true);

  return (

    <div className='body-font'>
    
    <DashboardNavBar />
    
    Trade Page
    <div>

    <Button className='mb-2' onClick={handleShowBuy}>Buy Shares</Button>
   
   <BuyModal show={showBuyModal} onHide={() => setShowBuyModal(false)} />

    </div>
  <div>

   <Button onClick={handleShowSell}>Sell Shares</Button>
   <SellModal show={showSellModal} onHide={() => setShowSellModal(false)} />

  </div>

    </div>
  )
}

export default TradePage