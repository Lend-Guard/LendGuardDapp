
import VaultV1 from "../abis/VaultV1.json";
import GuardFactory from "../abis/GuardFactory.json"
import {ethers,BigNumber} from "ethers";
import { Wallet } from 'ethers';

export async function updateSettings(address,health_ratio_notification, health_ratio_execution, target_health_ratio) {
    try {
      const response = await fetch(process.env.REACT_APP_BACK_URL + "/update_settings_healths", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: address, health_ratio_notification: health_ratio_notification, health_ratio_execution: health_ratio_execution, target_health_ratio: target_health_ratio }),
      });
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching table data from API:", error);
    }
}


export async function getSettings(address) {
    try {
      const response = await fetch(process.env.REACT_APP_BACK_URL + "/get_setting/" + address, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching table data from API:", error);
    }
  }


  export async function fetchDeploy({ health_ratio_notification, health_ratio_execution, target_health_ratio }) {
    try {
      if (window.ethereum) {

        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        const contractAddress = "0x272Ded7510786F266a3C1D8D0ad0EaCcA308B593";
        const contractABI = GuardFactory;
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
        const targetHealthFactor = ethers.utils.parseUnits(target_health_ratio.toString(), 18);
        const healthRatioNotification = ethers.utils.parseUnits((target_health_ratio * (health_ratio_notification/100+1)).toString(), 18);
        const healthRatioExecution = ethers.utils.parseUnits((target_health_ratio * (health_ratio_execution/100+1)).toString(), 18);

        const result = await contract.createLendGuard(healthRatioNotification, healthRatioExecution, targetHealthFactor);
        console.log(result);
  
        return result;
      } else {
        console.error('MetaMask not detected. Please make sure MetaMask is installed and connected.');
      }
    } catch (error) {
      console.error('Error fetching vaults data:', error);
    }
  };






