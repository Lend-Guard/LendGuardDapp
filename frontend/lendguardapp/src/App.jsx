import logo from './logo.svg';
import Headers from "./Base/Header"
import Main  from "./Base/Main"
import AssetComponent from './Base/Services';
import Dashboard from "./Base/Dashboard"
import { Route,Switch, Routes, Navigate, useParams } from "react-router-dom";
import './App.css';

function App() {
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
