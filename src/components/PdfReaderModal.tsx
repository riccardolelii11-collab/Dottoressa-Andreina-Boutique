import React, { useState } from 'react';
import { Product } from '../types';
import { X, Download, ChevronLeft, ChevronRight, Bookmark, Check, ZoomIn, ZoomOut } from 'lucide-react';

interface PdfReaderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const PdfReaderModal: React.FC<PdfReaderModalProps> = ({
  product,
  isOpen,
  onClose,
  onToast,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!isOpen || !product) return null;

  const totalPages = 24; // Representative preview sample

  const handleDownload = () => {
    onToast(`Download avviato: ${product.title}.pdf`);
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    onToast(isBookmarked ? 'Segnalibro rimosso' : `Segnalibro salvato a pagina ${currentPage}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col bg-[#0b1a2b]/85 backdrop-blur-md">
      {/* Top Bar Reader in Liquid Glass Dark */}
      <div className="liquid-glass-dark text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-semibold text-[#9dbdd1] uppercase tracking-wider hidden sm:inline">
            Lettore Digitale
          </span>
          <span className="hidden sm:inline text-slate-500">·</span>
          <h3 className="font-editorial text-sm sm:text-base font-medium text-white truncate max-w-xs sm:max-w-md">
            {product.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls with Frosted Glass Pill */}
          <div className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs text-slate-200 border border-white/15">
            <button 
              onClick={() => setZoom(Math.max(80, zoom - 10))}
              className="p-1 hover:text-white transition-colors cursor-pointer"
              title="Riduci zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="tabular-nums px-1 font-medium">{zoom}%</span>
            <button 
              onClick={() => setZoom(Math.min(130, zoom + 10))}
              className="p-1 hover:text-white transition-colors cursor-pointer"
              title="Aumenta zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleBookmarkToggle}
            className={`p-2 rounded-full text-xs flex items-center gap-1.5 transition-all cursor-pointer border ${
              isBookmarked 
                ? 'bg-[#9dbdd1] border-[#9dbdd1] text-[#0f2338] shadow-xs' 
                : 'bg-white/10 hover:bg-white/18 border-white/15 text-white'
            }`}
            title="Aggiungi segnalibro"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isBookmarked ? 'Salvato' : 'Segnalibro'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="p-2 sm:px-3 sm:py-1.5 bg-[#2b5374]/90 hover:bg-[#3b6d94] text-white rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border border-white/20 shadow-xs"
            title="Scarica PDF completo"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Scarica PDF</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer ml-1 border border-transparent hover:border-white/20"
            aria-label="Chiudi lettore"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reader Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center">
        <div 
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 transition-transform duration-150 min-h-[640px] p-8 sm:p-14 flex flex-col justify-between"
        >
          {/* Header of the simulated page */}
          <div className="border-b border-slate-100 pb-4 flex justify-between items-center text-[11px] text-[#64748b]">
            <span className="font-editorial italic">Dottoressa Andreina Botique · Edizione Digitale</span>
            <span className="tabular-nums">Pagina {currentPage} di {totalPages}</span>
          </div>

          {/* Page Body Content */}
          <div className="my-8 space-y-6">
            {currentPage === 1 ? (
              <div className="text-center py-6 space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#2b5374] font-medium">
                  {product.categoryLabel}
                </span>
                <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0f2338] leading-tight max-w-lg mx-auto">
                  {product.title}
                </h1>
                <p className="text-sm text-[#4a5e73] font-editorial italic max-w-md mx-auto">
                  «{product.subtitle}»
                </p>
                <div className="w-16 h-0.5 bg-[#9dbdd1] mx-auto my-6" />
                <p className="text-xs text-[#64748b]">
                  A cura della <strong>Dott.ssa Andreina Olivieri</strong><br />
                  Biologa Nutrizionista
                </p>
              </div>
            ) : currentPage === 2 ? (
              <div className="space-y-4">
                <h2 className="font-editorial text-xl font-semibold text-[#0f2338] border-b border-slate-100 pb-2">
                  Indice dei Contenuti e Moduli
                </h2>
                <div className="space-y-3 pt-2">
                  {product.chapters.map((ch, idx) => (
                    <div key={idx} className="flex justify-between items-baseline text-xs pb-1 border-b border-dashed border-slate-200">
                      <span className="font-medium text-[#0f2338]">{ch.title}</span>
                      <span className="text-[#64748b] tabular-nums">{ch.durationOrPages || `Cap. ${idx + 1}`}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs sm:text-sm text-[#334155] leading-relaxed">
                <h2 className="font-editorial text-lg font-semibold text-[#0f2338]">
                  Capitolo {currentPage - 2}: La Consapevolezza a Tavola
                </h2>
                <p>
                  Nel percorso verso una nutrizione equilibrata, il primo passo fondamentale è ristabilire la fiducia con i messaggi biologici che il nostro organismo ci invia costantemente. Lungi dall’essere un semplice serbatoio calorico, il corpo umano è un sofisticato laboratorio neuroendocrino.
                </p>
                <div className="p-4 bg-[#f8fafc] border-l-2 border-[#2b5374] rounded-r-lg italic text-[#475569] text-xs">
                  «Mangiare bene è una forma di rispetto, non un castigo né una privazione.»
                </div>
                <p>
                  Quando impariamo a combinare le fibre ad ogni pasto con una quota adeguata di grassi sani e proteine digeribili, la glicemia si stabilizza naturalmente, disinnescando la sensazione di stanchezza improvvisa e gli attacchi di fame nervosa pomeridiana.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#475569]">
                  <li>Masticare con calma per stimolare la prima fase enzimatica della ptialina.</li>
                  <li>Includere sempre un elemento colorato vivo e crudo nel piatto principale.</li>
                  <li>Bere acqua naturale a temperatura ambiente prima dell’inizio del pasto.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Footer of the simulated page */}
          <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-[11px] text-[#94a3b8]">
            <span>Uso esclusivo per l’acquirente · Vietata la ridistribuzione</span>
            <span className="tabular-nums">www.dottoressaandreinaolivieri.it</span>
          </div>
        </div>
      </div>

      {/* Reader Bottom Navigation Bar with Liquid Glass Dark */}
      <div className="liquid-glass-dark text-white px-4 py-3 flex items-center justify-center gap-6 border-t border-white/10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Pagina precedente</span>
        </button>

        <span className="text-xs text-slate-300 font-medium tabular-nums px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
        >
          <span>Pagina successiva</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
