from typing import Dict, List, Optional, Any

import requests


class DebankConnector:

    def __init__(self, api_key: str) -> None:
        self.__api_key: str = api_key
        self._url: str = 'https://pro-openapi.debank.com'

    def _make_request(self,
                      method: str, endpoint: str,
                      headers: Optional[Dict[str, str]] = None,
                      kwargs: Optional[Dict[str, str]] = None) -> Dict[str, Dict]:
        url = self._url + endpoint

        if headers is None:
            headers = {}
        headers['AccessKey'] = self.__api_key

        if kwargs is None:
            kwargs = {}

        if method == 'GET':
            response = requests.get(url, params=kwargs, headers=headers, timeout=10)
        elif method == 'POST':
            response = requests.post(url, data=kwargs, headers=headers, timeout=10)
        else:
            return None

        if response.status_code != 200:
            print(response.status_code)
            print(response.text)
            print(response.json())
            return None
        return response.json()

    def get_user_portfolio(self, user_id: str, chains: Optional[List[str]] = None):
        """
        Get user portfolio

        Args:
            user_id (str): required, user id
            chains (Optional[List[str]]): optional, list of chain id, eg: eth, bsc, xdai

        Returns:
            List[str]:
        """
        kwargs: Dict = {'id': user_id}
        if chains is not None:
            kwargs['chains'] = chains
        endpoint: str = '/v1/user/all_complex_protocol_list'
        return self._make_request(method='GET', endpoint=endpoint, kwargs=kwargs)

    def get_protocol_info(self, protocol_id: str) -> Dict[str, Any]:
        """
        Get protocol information

        Args:
            protocol_id (str):  required, protocol id. For instance, aave3

        Returns:
            Dict[str, Any]:
            {
                'id': 'aave3',
                'chain': 'eth',
                'name': 'Aave V2',
                'site_url': 'https://aave.com/',
                'logo_url': 'https://static.debank.com/image/project/logo_url/aave3/84ce.png',
                'has_supported_portfolio': True,
                'tvl': 680400.8228460302,
            }
        """
        kwargs: Dict = {'id': protocol_id}
        endpoint: str = '/v1/protocol'
        return self._make_request(method='GET', endpoint=endpoint, kwargs=kwargs)
    
    def get_chain_info(self, chain_id: str) -> Dict[str, Any]:
        """
        Get chain information

        Args:
            chain_id (str): required, chain id. For instance, eth

        Returns:
            Dict[str, Any]:
            {
                'id': 'eth',
                'name': 'Ethereum',
                'native_token_id': 'eth',
                'wrapped_token_id': 'weth',
                'logo_url': 'https://static.debank.com/image/chain/logo_url/eth/84ce.png',
                'is_supported_pre_exec': True,
            }
        """
        kwargs: Dict = {'id': chain_id}
        endpoint: str = '/v1/chain'
        return self._make_request(method='GET', endpoint=endpoint, kwargs=kwargs)
    
    def get_token_info(self, token_address: str, chain_id: str) -> Dict[str, Any]:
        """
        Get token information

        Args:
            token_address (str): The address of the token contract or a native token id (eth, matic, bsc).
            chain_id (str): required, chain id. For instance, eth

        Returns:
            Dict[str, Any]:
            {
                "id": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                "chain": "eth",
                "name": "Tether USD",
                "symbol": "USDT",
                "display_symbol": null,
                "optimized_symbol": "USDT",
                "decimals": 6,
                "logo_url": "https://static.debank.com/image/eth_token/logo_url/0xdac17f958d2ee523a2206206994597c13d831ec7/66eadee7b7bb16b75e02b570ab8d5c01.png",
                "protocol_id": "",
                "price": 1,
                "is_verified": true,
                "is_core": true,
                "is_wallet": true,
                "time_at": 1511829681
            }
        """
        kwargs: Dict = {'id': token_address, 'chain': chain_id}
        endpoint: str = '/v1/token'
        return self._make_request(method='GET', endpoint=endpoint, kwargs=kwargs)

    def get_user_protocol_position(self, user_id: str, protocol_id: str) -> Dict[str, Any]:
        """
        Get user protocol position

        Args:
            user_id (str): required, user address
            protocol_id (str): required, protocol id

        Returns:
            Dict[str, Any]:
            {
                "id": "bsc_bdollar",
                "chain": "bsc",
                "name": "bDollar",
                "site_url": "https://bdollar.fi",
                "logo_url": "https://static.debank.com/image/project/logo_url/bsc_bdollar/1935d77ab964b7e65acfadb63080af24.png",
                "has_supported_portfolio": true,
                "tvl": 223306.13569669172,
                "portfolio_item_list": [
                    {
                    "stats": {
                        "asset_usd_value": 0,
                        "debt_usd_value": 0,
                        "net_usd_value": 0
                    },
                    "update_at": 1639382999.514337,
                    "name": "Farming",
                    "detail_types": ["common"],
                    "detail": {
                        "supply_token_list": [
                        {
                            "id": "0x0d9319565be7f53cefe84ad201be3f40feae2740",
                            "chain": "bsc",
                            "name": "bDollar Share",
                            "symbol": "sBDO",
                            "display_symbol": null,
                            "optimized_symbol": "sBDO",
                            "decimals": 18,
                            "logo_url": "https://static.debank.com/image/bsc_token/logo_url/0x0d9319565be7f53cefe84ad201be3f40feae2740/2e79004660a090bcad21432037b16e89.png",
                            "protocol_id": "bsc_bdollar",
                            "price": 0,
                            "is_verified": true,
                            "is_core": null,
                            "is_wallet": false,
                            "time_at": 1609152424,
                            "amount": 0.01
                        }
                        ],
                        "reward_token_list": [
                        {
                            "id": "0x190b589cf9fb8ddeabbfeae36a813ffb2a702454",
                            "chain": "bsc",
                            "name": "bDollar",
                            "symbol": "BDO",
                            "display_symbol": null,
                            "optimized_symbol": "BDO",
                            "decimals": 18,
                            "logo_url": "https://static.debank.com/image/bsc_token/logo_url/0x190b589cf9fb8ddeabbfeae36a813ffb2a702454/316bf18e540d27f269b2260931a5fcdc.png",
                            "protocol_id": "bsc_bdollar",
                            "price": 0,
                            "is_verified": true,
                            "is_core": true,
                            "is_wallet": true,
                            "time_at": 1608808146,
                            "amount": 4.023217983610902
                        }
                        ]
                    },
                    "proxy_detail": {}
                    },
                    {
                    "stats": {
                        "asset_usd_value": 6.914216886417625,
                        "debt_usd_value": 0,
                        "net_usd_value": 6.914216886417625
                    },
                    "update_at": 1639382999.565123,
                    "name": "Farming",
                    "detail_types": ["common"],
                    "detail": {
                        "supply_token_list": [
                        {
                            "id": "0x190b589cf9fb8ddeabbfeae36a813ffb2a702454",
                            "chain": "bsc",
                            "name": "bDollar",
                            "symbol": "BDO",
                            "display_symbol": null,
                            "optimized_symbol": "BDO",
                            "decimals": 18,
                            "logo_url": "https://static.debank.com/image/bsc_token/logo_url/0x190b589cf9fb8ddeabbfeae36a813ffb2a702454/316bf18e540d27f269b2260931a5fcdc.png",
                            "protocol_id": "bsc_bdollar",
                            "price": 0,
                            "is_verified": true,
                            "is_core": true,
                            "is_wallet": true,
                            "time_at": 1608808146,
                            "amount": 438.1464937799965
                        },
                        {
                            "id": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
                            "chain": "bsc",
                            "name": "BUSD Token",
                            "symbol": "BUSD",
                            "display_symbol": null,
                            "optimized_symbol": "BUSD",
                            "decimals": 18,
                            "logo_url": "https://static.debank.com/image/bsc_token/logo_url/0xe9e7cea3dedca5984780bafc599bd69add087d56/f0825e572298822e7689fe81150a195d.png",
                            "protocol_id": "",
                            "price": 1,
                            "is_verified": true,
                            "is_core": true,
                            "is_wallet": true,
                            "time_at": 1599044503,
                            "amount": 6.914216886417625
                        }
                        ],
                        "reward_token_list": [
                        {
                            "id": "0x0d9319565be7f53cefe84ad201be3f40feae2740",
                            "chain": "bsc",
                            "name": "bDollar Share",
                            "symbol": "sBDO",
                            "display_symbol": null,
                            "optimized_symbol": "sBDO",
                            "decimals": 18,
                            "logo_url": "https://static.debank.com/image/bsc_token/logo_url/0x0d9319565be7f53cefe84ad201be3f40feae2740/2e79004660a090bcad21432037b16e89.png",
                            "protocol_id": "bsc_bdollar",
                            "price": 0,
                            "is_verified": true,
                            "is_core": null,
                            "is_wallet": false,
                            "time_at": 1609152424,
                            "amount": 0.025524980670816256
                        }
                        ]
                    },
                    "proxy_detail": {}
                    }
                ]
            }
        """
        kwargs: Dict = {'id': user_id, 'protocol_id': protocol_id}
        endpoint: str = '/v1/user/protocol'
        return self._make_request(method='GET', endpoint=endpoint, kwargs=kwargs)
