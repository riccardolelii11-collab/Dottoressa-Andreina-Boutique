import React from 'react';
import { Product } from '../types';
import { Star, ShoppingBag, Eye, ArrowRight, Download, Play } from 'lucide-react';
import { ProductCoverPlaceholder } from './ProductCoverPlaceholder';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  isPurchased?: boolean;
  onAccess?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isPurchased,
  onAccess,
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:border-[#cbdfe9] hover:-translate-y-0.5">
      {/* Product Image / Placeholder Container */}
      <div 
        onClick={() => onSelect(product.id)}
        className="relative aspect-[4/3] bg-[#f8fafc] overflow-hidden cursor-pointer"
      >
        {product.coverImage ? (
          <img
            src={product.coverImage}
            alt={product.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
          />
        ) : (
          <ProductCoverPlaceholder product={product} />
        )}
        
        {/* Subtle hover overlay affordance */}
        <div className="absolute inset-0 bg-[#0f2338]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-3.5 py-1.5 liquid-glass-neutral text-[#0f2338] text-xs font-medium rounded-full shadow-md flex items-center gap-1.5 border border-white/90">
            <Eye className="w-3.5 h-3.5" />
            <span>Scopri i dettagli</span>
          </span>
        </div>

        {/* Free or Format Ribbon with Frosted Pill */}
        {product.isFree ? (
          <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-semibold bg-[#2b5374] text-white rounded-full shadow-sm">
            Risorsa Gratuita
          </span>
        ) : product.badge ? (
          <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-medium liquid-glass-neutral text-[#2b5374] rounded-full shadow-xs border border-white/80">
            {product.badge}
          </span>
        ) : null}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-xs text-[#64748b] mb-2">
            <span className="font-medium text-[#2b5374]">{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.format.split('·')[0].trim()}</span>
          </div>

          {/* Title in Editorial Serif */}
          <h3 
            onClick={() => onSelect(product.id)}
            className="font-editorial text-lg font-semibold text-[#0f2338] leading-snug group-hover:text-[#2b5374] transition-colors cursor-pointer line-clamp-2"
          >
            {product.title}
          </h3>

          {/* Short Description */}
          <p className="mt-2 text-xs text-[#5b6b7a] line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 mt-4 border-t border-[#f1f5f9] flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold text-base text-[#0f2338] tabular-nums">
              {product.isFree ? 'Gratuito' : product.formattedPrice}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#64748b] mt-0.5">
              <Star className="w-3 h-3 text-[#d97706] fill-amber-500" />
              <span className="font-medium tabular-nums">{product.rating.toFixed(1)}</span>
              <span>({product.reviewsCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isPurchased || product.isFree ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onAccess) {
                    onAccess(product);
                  } else {
                    onSelect(product.id);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#2b5374] hover:bg-[#1f3f5a] rounded-lg transition-colors cursor-pointer"
              >
                {product.category === 'video_course' ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Guarda</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Accedi</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#2b5374] glass-pill-control rounded-lg transition-all cursor-pointer"
                title="Aggiungi al carrello"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Carrello</span>
              </button>
            )}

            <button
              onClick={() => onSelect(product.id)}
              className="p-2 text-[#64748b] hover:text-[#0f2338] hover:bg-[#f1f5f9] rounded-lg transition-colors"
              aria-label="Vedi dettagli"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
