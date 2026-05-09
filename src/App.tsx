import { useState } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  Activity, 
  Wallet,
  Zap,
  TrendingUp,
  History,
  FileCode,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockLogs = [
  "[2026-05-09 04:54:12] INFO: Initializing Binance Client...",
  "[2026-05-09 04:54:13] INFO: Successfully connected to Testnet",
  "[2026-05-09 04:54:15] REQ: GET /fapi/v1/balance",
  "[2026-05-09 04:55:01] REQ: POST /fapi/v1/order (MARKET BUY)",
  "[2026-05-09 04:55:02] ORDER: #88291034 FILLED BTCUSDT",
  "[2026-05-09 04:56:45] REQ: POST /fapi/v1/order (LIMIT SELL)",
  "[2026-05-09 04:58:12] INFO: Heartbeat active.",
];

const mockOrders = [
  { id: "88291034", symbol: "BTCUSDT", side: "BUY", type: "MARKET", qty: "0.045", entry: "64,210.50", mark: "64,890.12", pnl: "+$30.58", status: "FILLED" },
  { id: "88291041", symbol: "ETHUSDT", side: "SELL", type: "LIMIT", qty: "1.200", entry: "3,450.20", mark: "3,455.00", pnl: "-$5.76", status: "FILLED" },
  { id: "88291045", symbol: "SOLUSDT", side: "BUY", type: "MARKET", qty: "15.00", entry: "142.10", mark: "144.55", pnl: "+$36.75", status: "FILLED" },
];

export default function App() {
  const [logs] = useState(mockLogs);

  return (
    <div className="min-h-screen bg-[#0A0B10] text-[#E2E8F0] p-6 flex flex-col gap-4 font-sans max-w-7xl mx-auto overflow-hidden">
      {/* Header Section */}
      <header className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></div>
            <h1 className="text-2xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
              SENTINEL <span className="text-emerald-500 font-light opacity-80">Futures CORE</span>
            </h1>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase tracking-widest">
            PROD_VER: 1.0.4 // BINANCE_TESTNET_ACTIVE
          </p>
        </div>
        <div className="flex gap-8 text-right">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-slate-500">API Latency</span>
            <span className="font-mono text-emerald-400">14ms</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-slate-500">Uptime</span>
            <span className="font-mono text-white">142:22:04</span>
          </div>
        </div>
      </header>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-4 grid-rows-6 gap-4 flex-grow h-[calc(100vh-180px)]">
        
        {/* Stat Card: Balance */}
        <div className="col-span-1 row-span-1 bento-card p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <Wallet className="w-3 h-3" />
            <span className="text-[10px] uppercase font-bold tracking-tight">Wallet Balance</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">14,205.42</span>
            <span className="text-xs text-slate-500 font-mono">USDT</span>
          </div>
        </div>

        {/* Stat Card: PNL */}
        <div className="col-span-1 row-span-1 bento-card p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <TrendingUp className="w-3 h-3" />
            <span className="text-[10px] uppercase font-bold tracking-tight">Daily PNL</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-400">+412.08</span>
            <span className="text-[10px] text-emerald-500/70 font-mono italic tracking-tight">+2.9%</span>
          </div>
        </div>

        {/* Security & Config */}
        <div className="col-span-2 row-span-1 bento-card p-4 flex items-center justify-around bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 p-2 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase leading-none font-bold">.env Security</p>
              <p className="text-xs font-semibold text-white">Credentials Loaded</p>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <Zap className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase leading-none font-bold">Memory Mode</p>
              <p className="text-xs font-semibold text-white">Optimized (__slots__)</p>
            </div>
          </div>
        </div>

        {/* Main Grid: Orders Table */}
        <div className="col-span-3 row-span-3 bento-card flex flex-col">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
            <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" /> Active Positions & Orders
            </h3>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">3 LIVE</span>
          </div>
          <div className="overflow-auto flex-1 custom-scrollbar">
            <table className="w-full text-left font-mono text-[11px]">
              <thead className="bg-slate-800/30 text-slate-500 uppercase sticky top-0 z-10">
                <tr>
                  <th className="p-4 font-bold">Symbol</th>
                  <th className="p-4 font-bold text-center">Side</th>
                  <th className="p-4 font-bold text-right">Size</th>
                  <th className="p-4 font-bold text-right">Entry</th>
                  <th className="p-4 font-bold text-right text-emerald-400">PNL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-emerald-500/5 transition-colors group">
                    <td className="p-4 text-white font-bold group-hover:text-emerald-400">{order.symbol}</td>
                    <td className={`p-4 text-center font-bold ${order.side === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {order.side} / {order.side === 'BUY' ? 'LONG' : 'SHORT'}
                    </td>
                    <td className="p-4 text-right text-slate-400">{order.qty}</td>
                    <td className="p-4 text-right text-slate-300">{order.entry}</td>
                    <td className={`p-4 text-right font-bold ${order.pnl.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {order.pnl}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Live Logs */}
        <div className="col-span-1 row-span-5 bento-card flex flex-col bg-slate-950/80">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">bot.log</h3>
            <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
          </div>
          <div className="p-4 font-mono text-[10px] flex flex-col gap-3 overflow-auto flex-1 opacity-80 custom-scrollbar">
            {logs.map((log, i) => (
              <p key={i} className={`
                ${log.includes('SUCCESS') || log.includes('ORDER') ? 'text-emerald-500' : 
                  log.includes('REQ') ? 'text-slate-400' : 'text-slate-500'}
              `}>
                {log}
              </p>
            ))}
            <div className="animate-pulse text-emerald-500">_</div>
          </div>
          <div className="mt-auto p-4 bg-slate-900/50 border-t border-slate-800">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">Logging: DEBUG</span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_4px_#10B981]"></div>
            </div>
            <div className="flex flex-col gap-2">
               <FileMiniItem name="client.py" status="ACTIVE" />
               <FileMiniItem name="orders.py" status="MEMORY_OPT" />
            </div>
          </div>
        </div>

        {/* Bottom: CLI Interface */}
        <div className="col-span-3 row-span-2 bento-card bg-[#050505] p-6 font-mono text-sm flex flex-col">
          <div className="flex items-center gap-2 text-slate-500 mb-4 border-b border-white/5 pb-3">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span className="text-xs uppercase font-bold tracking-widest">Interactive CLI Preview</span>
          </div>
          <div className="flex-1 space-y-3 overflow-auto custom-scrollbar">
            <div className="flex gap-2 text-slate-400">
              <span className="text-emerald-500 font-bold">$</span>
              <span>python cli.py --symbol BTCUSDT --side BUY --qty 0.045</span>
            </div>
            <div className="text-[11px] space-y-1.5 pl-4 border-l border-emerald-500/20">
              <p className="text-emerald-500 opacity-90">[VALIDATION] Success: symbol BTCUSDT is valid.</p>
              <p className="text-emerald-500 opacity-90">[VALIDATION] Success: qty 0.045 within limits.</p>
              <p className="text-slate-500 italic opacity-60">Initiating secure session via core/orders.py...</p>
              <div className="mt-3 bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <p className="text-white text-[10px] mb-1 font-bold">API_RESPONSE_PAYLOAD</p>
                <p className="text-emerald-400/80 leading-relaxed font-mono text-[10px]">
                  {`{ "orderId": 88291034, "status": "FILLED", "execTime": "14ms" }`}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bar */}
      <footer className="mt-auto flex justify-between items-center text-[10px] text-slate-600 font-mono">
        <div className="flex gap-6 uppercase tracking-tighter">
          <span>MODULES: CLIENT.PY | ORDERS.PY | LOGGER.PY</span>
          <span className="hidden md:inline">RUNTIME: PYTHON 3.10+</span>
          <span className="hidden md:inline">ENV: BINANCE_FUTURES_TESTNET</span>
        </div>
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-2 group">
            <div className="w-2 h-2 bg-emerald-500/40 rounded-full group-hover:bg-emerald-500 transition-colors"></div>
            SLOTS_OPTIMIZATION: ENABLED
          </span>
          <span className="text-slate-400 font-bold uppercase tracking-[0.2em] border-l border-slate-800 pl-6">
            Technical Assessment
          </span>
        </div>
      </footer>
    </div>
  );
}

function FileMiniItem({ name, status }: { name: string, status: string }) {
  return (
    <div className="flex justify-between items-center text-[9px] font-mono hover:text-white transition-colors cursor-default">
      <span className="text-slate-400">{name}</span>
      <span className="text-emerald-500 font-bold">[{status}]</span>
    </div>
  );
}
