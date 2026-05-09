import os
import argparse
import sys
from dotenv import load_dotenv
from bot.logging_config import setup_logging
from bot.client import BinanceFuturesClient
from bot.orders import TradeOrder, Side, OrderType

def main():
    # Load environment variables
    load_dotenv()
    
    # Setup logging
    logger = setup_logging()

    parser = argparse.ArgumentParser(description="Binance Futures Trading Bot CLI")
    
    # Operations
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Balance Command
    balance_parser = subparsers.add_parser("balance", help="Check account balance")
    balance_parser.add_argument("--asset", default="USDT", help="Asset to check (default: USDT)")

    # Trade Command
    trade_parser = subparsers.add_parser("trade", help="Place a trade order")
    trade_parser.add_argument("--symbol", required=True, help="Trading pair (e.g., BTCUSDT)")
    trade_parser.add_argument("--side", required=True, choices=["BUY", "SELL"], help="Order side")
    trade_parser.add_argument("--type", required=True, choices=["MARKET", "LIMIT"], help="Order type")
    trade_parser.add_argument("--qty", required=True, type=float, help="Quantity to trade")
    trade_parser.add_argument("--price", type=float, help="Price for LIMIT orders")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(0)

    # SECURE: API Keys from environment
    api_key = os.getenv("BINANCE_API_KEY")
    api_secret = os.getenv("BINANCE_API_SECRET")

    # FALLBACK: If keys are missing, prompt via GUI
    if not api_key or not api_secret:
        logger.info("API Keys missing in .env. Attempting GUI prompt...")
        try:
            from bot.gui import prompt_api_credentials
            api_key, api_secret = prompt_api_credentials()
        except Exception as e:
            logger.error(f"GUI Prompt failed or was cancelled: {e}")
            print("\nError: API keys not found and GUI prompt unavailable.")
            sys.exit(1)

    if not api_key or not api_secret:
        logger.error("API Keys not provided.")
        print("\nError: BINANCE_API_KEY and BINANCE_API_SECRET are required.")
        sys.exit(1)

    try:
        client = BinanceFuturesClient(api_key, api_secret)

        if args.command == "balance":
            balance = client.get_account_balance(args.asset)
            print(f"\nAccount Balance: {balance} {args.asset}")

        elif args.command == "trade":
            order = TradeOrder(
                symbol=args.symbol,
                side=Side(args.side),
                order_type=OrderType(args.type),
                quantity=args.qty,
                price=args.price
            )
            
            print(f"\nPlacing Order: {order}")
            response = client.execute_order(order)
            print(f"Success! Order ID: {response.get('orderId')}")

    except Exception as e:
        logger.error(f"CLI Error: {str(e)}")
        print(f"\n[ERROR] {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
