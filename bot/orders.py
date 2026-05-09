from enum import Enum
from typing import Optional

class Side(str, Enum):
    BUY = "BUY"
    SELL = "SELL"

class OrderType(str, Enum):
    MARKET = "MARKET"
    LIMIT = "LIMIT"

class TradeOrder:
    """
    Memory-optimized class for handling trade orders.
    Uses __slots__ to minimize memory footprint in high-frequency scenarios.
    """
    __slots__ = ['symbol', 'side', 'order_type', 'quantity', 'price', 'timestamp']

    def __init__(
        self, 
        symbol: str, 
        side: Side, 
        order_type: OrderType, 
        quantity: float, 
        price: Optional[float] = None,
        timestamp: Optional[int] = None
    ):
        self.validate_symbol(symbol)
        self.validate_side(side)
        self.validate_type(order_type)
        self.validate_quantity(quantity)
        
        if order_type == OrderType.LIMIT and price is None:
            raise ValueError("Price is required for LIMIT orders")

        self.symbol = symbol.upper()
        self.side = side
        self.order_type = order_type
        self.quantity = float(quantity)
        self.price = float(price) if price else None
        self.timestamp = timestamp

    @staticmethod
    def validate_symbol(symbol: str):
        if not symbol or not isinstance(symbol, str):
            raise ValueError("Invalid symbol format")
        # Basic validation: Binance USDT futures usually end with USDT
        if not symbol.upper().endswith("USDT"):
            raise ValueError("Symbol must be a valid USDT pair (e.g., BTCUSDT)")

    @staticmethod
    def validate_side(side: Side):
        if side not in Side:
            raise ValueError(f"Invalid side: {side}. Must be BUY or SELL.")

    @staticmethod
    def validate_type(order_type: OrderType):
        if order_type not in OrderType:
            raise ValueError(f"Invalid type: {order_type}. Must be MARKET or LIMIT.")

    @staticmethod
    def validate_quantity(quantity: float):
        if quantity <= 0:
            raise ValueError("Quantity must be greater than zero.")

    def __repr__(self):
        return (f"<TradeOrder {self.side} {self.quantity} {self.symbol} @ "
                f"{self.price if self.price else 'MARKET'}>")
