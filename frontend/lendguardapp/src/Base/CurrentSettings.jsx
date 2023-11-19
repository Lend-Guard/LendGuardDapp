import React, { useState, useEffect } from 'react';
import { updateSettings, getSettings } from "../api/useBackData";
import { useAccount, useContractWrite, serialize, deserialize } from 'wagmi';

import { fetchDeploy } from '../api/useBackData';

const CurrentSettings = ({ assets, onSupply, onBorrow }) => {
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [amount, setAmount] = useState('');
    const [health_ratio_notification, sethealth_ratio_notification] = useState('');
    const [health_ratio_execution, sethealth_ratio_execution] = useState('');
    const [target_health_ratio, settarget_health_ratio] = useState('');
    const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(true);

    const { address, isConnected, isDisconnected } = useAccount()

    const handleInputChange = (inputType, value) => {
        switch (inputType) {
            case 'health_ratio_notification':
                sethealth_ratio_notification(value);
                break;
            case 'health_ratio_execution':
                sethealth_ratio_execution(value);
                break;
            case 'target_health_ratio':
                settarget_health_ratio(value);
                break;
            default:
                break;
        }

        const areAllInputsFilled = (
            health_ratio_notification !== '' &&
            health_ratio_execution !== '' &&
            target_health_ratio !== ''
        );

        setIsApplyButtonDisabled(!areAllInputsFilled);
    };


    useEffect(() => {
        if (address !== undefined) {
            getSettings(address).then(data => {
                sethealth_ratio_notification(data.health_ratio_notification);
                sethealth_ratio_execution(data.health_ratio_execution);
                settarget_health_ratio(data.target_health_ratio);
            }).catch(error => {
                console.error('Error fetching settings:', error);
            });
        }
    }, [address]);

    const handleApply = async () => {
        console.log('Applying values:', health_ratio_notification, health_ratio_execution, target_health_ratio);
        try {
            fetchDeploy({ health_ratio_notification, health_ratio_execution, target_health_ratio })

            const data = await updateSettings(address, health_ratio_notification, health_ratio_execution, target_health_ratio);

            sethealth_ratio_notification(data.health_ratio_notification);
            sethealth_ratio_execution(data.health_ratio_execution);
            settarget_health_ratio(data.target_health_ratio);


            console.log('Response from server:', data);
        } catch (error) {
            console.error('Error applying values:', error);
        }
    };

    return (

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: "30px" }}>
        <div className="input-container">
          <label style={{ color: '#bebebe' , marginRight: "20px"}}>Target Health factor</label>
          <div style={{ color: '#bebebe',fontWeight: 'bold' }}>{target_health_ratio} <button >Update</button></div>
          
        </div>
  
        <div className="input-container">
          <label style={{ color: '#bebebe', marginRight: "20px" }}>Notify me in Push Protocol before</label>
          <div style={{ color: '#bebebe', fontWeight: 'bold' }}>{health_ratio_notification}% <button >Update</button></div>
        </div>
  
        <div className="input-container">
          <label style={{ color: '#bebebe' }}>Save me before</label>
          <div style={{ color: '#bebebe',fontWeight: 'bold' }}>{health_ratio_execution}% <button >Update</button></div>
        </div>
      </div>
    );
};

export default CurrentSettings;
