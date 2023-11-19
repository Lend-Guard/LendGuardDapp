import React, { useState, useEffect } from 'react';
import { updateSettings,getSettings } from "../api/useBackData";
import { useAccount, useContractWrite, serialize, deserialize } from 'wagmi';

import { fetchDeploy } from '../api/useBackData';

const AssetComponent = ({ assets, onSupply, onBorrow }) => {
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
            fetchDeploy({health_ratio_notification, health_ratio_execution, target_health_ratio})
            
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

        <div className='intro' style={{marginTop: '30px'}}>

            <h2 style={{ color: '#bebebe' }}>Configure your personal Guard</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div >
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ color: '#bebebe' }}>Health Ratio Notification:</label>
                        <input
                            type="number"
                            value={health_ratio_notification}
                            onChange={(e) => handleInputChange('health_ratio_notification', e.target.value)}
                            style={{
                                marginTop: '10px',
                                width: '80px',
                                padding: '5px',
                                borderRadius: '5px',
                                border: '1px solid linear-gradient(45deg, #ff8a00, #e52e71)',
                                background: '#141414',
                                color: '#bebebe'
                            }}
                        />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ color: '#bebebe' }}>Health Ratio Execution:</label>
                        <input
                            type="number"
                            value={health_ratio_execution}
                            onChange={(e) => handleInputChange('health_ratio_execution', e.target.value)}
                            style={{
                                marginTop: '10px',
                                width: '80px',
                                padding: '5px',
                                borderRadius: '5px',
                                border: '1px solid linear-gradient(45deg, #ff8a00, #e52e71)',
                                background: '#141414',
                                color: '#bebebe'
                            }}
                        />
                    </div >
                    <div style={{ textAlign: 'left' }}>
                    <label style={{ color: '#bebebe' }}>Target Health Ratio:</label>
                    <input
                        type="number"
                        value={target_health_ratio}
                        onChange={(e) => handleInputChange('target_health_ratio', e.target.value)}
                        style={{
                            marginTop: '10px',
                            width: '80px',
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid linear-gradient(45deg, #ff8a00, #e52e71)',
                            background: '#141414',
                            color: '#bebebe'
                        }}
                    />
                    </div>
                </div>
                <button
                    onClick={handleApply}
                    disabled={isApplyButtonDisabled}
                    
                    className='buttonApply'
                >
                    Deploy
                </button>
            </div>
            

        </div>
    );
};

export default AssetComponent;
