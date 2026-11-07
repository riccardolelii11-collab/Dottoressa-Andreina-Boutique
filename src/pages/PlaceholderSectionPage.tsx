import React from 'react';

interface PlaceholderSectionPageProps {
  title: string;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const PlaceholderSectionPage: React.FC<PlaceholderSectionPageProps> = ({
  title,
  cartCount = 0,
  onOpenCart,
}) => {
  return (
    <div className="w-full max-w-md md:max-w-5xl lg:max-w-6xl mx-auto bg-brand-surface text-brand-slate font-sans antialiased flex flex-col justify-between relative pb-28 md:pb-12 min-h-screen md:px-6 lg:px-8">
      
      {/* Mobile Top Header */}
      <header className="w-full px-6 pt-7 pb-4 bg-brand-surface border-b border-brand-teal/15 sticky top-0 z-30 backdrop-blur-md bg-opacity-95 md:hidden" data-purpose="top-navigation-mobile">
        <div className="flex items-center justify-between">
          {/* Brand Logo: Circle with A on the left + Dottoressa Andreina Boutique signature logo */}
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full border border-brand-teal flex items-center justify-center bg-white shadow-xs shrink-0">
              <span className="font-serif font-bold text-brand-slate text-base tracking-tight">A</span>
            </div>
            <img 
              src="/assets/aistudio/logo-dottoressa-andreina-boutique.png" 
              alt="Dottoressa Andreina Boutique" 
              className="h-8 w-auto max-w-[200px] object-contain drop-shadow-2xs"
            />
          </div>

          <button 
            type="button"
            onClick={onOpenCart}
            aria-label="Carrello" 
            className="relative p-2 rounded-full hover:bg-white transition-colors duration-200 text-brand-slate cursor-pointer"
          >
            <svg className="w-6 h-6 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13m-10.5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-teal text-white text-[10px] font-semibold flex items-center justify-center rounded-full leading-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between pt-8 pb-6 mb-2 border-b border-brand-teal/20" data-purpose="top-navigation-desktop">
        <div className="flex items-center space-x-3.5 min-w-0">
          <div className="w-12 h-12 rounded-full border border-brand-teal flex items-center justify-center bg-white shadow-xs shrink-0">
            <span className="font-serif font-bold text-brand-slate text-xl tracking-tight">A</span>
          </div>
          <img 
            src="/assets/aistudio/logo-dottoressa-andreina-boutique.png" 
            alt="Dottoressa Andreina Boutique" 
            className="h-11 md:h-12 w-auto max-w-[320px] object-contain drop-shadow-2xs"
          />
        </div>

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

      {/* Main Empty Content */}
      <main className="flex-1 px-5 md:px-0 pt-6 pb-6 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-sm p-8 rounded-2xl bg-white/70 border border-brand-teal/15 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-brand-surface border border-brand-teal/30 flex items-center justify-center mx-auto mb-4 text-brand-teal">
            <span className="font-serif font-semibold text-lg">{title.charAt(0)}</span>
          </div>
          <h2 className="font-serif text-lg font-semibold text-brand-slate mb-1.5">
            {title}
          </h2>
          <p className="text-xs text-slate-400 font-normal leading-relaxed">
            Sezione pronta. In attesa delle grafiche e dei contenuti della Dottoressa.
          </p>
        </div>
      </main>

    </div>
  );
};
