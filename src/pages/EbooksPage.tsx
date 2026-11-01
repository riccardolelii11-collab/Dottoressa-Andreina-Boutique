import React, { useState } from 'react';
import { Product } from '../types';
import { BookOpen, Search, Download, ExternalLink, ShieldCheck, Tag, ArrowRight } from 'lucide-react';

interface EbooksPageProps {
  ebooks: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
}

export const EbooksPage: React.FC<EbooksPageProps> = ({
  ebooks,
  onSelectProduct,
  onQuickBuy,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'spesa' | 'donna' | 'colazione'>('all');

  const filteredEbooks = ebooks.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'spesa') return matchesSearch && (b.id.includes('salvatempo') || b.id.includes('asporto'));
    if (selectedFilter === 'donna') return matchesSearch && b.id.includes('ciclo');
    if (selectedFilter === 'colazione') return matchesSearch && b.id.includes('colazione');
    return matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2b5374]">
          <BookOpen className="w-4 h-4" />
          <span>Catalogo Ufficiale E-book</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0f2338]">
          E-book & Guide Nutrizionali da Scaricare
        </h1>
        <p className="text-xs sm:text-sm text-[#4a5e73] max-w-2xl leading-relaxed">
          I manuali originali della Dott.ssa Andreina Olivieri in formato digitale PDF ad alta risoluzione. Schemi chiari, basi biochimiche accessibili e ricettari operativi pronti all'uso.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cerca per titolo, ricetta o argomento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#2b5374] bg-[#fcfdfd]"
          />
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#2b5374] text-white shadow-2xs'
                : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f8fafc]'
            }`}
          >
            Tutti ({ebooks.length})
          </button>
          <button
            onClick={() => setSelectedFilter('spesa')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === 'spesa'
                ? 'bg-[#2b5374] text-white shadow-2xs'
                : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f8fafc]'
            }`}
          >
            Organizzazione & Spesa
          </button>
          <button
            onClick={() => setSelectedFilter('donna')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === 'donna'
                ? 'bg-[#2b5374] text-white shadow-2xs'
                : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f8fafc]'
            }`}
          >
            Salute Femminile
          </button>
          <button
            onClick={() => setSelectedFilter('colazione')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === 'colazione'
                ? 'bg-[#2b5374] text-white shadow-2xs'
                : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f8fafc]'
            }`}
          >
            Colazione & Ricette
          </button>
        </div>
      </div>

      {/* Grid of Ebooks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEbooks.map((ebook) => (
          <div
            key={ebook.id}
            className="bg-white rounded-3xl border border-[#e2e8f0] p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-between shadow-xs hover:shadow-xl hover:border-[#cbdfe9] transition-all group"
          >
            {/* Book Cover */}
            <div 
              onClick={() => onSelectProduct(ebook)}
              className="relative w-44 aspect-[4/5] bg-[#f8fafc] rounded-2xl overflow-hidden p-3 flex items-center justify-center shrink-0 border border-[#f1f5f9] cursor-pointer group-hover:bg-slate-50 transition-colors"
            >
              <img
                src={ebook.coverImage}
                alt={ebook.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-md group-hover:scale-104 transition-transform duration-300"
              />
              {ebook.badge && (
                <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded bg-[#2b5374] text-white shadow-2xs">
                  {ebook.badge}
                </span>
              )}
            </div>

            {/* Book Info */}
            <div className="flex-1 min-w-0 space-y-3 flex flex-col justify-between h-full">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2b5374] block">
                  {ebook.categoryLabel}
                </span>
                
                <h3 
                  onClick={() => onSelectProduct(ebook)}
                  className="font-editorial text-lg font-semibold text-[#0f2338] group-hover:text-[#2b5374] transition-colors leading-snug cursor-pointer"
                >
                  {ebook.title}
                </h3>

                <p className="text-xs text-[#526374] leading-relaxed line-clamp-3">
                  {ebook.shortDescription}
                </p>

                <div className="text-[11px] text-[#64748b] pt-1">
                  <span>{ebook.format}</span>
                </div>
              </div>

              {/* Price and Action Buttons */}
              <div className="pt-4 border-t border-[#f1f5f9] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-lg text-[#0f2338] tabular-nums">
                      {ebook.formattedPrice}
                    </span>
                    {ebook.originalPrice && (
                      <span className="text-xs text-slate-400 line-through tabular-nums">
                        € {ebook.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium block">
                    Download immediato PDF
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectProduct(ebook)}
                    className="px-3.5 py-2 text-xs font-semibold text-[#2b5374] bg-[#edf4f8] hover:bg-[#e1edf5] rounded-xl transition-colors cursor-pointer"
                  >
                    Dettagli
                  </button>
                  <button
                    onClick={() => onQuickBuy(ebook)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#2b5374] hover:bg-[#1f3f5a] rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    Acquista Ora
                  </button>
                </div>
              </div>

              {/* Optional Amazon physical edition link */}
              {ebook.amazonUrl && (
                <div className="pt-1">
                  <a
                    href={ebook.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 hover:text-amber-950 transition-colors"
                  >
                    <span>Disponibile anche in copia cartacea su Amazon</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
