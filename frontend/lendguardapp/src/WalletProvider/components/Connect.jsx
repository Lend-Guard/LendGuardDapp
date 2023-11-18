import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";

import { useAccount } from "wagmi";


const Connect = () => {

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className="connectBtn" style={{height: "40px"}}>
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                openChainModal()
              }

              return (
                <div style={{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center', justifyContent: "center" }}>
                  <button
                    onClick={openChainModal}
                    className="walletAddr"
                    type="button"
                    style={{height: "40px", marginRight: "10px", alignItems: 'center'}}
                  >
                    {chain.hasIcon && (
                      <div

                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 20, height: 20 }}
                          />

                        )}
                        {chain.name}
                      </div>
                    )}
                  </button>


                  <button onClick={openAccountModal} type="button" className="walletAddr" style={{height: "40px", alignItems: 'center'}}>
                    {account.displayName}
                  </button>

                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};


export { Connect };