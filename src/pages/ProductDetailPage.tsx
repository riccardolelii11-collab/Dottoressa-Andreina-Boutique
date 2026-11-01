import React, { useState } from 'react';
import { Product } from '../types';
import { 
  ArrowLeft, 
  Star, 
  ShoppingBag, 
  Download, 
  BookOpen, 
  Check, 
  ShieldCheck, 
  Share2, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Clock,
  Layers,
  CreditCard
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
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'chapters' | 'excerpt'>('content');

  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    onToast('Link del prodotto copiato negli appunti!');
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#2b5374] hover:text-[#193752] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna al Catalogo E-book</span>
        </button>

        <button
          onClick={handleShare}
          className="p-2 text-[#2b5374] bg-[#edf4f8] hover:bg-[#e1edf5] rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
          title="Condividi scheda prodotto"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Condividi</span>
        </button>
      </div>

      {/* Main Grid: Left Cover & Right Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Product Cover */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#cbdfe9] bg-[#fafcff] p-6 flex items-center justify-center">
            {product.coverImage ? (
              <img
                src={product.coverImage}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[460px] object-contain drop-shadow-lg"
              />
            ) : (
              <ProductCoverPlaceholder product={product} aspectRatio="4/3" />
            )}

            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 text-[11px] font-bold bg-[#2b5374] text-white rounded-lg shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Quick Preview Action */}
          <button
            onClick={() => onOpenPdfReader(product)}
            className="w-full py-3 px-4 bg-white border border-[#cbdfe9] text-[#2b5374] hover:bg-[#edf4f8] rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Sfoglia Estratto di Anteprima</span>
          </button>

          {/* Link to Amazon if physical version exists */}
          {product.amazonUrl && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                Disponibile anche in Versione Cartacea
              </span>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                Preferisci sfogliare il libro fisico sul comodino o in cucina? Puoi ordinarlo direttamente su Amazon con spedizione rapida.
              </p>
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-950 hover:underline"
              >
                <span>Visualizza copia cartacea su Amazon</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Title, Metadata, Purchase Module */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#2b5374] uppercase tracking-wider block">
              {product.categoryLabel}
            </span>

            <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0f2338] leading-tight">
              {product.title}
            </h1>

            <p className="font-editorial text-base sm:text-lg text-[#4a5e73] italic">
              «{product.subtitle}»
            </p>
          </div>

          {/* Metadata pill-less row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748b] pb-2 border-b border-[#f1f5f9]">
            <span>{product.format}</span>
            <span>·</span>
            <span>{product.level}</span>
            <span>·</span>
            <span>{product.lastUpdated}</span>
          </div>

          {/* Purchase Box */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#edf4f8] via-[#f4f8fb] to-white border border-[#cbdfe9] space-y-5 shadow-xs">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#64748b] block">Prezzo Ufficiale</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-editorial text-3xl font-bold text-[#0f2338] tabular-nums">
                    {product.formattedPrice}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      € {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                Download PDF Immediato
              </span>
            </div>

            {/* Actions */}
            {isPurchased ? (
              <div className="space-y-2">
                <button
                  onClick={() => onOpenPdfReader(product)}
                  className="w-full py-3.5 px-6 bg-[#2b5374] hover:bg-[#1f3f5a] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Apri e Leggi nella tua Libreria</span>
                </button>
                <p className="text-[11px] text-center text-emerald-700 font-medium flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Questo e-book è sbloccato nel tuo account</span>
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => onDirectBuy(product)}
                    className="py-3.5 px-4 bg-[#2b5374] hover:bg-[#1f3f5a] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Acquista Ora</span>
                  </button>

                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onToast(`Aggiunto al carrello: ${product.title}`);
                    }}
                    className="py-3.5 px-4 bg-white border border-[#cbdfe9] text-[#2b5374] hover:bg-[#f8fafc] rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Aggiungi al Carrello</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#64748b]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Pagamento sicuro · Consegna istantanea via email e profilo</span>
                </div>
              </div>
            )}
          </div>

          {/* Tab Navigation: Descrizione, Capitoli, Estratto */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 border-b border-[#e2e8f0] pb-2">
              <button
                onClick={() => setActiveTab('content')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'content'
                    ? 'bg-[#2b5374] text-white shadow-xs'
                    : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f1f5f9]'
                }`}
              >
                Descrizione Completa
              </button>

              <button
                onClick={() => setActiveTab('chapters')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'chapters'
                    ? 'bg-[#2b5374] text-white shadow-xs'
                    : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f1f5f9]'
                }`}
              >
                Indice dei Capitoli ({product.chapters.length})
              </button>

              <button
                onClick={() => setActiveTab('excerpt')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'excerpt'
                    ? 'bg-[#2b5374] text-white shadow-xs'
                    : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f1f5f9]'
                }`}
              >
                Estratto del Libro
              </button>
            </div>

            {/* Tab 1: Full Description */}
            {activeTab === 'content' && (
              <div className="space-y-4 text-xs sm:text-sm text-[#4a5e73] leading-relaxed">
                {product.fullDescription.map((par, idx) => (
                  <p key={idx}>{par}</p>
                ))}

                <div className="pt-2 space-y-2">
                  <h4 className="font-editorial text-sm font-semibold text-[#0f2338]">
                    Cosa imparerai da questa guida:
                  </h4>
                  <ul className="space-y-1.5">
                    {product.keyBenefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Chapters Syllabus */}
            {activeTab === 'chapters' && (
              <div className="space-y-3">
                {product.chapters.map((ch, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#e2e8f0] space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-editorial text-sm font-semibold text-[#0f2338]">
                        {ch.title}
                      </h5>
                      <span className="text-[11px] text-[#2b5374] font-medium tabular-nums">
                        {ch.durationOrPages}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748b] leading-relaxed">
                      {ch.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Excerpt */}
            {activeTab === 'excerpt' && (
              <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-3 text-xs sm:text-sm italic text-[#334155] leading-relaxed">
                {product.previewExcerpt && product.previewExcerpt.length > 0 ? (
                  product.previewExcerpt.map((ex, idx) => (
                    <blockquote key={idx} className="pl-4 border-l-2 border-[#2b5374]">
                      {ex}
                    </blockquote>
                  ))
                ) : (
                  <p>Estratto di anteprima consultabile nel lettore online.</p>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Related Products */}
      <div className="pt-10 border-t border-[#e2e8f0] space-y-6">
        <h3 className="font-editorial text-2xl font-semibold text-[#0f2338]">
          Altri E-book Consigliati
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectProduct(rel.id)}
              className="bg-white p-4 rounded-2xl border border-[#e2e8f0] hover:border-[#cbdfe9] hover:shadow-md transition-all cursor-pointer flex gap-4 items-center group"
            >
              <img
                src={rel.coverImage}
                alt={rel.title}
                referrerPolicy="no-referrer"
                className="w-16 h-20 object-contain rounded-lg shrink-0 bg-[#f8fafc]"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-[#2b5374] uppercase block">
                  {rel.categoryLabel}
                </span>
                <h4 className="text-xs font-semibold text-[#0f2338] group-hover:text-[#2b5374] transition-colors truncate mt-0.5">
                  {rel.title}
                </h4>
                <div className="text-xs font-semibold text-[#0f2338] mt-1 tabular-nums">
                  {rel.formattedPrice}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
