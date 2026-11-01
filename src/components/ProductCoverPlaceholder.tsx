import React from 'react';
import { BookOpen, Video, Compass, Gift, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';

interface ProductCoverPlaceholderProps {
  product?: Partial<Product>;
  title?: string;
  category?: 'ebook' | 'video' | 'percorso' | 'gratuito' | string;
  aspectRatio?: '4/3' | '3/4' | '16/9' | 'square';
  className?: string;
  compact?: boolean;
}

export const ProductCoverPlaceholder: React.FC<ProductCoverPlaceholderProps> = ({
  product,
  title,
  category,
  aspectRatio = '4/3',
  className = '',
  compact = false,
}) => {
  const itemTitle = product?.title || title || 'Contenuto Digitale';
  const itemCategory = product?.category || category || 'ebook';
  const itemFormat = product?.format || 'Formato Digitale';

  // Aspect ratio classes
  const aspectClass =
    aspectRatio === '3/4'
      ? 'aspect-[3/4]'
      : aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : 'aspect-[4/3]';

  // Ebook & Guide Design: Editorial Paper with botanical motif
  if (itemCategory === 'ebook') {
    return (
      <div
        className={`relative w-full ${aspectClass} bg-gradient-to-br from-[#fbfcfc] via-[#f4f7f9] to-[#e8f0f5] border border-[#d9e5ec] overflow-hidden flex flex-col justify-between p-5 select-none ${className}`}
      >
        {/* Subtle decorative botanical pattern lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="botanical-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.8" fill="#2b5374" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#botanical-dots)" />
          </svg>
        </div>

        {/* Top Header inside the book cover */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#2b5374]/15 pb-2.5">
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-[#2b5374]">
            Boutique · Edizione Digitale
          </span>
          <BookOpen className="w-3.5 h-3.5 text-[#2b5374]/70" />
        </div>

        {/* Center: Title & Author in Editorial Serif */}
        <div className="relative z-10 my-auto text-center px-2 py-3">
          <div className="w-8 h-8 rounded-full bg-white/80 border border-[#cbdfe9] mx-auto flex items-center justify-center text-[#2b5374] mb-2.5 shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#2b5374]" />
          </div>
          <h4 className="font-editorial text-sm sm:text-base font-semibold text-[#0f2338] leading-snug line-clamp-2">
            {itemTitle}
          </h4>
          {!compact && (
            <p className="text-[11px] font-editorial italic text-[#4a5e73] mt-1.5">
              Dott.ssa Andreina Olivieri
            </p>
          )}
        </div>

        {/* Bottom Format & Authentic Placeholder Note */}
        <div className="relative z-10 pt-2 border-t border-[#2b5374]/15 flex items-center justify-between text-[10px] text-[#64748b]">
          <span className="font-medium text-[#2b5374]">{itemFormat.split('·')[0].trim()}</span>
          <span className="italic text-[9px] text-[#8696a4]">Copertina in allestimento</span>
        </div>
      </div>
    );
  }

  // Video Masterclass Design: Midnight Blue Satin with Lens Rings
  if (itemCategory === 'video') {
    return (
      <div
        className={`relative w-full ${aspectClass} bg-gradient-to-br from-[#0f2338] via-[#162d47] to-[#1f3f5a] text-white border border-[#2b5374]/40 overflow-hidden flex flex-col justify-between p-5 select-none ${className}`}
      >
        {/* Subtle geometric lens rings in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-48 h-48 rounded-full border border-white" />
          <div className="absolute w-36 h-36 rounded-full border border-white" />
          <div className="absolute w-24 h-24 rounded-full border border-white" />
        </div>

        {/* Top Tag */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-2.5">
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-[#9dbdd1]">
            Masterclass Video HD
          </span>
          <Video className="w-3.5 h-3.5 text-[#9dbdd1]" />
        </div>

        {/* Center Title */}
        <div className="relative z-10 my-auto text-center px-2 py-3">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 mx-auto flex items-center justify-center text-white mb-2 shadow-sm">
            <Video className="w-4 h-4 text-[#9dbdd1]" />
          </div>
          <h4 className="font-editorial text-sm sm:text-base font-semibold text-white leading-snug line-clamp-2">
            {itemTitle}
          </h4>
          {!compact && (
            <p className="text-[11px] text-slate-300 font-editorial italic mt-1">
              Guida Video a cura della Dottoressa
            </p>
          )}
        </div>

        {/* Bottom Info */}
        <div className="relative z-10 pt-2 border-t border-white/15 flex items-center justify-between text-[10px] text-slate-300">
          <span className="font-medium text-[#9dbdd1]">Streaming Illimitato</span>
          <span className="italic text-[9px] text-slate-400">Video in caricamento</span>
        </div>
      </div>
    );
  }

  // Percorsi & Corsi: Harmonious Layered Gradient
  if (itemCategory === 'percorso') {
    return (
      <div
        className={`relative w-full ${aspectClass} bg-gradient-to-br from-[#f2f7fa] via-[#e2ecf2] to-[#d0e0eb] border border-[#b9cfde] overflow-hidden flex flex-col justify-between p-5 select-none ${className}`}
      >
        <div className="relative z-10 flex items-center justify-between border-b border-[#2b5374]/15 pb-2.5">
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-[#2b5374]">
            Percorso Guidato
          </span>
          <Compass className="w-3.5 h-3.5 text-[#2b5374]" />
        </div>

        <div className="relative z-10 my-auto text-center px-2 py-3">
          <div className="w-9 h-9 rounded-full bg-white/90 border border-[#cbdfe9] mx-auto flex items-center justify-center text-[#2b5374] mb-2 shadow-2xs">
            <Compass className="w-4 h-4 text-[#2b5374]" />
          </div>
          <h4 className="font-editorial text-sm sm:text-base font-semibold text-[#0f2338] leading-snug line-clamp-2">
            {itemTitle}
          </h4>
          <p className="text-[11px] text-[#4a5e73] font-editorial italic mt-1">
            Programma Multidisciplinare
          </p>
        </div>

        <div className="relative z-10 pt-2 border-t border-[#2b5374]/15 flex items-center justify-between text-[10px] text-[#64748b]">
          <span className="font-medium text-[#2b5374]">Video + Guide PDF</span>
          <span className="italic text-[9px] text-[#8696a4]">Materiale in preparazione</span>
        </div>
      </div>
    );
  }

  // Risorse Gratuite Design
  return (
    <div
      className={`relative w-full ${aspectClass} bg-gradient-to-br from-[#ffffff] via-[#f7fafc] to-[#edf4f8] border border-[#cbdfe9] overflow-hidden flex flex-col justify-between p-5 select-none ${className}`}
    >
      <div className="relative z-10 flex items-center justify-between border-b border-[#cbdfe9]/70 pb-2.5">
        <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-[#2b5374]">
          Download Gratuito
        </span>
        <Gift className="w-3.5 h-3.5 text-[#2b5374]" />
      </div>

      <div className="relative z-10 my-auto text-center px-2 py-3">
        <div className="w-9 h-9 rounded-full bg-[#edf4f8] border border-[#cbdfe9] mx-auto flex items-center justify-center text-[#2b5374] mb-2 shadow-2xs">
          <Gift className="w-4 h-4 text-[#2b5374]" />
        </div>
        <h4 className="font-editorial text-sm sm:text-base font-semibold text-[#0f2338] leading-snug line-clamp-2">
          {itemTitle}
        </h4>
        <p className="text-[11px] text-[#4a5e73] font-editorial italic mt-1">
          Risorsa offerta dalla Boutique
        </p>
      </div>

      <div className="relative z-10 pt-2 border-t border-[#cbdfe9]/70 flex items-center justify-between text-[10px] text-[#64748b]">
        <span className="font-medium text-[#2b5374]">PDF Immediato</span>
        <span className="italic text-[9px] text-[#8696a4]">Documento autentico</span>
      </div>
    </div>
  );
};
