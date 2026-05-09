import os
import logging
from typing import Dict, Any
from binance.client import Client
from binance.exceptions import BinanceAPIException
from bot.orders import TradeOrder, OrderType

class BinanceFuturesClient:
    def __init__(self, api_key: str, api_secret: str):
        self.logger = logging.getLogger(__name__)
        try:
            # Connect to Testnet
            self.client = Client(api_key, api_secret, testnet=True)
            self.logger.info("Successfully connected to Binance Futures Testnet")
        except Exception as e:
            self.logger.error(f"Failed to connect to Binance: {str(e)}")
            raise

    def get_account_balance(self, asset: str = "USDT") -> float:
        try:
            balances = self.client.futures_account_balance()
            for balance in balances:
                if balance['asset'] == asset:
                    return float(balance['balance'])
            return 0.0
        except BinanceAPIException as e:
            self.logger.error(f"API Error fetching balance: {e.message}")
            return 0.0

    def execute_order(self, order: TradeOrder) -> Dict[str, Any]:
        self.logger.info(f"Executing {order.order_type} {order.side} order for {order.symbol}")
        
        params = {
            "symbol": order.symbol,
            "side": order.side,
            "type": order.order_type,
            "quantity": order.quantity,
        }

        if order.order_type == OrderType.LIMIT:
            params["price"] = order.price
            params["timeInForce"] = "GTC" # Good Till Cancelled

        try:
            response = self.client.futures_create_order(**params)
            self.logger.info(f"Order executed successfully: {response.get('orderId')}")
            return response
        except BinanceAPIException as e:
            self.logger.error(f"Failed to execute order: {e.message}")
            raise
        except Exception as e:
            self.logger.error(f"Unexpected error: {str(e)}")
            raise
