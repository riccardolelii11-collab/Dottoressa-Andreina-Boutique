import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Check } from 'lucide-react';

interface EbooksPageProps {
  ebooks: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickBuy?: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const EbooksPage: React.FC<EbooksPageProps> = ({
  ebooks,
  onSelectProduct,
  onAddToCart,
  cartCount = 0,
  onOpenCart,
}) => {
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleAddToCartClick = (book: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(book);
    setRecentlyAddedId(book.id);
    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === book.id ? null : prev));
    }, 1200);
  };

  // Ordered strictly as in design reference
  const book1 = ebooks.find((b) => b.id.includes('salvatempo')) || ebooks[0];
  const book2 = ebooks.find((b) => b.id.includes('asporto')) || ebooks[3] || ebooks[1];
  const book3 = ebooks.find((b) => b.id.includes('ciclo')) || ebooks[1];
  const book4 = ebooks.find((b) => b.id.includes('colazione')) || ebooks[2];

  const book1ImageSrc = '/assets/aistudio/I-menu-salvatempo-della-tua-nutrizionista_11fb9f5e.png';
  const book2ImageSrc = '/assets/aistudio/Libro-componi-i-tuoi-pasti-dasporto_5c9898ec.png';
  const book3ImageSrc = '/assets/aistudio/Alimentazione-ciclo-mestruale-centered.png';
  const book4ImageSrc = '/assets/aistudio/3-2_4eecd11f.png';

  return (
    <div className="w-full max-w-md md:max-w-5xl lg:max-w-6xl mx-auto bg-brand-surface text-brand-slate font-sans antialiased flex flex-col justify-between relative pb-28 md:pb-12 min-h-screen md:px-6 lg:px-8">
      
      {/* 1. Mobile TopHeader: Exact replica of the smartphone design */}
      <header className="w-full px-6 pt-7 pb-4 bg-brand-surface border-b border-brand-teal/15 sticky top-0 z-30 backdrop-blur-md bg-opacity-95 md:hidden" data-purpose="top-navigation-mobile">
        <div className="flex items-center justify-between">
          {/* Monogram Logo based on sketch: A.O. inside circle + label */}
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full border border-brand-teal flex items-center justify-center bg-white shadow-xs">
              <span className="font-serif font-bold text-brand-slate text-base tracking-tight">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold tracking-wide text-brand-slate leading-none">A.O.</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-teal font-medium mt-0.5">Dott.ssa Andreina Olivieri</span>
            </div>
          </div>

          {/* Cart Icon with badge as drawn on top right */}
          <button 
            type="button"
            onClick={onOpenCart}
            aria-label="Carrello" 
            className="relative p-2 rounded-full hover:bg-white transition-colors duration-200 text-brand-slate cursor-pointer"
          >
            <svg className="w-6 h-6 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13m-10.5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            {/* Badge counter - only visible when items in cart */}
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-teal text-white text-[10px] font-semibold flex items-center justify-center rounded-full leading-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 2. Desktop & Tablet Top Header Bar: Elegant, spacious banner matching visual branding */}
      <div className="hidden md:flex items-center justify-between pt-8 pb-6 mb-2 border-b border-brand-teal/20" data-purpose="top-navigation-desktop">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-full border border-brand-teal flex items-center justify-center bg-white shadow-xs">
            <span className="font-serif font-bold text-brand-slate text-xl tracking-tight">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-semibold tracking-wide text-brand-slate leading-none">A.O.</span>
            <span className="text-[11px] uppercase tracking-widest text-brand-teal font-medium mt-1">Dott.ssa Andreina Olivieri • Boutique Digitale</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            4 Pubblicazioni Ufficiali
          </span>
          <button 
            type="button"
            onClick={onOpenCart}
            aria-label="Carrello" 
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-brand-teal/30 text-brand-slate transition-colors shadow-2xs cursor-pointer"
          >
            <div className="relative">
              <svg className="w-5 h-5 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13m-10.5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-brand-teal text-white text-[10px] font-semibold flex items-center justify-center rounded-full leading-none">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold">Carrello</span>
          </button>
        </div>
      </div>

      {/* 3. Main Content: Single column on phone, responsive 2-column grid on tablet and desktop */}
      <main className="flex-1 px-5 md:px-0 pt-5 pb-6 flex flex-col" data-purpose="product-list">
        
        {/* Section Title directly from sketch: TUTTI I LIBRI, E-BOOK E GUIDE */}
        <section className="px-1 mb-5" data-purpose="section-header">
          <div className="flex items-center justify-between">
            <h1 className="font-serif uppercase tracking-wider text-sm md:text-lg font-semibold text-brand-slate/90 border-l-2 border-brand-teal pl-3 py-0.5">
              Tutti i libri, e-book e guide
            </h1>
            <span className="hidden md:inline-block text-xs text-slate-500 font-medium">
              Formato cartaceo con spedizione o digitale istantaneo (PDF)
            </span>
          </div>
        </section>

        {/* Responsive Grid: 1 column on phone (as in sketch), 2 columns on tablet & desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

          {/* Product Card 1: I menu salvatempo della tua nutrizionista */}
          <article className="editorial-card bg-white rounded-2xl p-3.5 md:p-5 border border-brand-teal/20 transition-all hover:border-brand-teal/40 hover:shadow-md active:scale-[0.99] relative overflow-hidden flex flex-row items-center gap-4 md:gap-5" data-purpose="product-card">
            {/* Book Cover container focusing 3D physical book */}
            <div 
              onClick={() => book1 && onSelectProduct(book1)}
              className="w-28 h-36 md:w-36 md:h-48 shrink-0 rounded-xl overflow-hidden bg-brand-surface relative border border-slate-100 shadow-inner cursor-pointer"
            >
              <img 
                alt="Copertina I menu salvatempo della tua nutrizionista" 
                className="w-full h-full object-cover transition-transform duration-300" 
                style={{ objectPosition: '50% 50%', transform: 'scale(1.15)', transformOrigin: '50% 50%' }} 
                src={book1ImageSrc}
              />
              <span className="absolute top-1.5 left-1.5 bg-brand-teal text-white text-[9px] md:text-[10px] font-semibold px-1.5 md:px-2 py-0.5 rounded leading-none shadow-xs uppercase tracking-wide">
                Offerta
              </span>
            </div>
            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between h-36 md:h-48 py-1">
              <div>
                <span className="text-[10px] md:text-xs uppercase font-semibold text-brand-teal tracking-wider">
                  Libro Cartaceo
                </span>
                <h2 
                  onClick={() => book1 && onSelectProduct(book1)}
                  className="font-serif text-base md:text-xl font-medium text-brand-slate leading-snug mt-1 line-clamp-2 cursor-pointer hover:text-brand-teal transition-colors"
                >
                  I menu salvatempo della tua nutrizionista
                </h2>
              </div>
              <div className="flex items-end justify-between mt-auto pt-2 border-t border-slate-100">
                <div>
                  <span className="text-xs md:text-sm line-through text-slate-400 block font-normal leading-none mb-1">
                    18,00 €
                  </span>
                  <span className="text-lg md:text-2xl font-serif font-bold text-brand-slate">
                    17,10 €
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={(e) => book1 && handleAddToCartClick(book1, e)}
                  className={`px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold tracking-wide shadow-2xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 whitespace-nowrap ${
                    recentlyAddedId === book1?.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-brand-teal text-white hover:bg-brand-tealDark active:bg-brand-tealDark'
                  }`}
                  aria-label={`Aggiungi ${book1?.title} al carrello`}
                >
                  {recentlyAddedId === book1?.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Aggiunto!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span>+ Carrello</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </article>

          {/* Product Card 2: Componi i tuoi pasti da asporto (formato digitale) */}
          <article className="editorial-card bg-white rounded-2xl p-3.5 md:p-5 border border-brand-teal/20 transition-all hover:border-brand-teal/40 hover:shadow-md active:scale-[0.99] flex flex-row items-center gap-4 md:gap-5" data-purpose="product-card">
            {/* Book Cover container focusing the tablet in the center */}
            <div 
              onClick={() => book2 && onSelectProduct(book2)}
              className="w-28 h-36 md:w-36 md:h-48 shrink-0 rounded-xl overflow-hidden bg-brand-surface relative border border-slate-100 shadow-inner cursor-pointer"
            >
              <img 
                alt="Copertina Componi i tuoi pasti da asporto" 
                className="w-full h-full object-cover transition-transform duration-300" 
                style={{ objectPosition: '50% 53%', transform: 'scale(1.30)', transformOrigin: '50% 53%' }} 
                src={book2ImageSrc}
              />
            </div>
            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between h-36 md:h-48 py-1">
              <div>
                <span className="text-[10px] md:text-xs uppercase font-semibold text-brand-teal tracking-wider">
                  Formato Digitale
                </span>
                <h2 
                  onClick={() => book2 && onSelectProduct(book2)}
                  className="font-serif text-base md:text-xl font-medium text-brand-slate leading-snug mt-1 line-clamp-2 cursor-pointer hover:text-brand-teal transition-colors"
                >
                  Componi i tuoi pasti da asporto
                </h2>
              </div>
              <div className="flex items-end justify-between mt-auto pt-2 border-t border-slate-100">
                <div>
                  <span className="text-xs md:text-sm text-slate-400 block font-normal leading-none mb-1">
                    Prezzo
                  </span>
                  <span className="text-lg md:text-2xl font-serif font-bold text-brand-slate">
                    12,90 €
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={(e) => book2 && handleAddToCartClick(book2, e)}
                  className={`px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold tracking-wide shadow-2xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 whitespace-nowrap ${
                    recentlyAddedId === book2?.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-brand-teal text-white hover:bg-brand-tealDark active:bg-brand-tealDark'
                  }`}
                  aria-label={`Aggiungi ${book2?.title} al carrello`}
                >
                  {recentlyAddedId === book2?.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Aggiunto!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span>+ Carrello</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </article>

          {/* Product Card 3: Alimentazione e ciclo mestruale (formato digitale) */}
          <article className="editorial-card bg-white rounded-2xl p-3.5 md:p-5 border border-brand-teal/20 transition-all hover:border-brand-teal/40 hover:shadow-md active:scale-[0.99] flex flex-row items-center gap-4 md:gap-5" data-purpose="product-card">
            {/* Book Cover container focusing the tablet in the center */}
            <div 
              onClick={() => book3 && onSelectProduct(book3)}
              className="w-28 h-36 md:w-36 md:h-48 shrink-0 rounded-xl overflow-hidden bg-brand-surface relative border border-slate-100 shadow-inner cursor-pointer"
            >
              <img 
                alt="Copertina Alimentazione e ciclo mestruale" 
                className="w-full h-full object-cover transition-transform duration-300" 
                style={{ objectPosition: 'center center', transform: 'scale(1.04)', transformOrigin: 'center center' }} 
                src={book3ImageSrc}
              />
            </div>
            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between h-36 md:h-48 py-1">
              <div>
                <span className="text-[10px] md:text-xs uppercase font-semibold text-brand-teal tracking-wider">
                  Formato Digitale
                </span>
                <h2 
                  onClick={() => book3 && onSelectProduct(book3)}
                  className="font-serif text-base md:text-xl font-medium text-brand-slate leading-snug mt-1 line-clamp-2 cursor-pointer hover:text-brand-teal transition-colors"
                >
                  Alimentazione e ciclo mestruale
                </h2>
              </div>
              <div className="flex items-end justify-between mt-auto pt-2 border-t border-slate-100">
                <div>
                  <span className="text-xs md:text-sm text-slate-400 block font-normal leading-none mb-1">
                    Prezzo
                  </span>
                  <span className="text-lg md:text-2xl font-serif font-bold text-brand-slate">
                    12,90 €
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={(e) => book3 && handleAddToCartClick(book3, e)}
                  className={`px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold tracking-wide shadow-2xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 whitespace-nowrap ${
                    recentlyAddedId === book3?.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-brand-teal text-white hover:bg-brand-tealDark active:bg-brand-tealDark'
                  }`}
                  aria-label={`Aggiungi ${book3?.title} al carrello`}
                >
                  {recentlyAddedId === book3?.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Aggiunto!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span>+ Carrello</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </article>

          {/* Product Card 4: Migliora la tua colazione (formato digitale) */}
          <article className="editorial-card bg-white rounded-2xl p-3.5 md:p-5 border border-brand-teal/20 transition-all hover:border-brand-teal/40 hover:shadow-md active:scale-[0.99] flex flex-row items-center gap-4 md:gap-5" data-purpose="product-card">
            {/* Book Cover container focusing the tablet in the center */}
            <div 
              onClick={() => book4 && onSelectProduct(book4)}
              className="w-28 h-36 md:w-36 md:h-48 shrink-0 rounded-xl overflow-hidden bg-brand-surface relative border border-slate-100 shadow-inner cursor-pointer"
            >
              <img 
                alt="Copertina Migliora la tua colazione" 
                className="w-full h-full object-cover transition-transform duration-300" 
                style={{ objectPosition: '38.5% 51%', transform: 'scale(1.28)', transformOrigin: '38.5% 51%' }} 
                src={book4ImageSrc}
              />
            </div>
            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between h-36 md:h-48 py-1">
              <div>
                <span className="text-[10px] md:text-xs uppercase font-semibold text-brand-teal tracking-wider">
                  Formato Digitale
                </span>
                <h2 
                  onClick={() => book4 && onSelectProduct(book4)}
                  className="font-serif text-base md:text-xl font-medium text-brand-slate leading-snug mt-1 line-clamp-2 cursor-pointer hover:text-brand-teal transition-colors"
                >
                  Migliora la tua colazione
                </h2>
              </div>
              <div className="flex items-end justify-between mt-auto pt-2 border-t border-slate-100">
                <div>
                  <span className="text-xs md:text-sm text-slate-400 block font-normal leading-none mb-1">
                    Prezzo
                  </span>
                  <span className="text-lg md:text-2xl font-serif font-bold text-brand-slate">
                    12,90 €
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={(e) => book4 && handleAddToCartClick(book4, e)}
                  className={`px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold tracking-wide shadow-2xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 whitespace-nowrap ${
                    recentlyAddedId === book4?.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-brand-teal text-white hover:bg-brand-tealDark active:bg-brand-tealDark'
                  }`}
                  aria-label={`Aggiungi ${book4?.title} al carrello`}
                >
                  {recentlyAddedId === book4?.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Aggiunto!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span>+ Carrello</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </article>

        </div>

      </main>

    </div>
  );
};
