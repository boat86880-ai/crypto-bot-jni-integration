import logging
import sys

def setup_logging(log_file: str = "bot.log"):
    """
    Configures logging to output to both console and a file.
    """
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler(sys.stdout)
        ]
    )
    
    # Silence third-party logs if they are too chatty
    logging.getLogger("urllib3").setLevel(logging.WARNING)
    logging.getLogger("binance").setLevel(logging.WARNING)

    logger = logging.getLogger("trading_bot")
    logger.info("Logging initialized.")
    return logger
