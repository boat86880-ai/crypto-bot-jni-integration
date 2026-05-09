# Binance Futures Sentinel 🛡️

A professional, high-performance Python trading bot designed for the **Binance Futures Testnet**. Built with high-frequency readiness in mind using memory-optimized data structures.

## 🚀 Key Features

- **Memory Optimized**: Uses Python `__slots__` in order classes to reduce memory overhead and improve attribute access speed.
- **Strict Validation**: Robust input cleaning for symbols, trade sides, and order types.
- **Production Logging**: Detailed audit trails for every API request, response, and error stored in `bot.log`.
- **Modular Architecture**: Clean separation between API client, business logic, and CLI.
- **Secure Configuration**: Environment-based secret management with a **GUI Fallback Prompt** if `.env` keys are missing.

## 🛠️ Project Structure

```text
trading_bot/
├── bot/                   # Core business logic
│   ├── __init__.py
│   ├── client.py          # Binance API wrapper (Testnet enabled)
│   ├── gui.py             # Tkinter-based credential prompt
│   ├── orders.py          # Memory-optimized TradeOrder class
│   └── logging_config.py  # Centralized logging logic
├── .env.example           # template for your secrets
├── cli.py                 # Bot CLI (argparse entry point)
├── README.md              # You are here
└── requirements.txt       # Project dependencies
```

## ⚙️ Setup Instructions

### 1. Prerequisites
- Python 3.8+
- Binance Testnet API Keys ([Get them here](https://testnet.binancefuture.com/))

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd trading_bot

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Configuration
Copy the `.env.example` to `.env` and fill in your Testnet credentials:
```bash
cp .env.example .env
```
*Note: Never commit your `.env` file to version control!*

## 📖 Usage

### Check Balance
```bash
python cli.py balance --asset USDT
```

### Place Marker Order
```bash
python cli.py trade --symbol BTCUSDT --side BUY --type MARKET --qty 0.001
```

### Place Limit Order
```bash
python cli.py trade --symbol BTCUSDT --side SELL --type LIMIT --qty 0.001 --price 65000
```

## 🛡️ Security & Secret Protection

This project is built with **Zero-Leak Security** principles:

-   **Secret Isolation**: Your `GEMINI_API_KEY` is strictly managed on the server-side (`server.ts`). It is **never** bundled into the frontend or exposed to the browser.
-   **Full-Stack Proxying**: All AI requests are proxied through a secure Express backend. The client never sees your Google API keys.
-   **GitHub Readiness**: The `.gitignore` is pre-configured to block `.env` and sensitive logs. You can safely push the codebase to GitHub without exposing your credentials.
-   **Secure Handling**: Even for Binance keys, the `cli.py` uses localized `.env` loading and a temporary GUI fallback that doesn't persist secrets in plain text.

**Always ensure your `.env` file is in the `.gitignore` before pushing.**

## ⚖️ License
MIT License. For educational and technical assessment purposes only.
