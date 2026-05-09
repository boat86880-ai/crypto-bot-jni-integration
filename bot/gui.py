import tkinter as tk
from tkinter import messagebox

def prompt_api_credentials():
    """
    Displays a pop-up window to collect Binance API credentials.
    Returns a tuple of (api_key, api_secret) or (None, None) if cancelled.
    """
    credentials = {"key": None, "secret": None}

    def on_submit():
        key = entry_key.get().strip()
        secret = entry_secret.get().strip()
        
        if not key or not secret:
            messagebox.showwarning("Input Error", "Both API Key and API Secret are required to proceed.")
            return
        
        credentials["key"] = key
        credentials["secret"] = secret
        root.destroy()

    # Initialize Window
    root = tk.Tk()
    root.title("Binance Futures Sentinel - Authentication")
    root.geometry("450x220")
    root.resizable(False, False)
    root.configure(padx=20, pady=20)

    # Message Label
    label_msg = tk.Label(root, text="Please enter your Binance API Key & Secret to proceed:", font=("Arial", 10, "bold"))
    label_msg.pack(fill="x", pady=(0, 15))

    # API Key Field
    frame_key = tk.Frame(root)
    frame_key.pack(fill="x", pady=2)
    tk.Label(frame_key, text="API Key:   ", width=10, anchor="w").pack(side="left")
    entry_key = tk.Entry(frame_key, width=35)
    entry_key.pack(side="left", expand=True, fill="x")

    # API Secret Field
    frame_secret = tk.Frame(root)
    frame_secret.pack(fill="x", pady=2)
    tk.Label(frame_secret, text="API Secret:", width=10, anchor="w").pack(side="left")
    entry_secret = tk.Entry(frame_secret, width=35, show="*") # Masked
    entry_secret.pack(side="left", expand=True, fill="x")

    # Submit Button
    btn_submit = tk.Button(
        root, 
        text="Initialize Session", 
        command=on_submit, 
        bg="#10B981", 
        fg="white", 
        font=("Arial", 10, "bold"),
        pady=5
    )
    btn_submit.pack(fill="x", pady=(20, 0))

    # Center window on screen
    root.eval('upper .')
    
    root.mainloop()
    return credentials["key"], credentials["secret"]
