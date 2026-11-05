import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { 
  ArrowLeft, 
  BookOpen, 
  Check, 
  ShoppingBag, 
  CreditCard, 
  ShieldCheck, 
  ExternalLink, 
  Share2 
} from 'lucide-react';
import { ProductCoverPlaceholder } from '../components/ProductCoverPlaceholder';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onDirectBuy: (product: Product) => void;
  isPurchased: boolean;
  onOpenPdfReader: (product: Product) => void;
  onSelectProduct: (productId: string) => void;
  allProducts: Product[];
  onToast: (msg: string) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onDirectBuy,
  isPurchased,
  onOpenPdfReader,
  onSelectProduct,
  allProducts,
  onToast,
  cartCount = 0,
  onOpenCart,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'chapters'>('content');

  // Apple iOS & Touch edge-swipe back gesture listener
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      // Detect touch initiating from the left edge of the screen (within 45px)
      if (touch.clientX <= 45) {
        touchStartRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          time: Date.now()
        };
      } else {
        touchStartRef.current = null;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      // If vertical scroll dominates early, cancel swipe
      if (Math.abs(deltaY) > 40 && deltaX < 30) {
        touchStartRef.current = null;
        setSwipeOffset(0);
        return;
      }

      if (deltaX > 0) {
        setSwipeOffset(Math.min(deltaX, 90));
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const duration = Date.now() - touchStartRef.current.time;

      // Swiped right more than 60px or flicked right with minimal vertical movement
      if (deltaX > 60 || (deltaX > 35 && duration < 250 && Math.abs(deltaY) < 30)) {
        onBack();
      }

      touchStartRef.current = null;
      setSwipeOffset(0);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onBack]);

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    setIsAddedToCart(false);
  }, [product.id]);

  const handleAddToCartWithFeedback = () => {
    onAddToCart(product);
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1800);
  };

  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onToast('Link del libro copiato negli appunti!');
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-8 font-sans antialiased text-brand-slate space-y-6 md:space-y-8 pb-32 relative">
      
      {/* Floating iOS Edge-Swipe Back Feedback Indicator */}
      {swipeOffset > 15 && (
        <aside 
          aria-hidden="true"
          className="fixed left-0 top-1/2 -translate-y-1/2 z-50 pointer-events-none transition-transform"
          style={{ transform: `translateY(-50%) translateX(${Math.min(swipeOffset * 0.45, 24)}px)` }}
        >
          <div className="w-10 h-10 rounded-full bg-slate-900/85 backdrop-blur-md text-white shadow-xl flex items-center justify-center border border-white/20">
            <ArrowLeft className="w-5 h-5 text-white" />
          </div>
        </aside>
      )}
      
      {/* 1. Top Bar: Back Action + Brand Identifier + Cart Icon with Real Count */}
      <header className="flex items-center justify-between pb-4 border-b border-brand-teal/20" data-purpose="detail-header">
        <button
          onClick={onBack}
          type="button"
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-teal hover:text-brand-tealDark transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna ai libri</span>
        </button>

        {/* Center Monogram (visible on mobile to anchor the brand) */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-brand-teal flex items-center justify-center bg-white shadow-xs">
            <span className="font-serif font-bold text-brand-slate text-sm">A</span>
          </div>
          <span className="font-serif text-sm font-semibold text-brand-slate hidden sm:inline">
            Dott.ssa Andreina Olivieri
          </span>
        </div>

        {/* Right actions: Share + Cart */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            type="button"
            className="p-2 text-slate-500 hover:text-brand-slate bg-white rounded-full border border-slate-200/80 transition-colors shadow-2xs cursor-pointer"
            title="Condividi scheda libro"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button 
            type="button"
            onClick={onOpenCart}
            aria-label="Carrello" 
            className="relative p-2 rounded-full bg-white hover:bg-slate-50 border border-brand-teal/30 text-brand-slate transition-colors shadow-2xs cursor-pointer"
          >
            <svg className="w-5 h-5 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13m-10.5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-teal text-white text-[10px] font-semibold flex items-center justify-center rounded-full leading-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 2. Main Framed Product Showcase ("Incorniciato e Proporzionato") */}
      <article className="editorial-card bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-brand-teal/20 shadow-xs space-y-6 md:space-y-0 md:grid md:grid-cols-12 md:gap-8 items-start">
        
        {/* Left Column: Framed Book Cover & Physical Edition Notice */}
        <div className="md:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-brand-surface border border-brand-teal/20 p-5 sm:p-6 flex items-center justify-center shadow-inner">
            {product.coverImage ? (
              <img
                src={product.coverImage}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-72 sm:max-h-80 object-contain drop-shadow-md rounded-xl transition-transform hover:scale-102"
              />
            ) : (
              <ProductCoverPlaceholder product={product} aspectRatio="4/3" />
            )}

            {product.badge && (
              <span className="absolute top-3.5 left-3.5 px-2.5 py-1 text-[10px] font-semibold bg-brand-teal text-white rounded-md shadow-xs uppercase tracking-wider">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Title, Metadata, Pricing, Actions */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-5">
          
          {/* Header Texts */}
          <div className="space-y-2">
            <span className="text-[10px] sm:text-xs font-semibold text-brand-teal uppercase tracking-wider block">
              {product.categoryLabel || 'E-book & Guida Nutrizionale'}
            </span>

            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium text-brand-slate leading-snug break-words">
              {product.title}
            </h1>

            {product.subtitle && (
              <p className="font-serif text-xs sm:text-sm text-slate-500 italic leading-relaxed break-words">
                «{product.subtitle}»
              </p>
            )}
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 py-2.5 border-y border-slate-100">
            <span>{product.format || 'Formato PDF'}</span>
            <span>·</span>
            <span>{product.level || 'Benessere Quotidiano'}</span>
            <span>·</span>
            <span>{product.lastUpdated || 'Edizione Ufficiale'}</span>
          </div>

          {/* DUAL PURCHASE CHOICES: eBook vs Libro Cartaceo (Amazon) */}
          {product.amazonUrl && !product.id.includes('salvatempo') ? (
            <div className="space-y-4" data-purpose="format-options">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Scegli il formato che preferisci:
              </span>

              {/* OPTION 1: Formato Digitale (eBook PDF) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-brand-teal/25 space-y-3.5 shadow-2xs">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-brand-teal shrink-0" />
                      <span className="font-semibold text-sm text-brand-slate">
                        Formato Digitale (eBook PDF)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Download immediato sul tuo dispositivo (cellulare, tablet o PC).
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-brand-slate tabular-nums block">
                      {product.formattedPrice}
                    </span>
                    <span className="text-[10px] text-brand-tealDark font-medium bg-brand-tealLight/60 px-2 py-0.5 rounded">
                      Istantaneo
                    </span>
                  </div>
                </div>

                {/* Digital Actions */}
                {isPurchased ? (
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onOpenPdfReader(product)}
                      className="w-full py-2.5 px-4 bg-brand-teal hover:bg-brand-tealDark text-white rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Apri e Leggi nella tua Libreria</span>
                    </button>
                    <p className="text-[11px] text-center text-emerald-700 font-medium flex items-center justify-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Questo volume è già sbloccato nel tuo account</span>
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onDirectBuy(product)}
                      className="py-2.5 px-4 bg-brand-teal hover:bg-brand-tealDark text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Acquista eBook</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleAddToCartWithFeedback}
                      className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-2xs active:scale-95 ${
                        isAddedToCart
                          ? 'bg-emerald-600 border border-emerald-600 text-white shadow-xs scale-[1.02]'
                          : 'bg-white border border-brand-teal/30 text-brand-slate hover:bg-slate-50'
                      }`}
                      aria-label="Aggiungi al carrello"
                    >
                      {isAddedToCart ? (
                        <>
                          <Check className="w-4 h-4 text-white stroke-[2.5] animate-bounce" />
                          <span className="font-bold">Aggiunto al Carrello!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-brand-teal" />
                          <span>Aggiungi al Carrello</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* OPTION 2: Formato Cartaceo (Libro Fisico su Amazon) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-3.5 shadow-2xs">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span className="font-semibold text-sm text-amber-950">
                        Formato Cartaceo (Libro Fisico)
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-900/80 mt-1 leading-relaxed">
                      Preferisci la copia stampata da sfogliare a casa o in cucina? Ordina il libro rilegato dal negozio ufficiale Amazon.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded uppercase tracking-wider block">
                      Amazon
                    </span>
                  </div>
                </div>

                <a
                  href={product.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#232F3E] hover:bg-[#131921] active:bg-black text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 shadow-xs transition-colors cursor-pointer group"
                >
                  <span>Acquista Libro Cartaceo su Amazon</span>
                  <ExternalLink className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-amber-900/70 pt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Spedizione rapida Prime e garanzia ufficiale Amazon</span>
                </div>
              </div>
            </div>
          ) : (
            /* SINGLE PURCHASE MODULE: For I menu salvatempo della tua nutrizionista (Cartaceo Boutique) */
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-brand-teal/20 space-y-4">
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                    Libro Cartaceo Ufficiale
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-slate tabular-nums">
                      {product.formattedPrice}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-slate-400 line-through tabular-nums">
                        € {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-brand-tealDark bg-brand-tealLight/50 border border-brand-teal/30 px-2.5 py-1 rounded-md">
                  Offerta Promozionale
                </span>
              </div>

              {/* Action Buttons */}
              {isPurchased ? (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => onOpenPdfReader(product)}
                    className="w-full py-3 px-4 bg-brand-teal hover:bg-brand-tealDark text-white rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Apri e Leggi nella tua Libreria</span>
                  </button>
                  <p className="text-[11px] text-center text-emerald-700 font-medium flex items-center justify-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Questo volume è già sbloccato nel tuo account</span>
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => onDirectBuy(product)}
                      className="py-3 px-4 bg-brand-teal hover:bg-brand-tealDark text-white rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Acquista Ora</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleAddToCartWithFeedback}
                      className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-2xs active:scale-95 ${
                        isAddedToCart
                          ? 'bg-emerald-600 border border-emerald-600 text-white shadow-xs scale-[1.02]'
                          : 'bg-white border border-brand-teal/30 text-brand-slate hover:bg-slate-50'
                      }`}
                      aria-label="Aggiungi al carrello"
                    >
                      {isAddedToCart ? (
                        <>
                          <Check className="w-4 h-4 text-white stroke-[2.5] animate-bounce" />
                          <span className="font-bold">Aggiunto al Carrello!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-brand-teal" />
                          <span>Aggiungi al Carrello</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                    <ShieldCheck className="w-4 h-4 text-brand-teal shrink-0" />
                    <span>Pagamento sicuro · Consegna garantita a domicilio</span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </article>

      {/* 3. Framed Tabs: Descrizione, Indice Capitoli, Estratto */}
      <section className="editorial-card bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-brand-teal/20 shadow-xs space-y-5" data-purpose="detail-tabs">
        
        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'content'
                ? 'bg-brand-teal text-white shadow-xs'
                : 'text-slate-600 hover:text-brand-slate hover:bg-slate-50'
            }`}
          >
            Descrizione Completa
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('chapters')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'chapters'
                ? 'bg-brand-teal text-white shadow-xs'
                : 'text-slate-600 hover:text-brand-slate hover:bg-slate-50'
            }`}
          >
            Indice dei Capitoli ({product.chapters?.length || 0})
          </button>
        </div>

        {/* Tab 1: Full Description */}
        {activeTab === 'content' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed break-words">
            {product.fullDescription?.map((par, idx) => (
              <p key={idx}>{par}</p>
            ))}

            {product.keyBenefits && product.keyBenefits.length > 0 && (
              <div className="pt-3 space-y-2.5">
                <h4 className="font-serif text-sm font-semibold text-brand-slate">
                  Cosa imparerai da questa guida:
                </h4>
                <ul className="space-y-2">
                  {product.keyBenefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-brand-tealLight/50 text-brand-teal flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Chapters Syllabus */}
        {activeTab === 'chapters' && (
          <div className="space-y-3">
            {product.chapters && product.chapters.length > 0 ? (
              product.chapters.map((ch, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-brand-surface/70 border border-brand-teal/15 space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h5 className="font-serif text-sm font-semibold text-brand-slate">
                      {ch.title}
                    </h5>
                    {ch.durationOrPages && (
                      <span className="text-[11px] text-brand-teal font-medium tabular-nums">
                        {ch.durationOrPages}
                      </span>
                    )}
                  </div>
                  {ch.description && (
                    <p className="text-xs text-slate-500 leading-relaxed break-words">
                      {ch.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">Indice disponibile all'interno del volume.</p>
            )}
          </div>
        )}

      </section>

      {/* 4. Framed Related E-books */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4 pt-2" data-purpose="related-books">
          <h3 className="font-serif text-base sm:text-lg font-semibold text-brand-slate pl-2 border-l-2 border-brand-teal">
            Altri libri consigliati
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {relatedProducts.map((rel) => (
              <article
                key={rel.id}
                onClick={() => onSelectProduct(rel.id)}
                className="bg-white p-3.5 rounded-2xl border border-brand-teal/20 hover:border-brand-teal/40 hover:shadow-xs transition-all cursor-pointer flex gap-3.5 items-center group editorial-card"
              >
                <div className="w-14 h-18 rounded-lg overflow-hidden bg-brand-surface shrink-0 border border-slate-100 flex items-center justify-center">
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-semibold text-brand-teal uppercase tracking-wide block truncate">
                    {rel.categoryLabel || 'E-book'}
                  </span>
                  <h4 className="font-serif text-xs font-medium text-brand-slate group-hover:text-brand-teal transition-colors truncate mt-0.5">
                    {rel.title}
                  </h4>
                  <div className="text-xs font-serif font-bold text-brand-slate mt-1 tabular-nums">
                    {rel.formattedPrice}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
