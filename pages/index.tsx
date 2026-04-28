import React, { useState } from 'react';
import Head from 'next/head';
import { Shield, Users, Globe, CheckCircle2, Zap, Terminal } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function PrimeBountyPanel() {
  const [formData, setFormData] = useState({
    botQuantity: '20',
    clanId: '2065008505',
    server: 'Brazil',
    botLevel: '12'
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const SERVERS = ['Brazil', 'US', 'India', 'Indonesia', 'Europe'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulando la activación del script en el servidor
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-mono pb-10">
      <Head>
        <title>Prime Bounty | Glory Bot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      {/* Header Estilo Hacker */}
      <header className="bg-gradient-to-b from-green-900/20 to-black p-8 border-b border-green-500/30">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-black tracking-tighter text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
            PRIME BOUNTY
          </h1>
          <p className="text-green-400/70 mt-2 text-xs uppercase tracking-widest">
            Glory Injector v2.0 - No Key Needed
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-8 space-y-6">
        
        {/* Status del Sistema */}
        <div className="bg-slate-900/50 border border-green-500/20 rounded-lg p-4 flex justify-around text-[10px]">
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> SISTEMA ONLINE</div>
          <div className="flex items-center gap-1 text-slate-500"><Terminal className="w-3 h-3"/> BYPASS ACTIVE</div>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
          
          {/* Clan ID (Pre-configurado) */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-green-500">
              <Shield className="w-4 h-4" /> CLAN TARGET ID
            </label>
            <input
              type="number"
              value={formData.clanId}
              readOnly
              className="w-full bg-black border border-green-500/30 rounded-lg px-4 py-3 text-green-400 outline-none"
            />
          </div>

          {/* Cantidad de Bots (Hasta 20) */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Users className="w-4 h-4 text-green-500" /> CANTIDAD DE BOTS (LVL 12)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['5', '10', '15', '20'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, botQuantity: num }))}
                  className={cn(
                    "py-2 rounded border transition-all text-xs font-bold",
                    formData.botQuantity === num
                      ? "bg-green-600 border-green-400 text-black"
                      : "bg-slate-800 border-slate-700 text-slate-400"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Servidor */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Globe className="w-4 h-4 text-green-500" /> REGIÓN / SERVIDOR
            </label>
            <select
              value={formData.server}
              onChange={(e) => setFormData({...formData, server: e.target.value})}
              className="w-full bg-black border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
            >
              {SERVERS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Botón de Activación Directa */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className={cn(
              "w-full font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2",
              status === 'loading' ? "bg-slate-700 text-slate-400" : "bg-green-600 hover:bg-green-500 text-black"
            )}
          >
            <Zap className={cn("w-5 h-5", status === 'loading' && "animate-spin")} />
            {status === 'loading' ? "INYECTANDO BOTS..." : "ACTIVAR PRIME GLORY"}
          </button>

          {/* Mensaje de Éxito */}
          {status === 'success' && (
            <div className="p-4 bg-green-500/10 border border-green-500/40 rounded-lg flex items-center gap-3 animate-bounce">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="font-bold text-green-500 text-sm">¡BOTS EN CAMINO!</h3>
                <p className="text-[10px] text-green-400">Las 20 cuentas se unirán al clan {formData.clanId} en breve.</p>
              </div>
            </div>
          )}
        </form>

        <p className="text-[9px] text-slate-600 text-center uppercase tracking-widest">
          Safe Mode: Encrypted | No Log Policy
        </p>
      </main>
    </div>
  );
}
