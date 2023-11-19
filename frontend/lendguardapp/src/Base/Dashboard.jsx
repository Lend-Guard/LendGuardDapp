import React from 'react';
import CurrentSettings from "./CurrentSettings"

const DataTable = ({ dataArray, handleSupply, handleApprove }) => {
    const renderTableRows = () => {
        return dataArray.map((data, index) => (
            <tr style={{ backgroundColor: "#252525" }} key={index} className='data_asset'>
                <td>{data.icon}</td>
                <td style={{ color: "rgb(190, 190, 190)" }}>{data.asset}</td>
                <td style={{ color: "rgb(190, 190, 190)" }}><input type="text" placeholder="Enter amount" id={`supply${index}`} /></td>
                <td><input type="text" placeholder="Enter amount" id={`approve${index}`} /></td>
                <td><button className='buttonApply' style={{ width: '80px' }} onClick={() => handleSupply(index)}>Supply</button></td>
                <td><button className='buttonApply' style={{ width: '80px' }} onClick={() => handleApprove(index)}>Approve</button></td>
            </tr>
        ));
    };

    return (
        <table className="data-table">
            <thead>
                <tr style={{ backgroundColor: "#252525" }}>
                    <th></th>
                    <th>Asset</th>
                    <th>Supply</th>
                    <th>Approve</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
        </table>
    );
};

const DataTableBorrow = ({ dataArray, handleBorrow }) => {
    const renderTableRows = () => {
        return dataArray.map((data, index) => (
            <tr style={{ backgroundColor: "#252525" }} key={index} className='data_asset'>
                <td>{data.icon}</td>
                <td style={{ color: "rgb(190, 190, 190)" }}>{data.asset}</td>
                <td><input type="text" placeholder="Enter amount" id={`borrow${index}`} /></td>
                <td><button className='buttonApply' style={{ width: '80px' }} onClick={() => handleBorrow(index)}>Borrow</button></td>
            </tr>
        ));
    };

    return (
        <table className="data-table">
            <thead>
                <tr style={{ backgroundColor: "#252525" }}>
                    <th></th>
                    <th>Asset</th>
                    <th>Borrow</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
        </table>
    );
};

class Dashboard extends React.Component {


   

    
    constructor(props) {
        super(props);

        this.state = {
            dataArray: [
                { asset: "WETH", icon: "", decimal: 18, address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4" },
                { asset: "ETH", icon: "", decimal: 18, address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8" },
                { asset: "ARB", icon: "", decimal: 18, address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f" },
            ],
            dataArrayBorrow: [
                { asset: "wstETH", icon: "", decimal: 18, address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4" },
                { asset: "ETH", icon: "", decimal: 18, address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8" },
                { asset: "WBTC", icon: "", decimal: 18, address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f" },
            ],
        };
    }




    handleSupply = (index) => {
        const supplyValue = document.getElementById(`supply${index}`).value;
        const address = this.state.dataArray[index].address;

        console.log(`Supply for row ${index}: ${supplyValue}`);
        console.log(`Address for row ${index}: ${address}`);
    }

    handleApprove(index) {

        const approveValue = document.getElementById(`approve${index}`).value;
        console.log(`Approve for row ${index}: ${approveValue}`);

    }

    handleBorrow(index) {
        const borrowValue = document.getElementById(`borrow${index}`).value;
        console.log(`Borrow for row ${index}: ${borrowValue}`);
    };

    render() {
        return (

            <div className='intro'>
                <h1 style={{ color: "rgb(190,190,190)", marginTop: "30px" }}>Dashboard</h1>
                <CurrentSettings/>
                <div>
                    <div className="table-container" style={{ marginTop: "30px" }}>
                        <div className="table">
                            <DataTable
                                dataArray={this.state.dataArray}
                                handleSupply={this.handleSupply}
                                handleApprove={this.handleApprove}
                            />
                        </div>
                        <div className="table">
                            <DataTableBorrow
                                dataArray={this.state.dataArrayBorrow}
                                handleBorrow={this.handleBorrow}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;