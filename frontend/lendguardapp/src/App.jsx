import logo from './logo.svg';
import Headers from "./Base/Header"
import Main  from "./Base/Main"
import AssetComponent from './Base/Services';
import Dashboard from "./Base/Dashboard"
import { Route,Switch, Routes, Navigate, useParams } from "react-router-dom";
import { useAccount, useContractWrite, serialize, deserialize } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);


  const assets = [
    { id: '1', name: 'ETH' },
    { id: '2', name: 'DAI' },
  ];

  const onSupply = (selectedAsset, amount) => {
    //TODO
    console.log(`Supply ${amount} ${selectedAsset}`);

  };

  const onBorrow = (selectedAsset, amount) => {
    //OTDO
    console.log(`Borrow ${amount} ${selectedAsset}`);

  };


  useEffect(() => {
    if (address !== undefined && !redirected) {
      navigate('/deploy');
      setRedirected(true);
    }
  }, [address, navigate, redirected]);

  return (
    <div className="App">
      <Headers />
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/deploy" element={<AssetComponent assets={assets} onSupply={onSupply} onBorrow={onBorrow}/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        
      </Routes>
      {/* <AssetComponent assets={assets} onSupply={onSupply} onBorrow={onBorrow} /> */}
    </div>
  );
}

export default App;
