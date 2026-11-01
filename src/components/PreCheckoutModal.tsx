import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShieldCheck, CreditCard, Lock, ArrowRight, Tag, Check, AlertCircle, Info } from 'lucide-react';

interface PreCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSuccessAuthorize: (productIds: string[]) => void;
  onToast: (msg: string) => void;
}

export const PreCheckoutModal: React.FC<PreCheckoutModalProps> = ({
  isOpen,
  onClose,
  products,
  onSuccessAuthorize,
  onToast,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [selectedGateway, setSelectedGateway] = useState<'stripe' | 'paypal' | 'apple_pay'>('stripe');
  const [buyerEmail, setBuyerEmail] = useState('chiara.rossi@esempio.it');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || products.length === 0) return null;

  const rawSubtotal = products.reduce((acc, p) => acc + p.price, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'ANDREINA10' || couponCode.trim().toUpperCase() === 'WELCOME10') {
      setDiscountPercent(10);
      onToast('Coupon 10% applicato con successo!');
    } else {
      onToast('Codice coupon non valido (prova: ANDREINA10)');
    }
  };

  const handleProceedConnection = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onToast('Predisposizione completata. Prodotti aggiunti alla tua Libreria Digitale.');
      onSuccessAuthorize(products.map((p) => p.id));
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#cbdfe9] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[#f1f5f9] flex items-center justify-between bg-[#fcfdfd]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#edf4f8] text-[#2b5374] flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial text-lg font-semibold text-[#0f2338]">
                Cassa & Connessione Pagamento
              </h3>
              <p className="text-[11px] text-[#64748b]">
                Riepilogo ordine digitale · Connettori Stripe / PayPal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Order items list */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#0f2338] uppercase tracking-wider block">
              Contenuti Digitali Selezionati ({products.length})
            </span>
            <div className="divide-y divide-[#f1f5f9] border border-[#e2e8f0] rounded-2xl overflow-hidden bg-[#fafcff]">
              {products.map((item) => (
                <div key={item.id} className="p-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-14 object-cover rounded-lg bg-white border border-[#cbdfe9]/60 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-editorial text-xs font-semibold text-[#0f2338] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#64748b] truncate">{item.format}</p>
                      <span className="text-[10px] text-emerald-700 font-medium">Accesso Immediato</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-semibold text-sm text-[#0f2338] tabular-nums">
                      {item.formattedPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Codice coupon (es: ANDREINA10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#cbd5e1] rounded-xl uppercase tracking-wider focus:outline-none focus:border-[#2b5374]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#edf4f8] hover:bg-[#e1edf5] text-[#2b5374] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Applica
            </button>
          </form>

          {/* Gateway Selector (Ready for backend connection) */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#0f2338] uppercase tracking-wider block">
              Metodo di Pagamento Predisposto
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedGateway('stripe')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedGateway === 'stripe'
                    ? 'border-[#2b5374] bg-[#edf4f8]/60 ring-2 ring-[#2b5374]/20'
                    : 'border-[#e2e8f0] bg-white hover:border-[#cbdfe9]'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#2b5374] mb-2" />
                <div>
                  <span className="text-xs font-semibold text-[#0f2338] block">Stripe Card</span>
                  <span className="text-[10px] text-[#64748b]">Tutte le carte</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedGateway('paypal')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedGateway === 'paypal'
                    ? 'border-[#2b5374] bg-[#edf4f8]/60 ring-2 ring-[#2b5374]/20'
                    : 'border-[#e2e8f0] bg-white hover:border-[#cbdfe9]'
                }`}
              >
                <div className="text-blue-700 font-bold text-xs mb-2">PayPal</div>
                <div>
                  <span className="text-xs font-semibold text-[#0f2338] block">PayPal Express</span>
                  <span className="text-[10px] text-[#64748b]">Conto o rate</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedGateway('apple_pay')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedGateway === 'apple_pay'
                    ? 'border-[#2b5374] bg-[#edf4f8]/60 ring-2 ring-[#2b5374]/20'
                    : 'border-[#e2e8f0] bg-white hover:border-[#cbdfe9]'
                }`}
              >
                <div className="text-slate-900 font-bold text-xs mb-2">Pay</div>
                <div>
                  <span className="text-xs font-semibold text-[#0f2338] block">Apple / Google</span>
                  <span className="text-[10px] text-[#64748b]">1-Click Mobile</span>
                </div>
              </button>
            </div>
          </div>

          {/* Email receipt destination */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#4a5e73]">Email per la consegna dei PDF e ricevuta</label>
            <input
              type="email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[#cbd5e1] rounded-xl focus:outline-none focus:border-[#2b5374]"
            />
          </div>

          {/* Price Breakdown */}
          <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2 text-xs">
            <div className="flex justify-between text-[#64748b]">
              <span>Subtotale contenuti:</span>
              <span className="tabular-nums">€ {rawSubtotal.toFixed(2)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Sconto coupon ({discountPercent}%):</span>
                <span className="tabular-nums">- € {discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-[#64748b]">
              <span>IVA inclusa (aliquota editoriale 4%):</span>
              <span className="tabular-nums">€ {((finalTotal * 0.04) / 1.04).toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-[#e2e8f0] flex justify-between items-center text-sm font-semibold text-[#0f2338]">
              <span>Totale da autorizzare:</span>
              <span className="text-base text-[#2b5374] tabular-nums font-bold">
                € {finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Honest Transparency Notice */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Interfaccia predisposta per il gateway:</strong> questa schermata collega l'ordine ai parametri di checkout (Stripe/PayPal). Cliccando sul pulsante sottostante i contenuti verranno sbloccati nella tua Libreria Personale a scopo dimostrativo senza alcun addebito su conto bancario reale.
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#f1f5f9] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#64748b]">
            <ShieldCheck className="w-4 h-4 text-[#2b5374]" />
            <span>Crittografia SSL 256-bit</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 border border-[#cbd5e1] text-[#4a5e73] hover:text-[#0f2338] text-xs font-semibold rounded-xl hover:bg-[#f8fafc] cursor-pointer"
            >
              Annulla
            </button>
            <button
              onClick={handleProceedConnection}
              disabled={isProcessing}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#2b5374] hover:bg-[#1f3f5a] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-60"
            >
              {isProcessing ? (
                <span>Collegamento in corso...</span>
              ) : (
                <>
                  <span>Autorizza & Sblocca Contenuto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
