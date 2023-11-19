import logo from './logo.svg';
import Headers from "./Base/Header"
import Main  from "./Base/Main"
import AssetComponent from './Base/Services';
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
        <Route path="/assets" element={<AssetComponent assets={assets} onSupply={onSupply} onBorrow={onBorrow}/>}/>
      </Routes>
      {/* <AssetComponent assets={assets} onSupply={onSupply} onBorrow={onBorrow} /> */}
    </div>
  );
}

export default App;
