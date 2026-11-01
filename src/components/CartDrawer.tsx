import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check } from 'lucide-react';
import { ProductCoverPlaceholder } from './ProductCoverPlaceholder';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onNavigateToBoutique: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onCheckout,
  onNavigateToBoutique,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountMultiplier = appliedPromo === 'BENESSERE10' ? 0.1 : 0;
  const discountAmount = rawSubtotal * discountMultiplier;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BENESSERE10') {
      setAppliedPromo('BENESSERE10');
      setPromoError('');
    } else {
      setPromoError('Codice non valido. Prova con BENESSERE10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#0f2338]/40 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md liquid-glass-azure flex flex-col border-l border-white/80 shadow-[0_0_60px_rgba(15,35,56,0.18)]">
          
          {/* Header with Frosted Treatment */}
          <div className="px-6 py-5 border-b border-[#cbd5e1]/50 bg-white/40 backdrop-blur-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#edf4f8] text-[#2b5374] flex items-center justify-center border border-white/80 shadow-xs">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="font-editorial text-xl font-semibold text-[#0f2338]">Il Tuo Carrello</h2>
              <span className="text-xs text-[#64748b] tabular-nums font-medium">({items.length} articoli)</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#64748b] hover:text-[#0f2338] glass-pill-control rounded-full transition-all cursor-pointer"
              aria-label="Chiudi carrello"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#94a3b8] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-lg font-semibold text-[#0f2338]">Il carrello è vuoto</h3>
                <p className="text-xs text-[#64748b] mt-1 max-w-xs">
                  Scopri gli ebook, le masterclass video e le guide della Dott.ssa Andreina.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToBoutique();
                  }}
                  className="mt-6 px-5 py-2.5 bg-[#2b5374] text-white text-xs font-semibold rounded-lg hover:bg-[#1f3f5a] transition-colors cursor-pointer"
                >
                  Esplora la Boutique
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {items.map((item) => (
                  <div 
                    key={item.product.id}
                    className="p-3.5 bg-white/75 backdrop-blur-xs rounded-xl border border-white/80 shadow-xs flex gap-3.5 items-center justify-between transition-all hover:bg-white/95"
                  >
                    {item.product.coverImage ? (
                      <img
                        src={item.product.coverImage}
                        alt={item.product.title}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover bg-white shrink-0 border border-white/90 shadow-2xs"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg shrink-0 overflow-hidden border border-white/90 shadow-2xs">
                        <ProductCoverPlaceholder product={item.product} compact aspectRatio="square" />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0 pr-2">
                      <span className="text-[10px] font-semibold text-[#2b5374] uppercase tracking-wide block">
                        {item.product.categoryLabel}
                      </span>
                      <h4 className="text-xs font-semibold text-[#0f2338] truncate mt-0.5">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-[#64748b] mt-0.5">
                        Accesso a vita · Licenza singola
                      </p>
                      <div className="text-xs font-semibold text-[#0f2338] mt-1 tabular-nums">
                        {item.product.isFree ? 'Gratuito' : item.product.formattedPrice}
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-2 text-[#94a3b8] hover:text-red-600 hover:bg-red-50/80 rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Rimuovi dal carrello"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Promo Code Input */}
                <div className="pt-2">
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Codice promo (es. BENESSERE10)"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white/90 border border-[#cbd5e1]/80 rounded-xl focus:outline-none focus:border-[#2b5374]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 text-xs font-medium text-[#2b5374] glass-pill-control rounded-xl transition-all cursor-pointer"
                    >
                      Applica
                    </button>
                  </form>
                  {appliedPromo && (
                    <p className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1.5 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>Codice {appliedPromo} applicato con successo (-10%)</span>
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-red-600 mt-1.5">{promoError}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer with Subtotal & Demo Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#cbd5e1]/50 bg-white/60 backdrop-blur-md space-y-4 shadow-[0_-4px_16px_rgba(15,35,56,0.03)]">
              <div className="space-y-1.5 text-xs text-[#64748b]">
                <div className="flex justify-between">
                  <span>Subtotale</span>
                  <span className="font-medium text-[#0f2338] tabular-nums">€ {rawSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Sconto promozionale</span>
                    <span className="tabular-nums">- € {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#cbd5e1]/50 flex justify-between text-sm font-semibold text-[#0f2338]">
                  <span>Totale da corrispondere</span>
                  <span className="text-base text-[#2b5374] tabular-nums">€ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3.5 px-4 bg-[#2b5374] hover:bg-[#1f3f5a] text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer border border-white/20"
              >
                <span>Procedi all’Accesso Digitale</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#8696a4]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Download e streaming immediati dopo la conferma</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
