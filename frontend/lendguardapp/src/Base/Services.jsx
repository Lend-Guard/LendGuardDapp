import React, { useState } from 'react';

const AssetComponent = ({ assets, onSupply, onBorrow }) => {
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [amount, setAmount] = useState('');
    const [healthRatioNotification, setHealthRatioNotification] = useState('');
    const [healthRatioExecution, setHealthRatioExecution] = useState('');
    const [targetHealthRatio, setTargetHealthRatio] = useState('');
    const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(true);

    const handleInputChange = (inputType, value) => {
        switch (inputType) {
            case 'healthRatioNotification':
                setHealthRatioNotification(value);
                break;
            case 'healthRatioExecution':
                setHealthRatioExecution(value);
                break;
            case 'targetHealthRatio':
                setTargetHealthRatio(value);
                break;
            default:
                break;
        }

        const areAllInputsFilled = (
            healthRatioNotification !== '' &&
            healthRatioExecution !== '' &&
            targetHealthRatio !== ''
        );

        setIsApplyButtonDisabled(!areAllInputsFilled);
    };

    const handleApply = () => {
        console.log('Applying values:', healthRatioNotification, healthRatioExecution, targetHealthRatio);
    };

    const handleSupply = () => {
        if (selectedAsset && amount) {
            onSupply(selectedAsset, amount);
        }
    };

    const handleBorrow = () => {
        if (selectedAsset && amount) {
            onBorrow(selectedAsset, amount);
        }
    };

    return (

        <div>

            <h2 style={{ color: '#bebebe' }}>Fill your Guard settings to deploy</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ color: '#bebebe' }}>Health Ratio Notification:</label>
                        <input
                            type="number"
                            value={healthRatioNotification}
                            onChange={(e) => handleInputChange('healthRatioNotification', e.target.value)}
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
                            value={healthRatioExecution}
                            onChange={(e) => handleInputChange('healthRatioExecution', e.target.value)}
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
                        value={targetHealthRatio}
                        onChange={(e) => handleInputChange('targetHealthRatio', e.target.value)}
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
                    Apply
                </button>
            </div>
            {/* <h2>Assets to Supply/Borrow</h2>
            <select onChange={(e) => setSelectedAsset(e.target.value)}>
                <option value="">Select Asset</option>
                {assets.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                        {asset.name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleSupply}>Supply</button>
            <button onClick={handleBorrow}>Borrow</button> */}

        </div>
    );
};

export default AssetComponent;
