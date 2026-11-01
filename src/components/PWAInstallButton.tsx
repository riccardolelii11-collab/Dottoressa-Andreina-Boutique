import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share, X, Smartphone, PlusSquare } from 'lucide-react';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-2 rounded-xl bg-[#2b5374] text-white font-medium hover:bg-[#1f3f5a] transition-all cursor-pointer shadow-xs ${
          compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs sm:text-sm w-full justify-center'
        }`}
        title="Installa Andreina Boutique sul tuo dispositivo"
      >
        <Download className="w-3.5 h-3.5 shrink-0" />
        <span>Installa App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-2 rounded-xl border border-[#cbdfe9] text-[#2b5374] bg-[#edf4f8] hover:bg-[#e1edf5] font-medium transition-all cursor-pointer ${
            compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs sm:text-sm w-full justify-center'
          }`}
          title="Aggiungi alla schermata Home di iPhone/iPad"
        >
          <Smartphone className="w-3.5 h-3.5 shrink-0" />
          <span>Aggiungi a Home</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-[#cbd5e1] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#0f2338]">
                  <Smartphone className="w-5 h-5 text-[#2b5374]" />
                  <h3 className="font-editorial text-base font-semibold">Installa su iPhone / iPad</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-[#4a5e73]">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#f8fafc] border border-slate-100">
                  <div className="w-6 h-6 rounded-lg bg-[#edf4f8] text-[#2b5374] flex items-center justify-center shrink-0 mt-0.5">
                    <Share className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#0f2338] block">1. Tocca Condividi</span>
                    <span>Tocca il pulsante di condivisione in basso sulla barra di Safari.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#f8fafc] border border-slate-100">
                  <div className="w-6 h-6 rounded-lg bg-[#edf4f8] text-[#2b5374] flex items-center justify-center shrink-0 mt-0.5">
                    <PlusSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#0f2338] block">2. Aggiungi alla schermata Home</span>
                    <span>Scorri verso il basso e seleziona "Aggiungi alla schermata Home".</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-[#2b5374] text-white text-xs font-semibold hover:bg-[#1f3f5a] cursor-pointer"
              >
                Ho Capito
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Generic fallback trigger button when browser hasn't fired event or on desktop browsers
  return (
    <button
      onClick={() => {
        alert("Per installare Andreina Boutique come App:\n• Su Chrome/Edge: clicca l'icona 'Installa' nella barra degli indirizzi in alto.\n• Su Safari (iOS): tocca Condividi e poi 'Aggiungi a schermata Home'.");
      }}
      className={`flex items-center gap-2 rounded-xl border border-[#cbdfe9] text-[#2b5374] bg-[#edf4f8]/70 hover:bg-[#edf4f8] font-medium transition-all cursor-pointer ${
        compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs sm:text-sm w-full justify-center'
      }`}
    >
      <Download className="w-3.5 h-3.5 shrink-0" />
      <span>Installa Web App</span>
    </button>
  );
};
