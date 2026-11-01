import React from 'react';
import { Product, VideoRecipe, VideoCourse, NavigationTab } from '../types';
import { 
  BookOpen, 
  PlayCircle, 
  Sparkles, 
  GraduationCap, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Download, 
  ShieldCheck,
  ChevronRight,
  Bookmark
} from 'lucide-react';

interface HomePageProps {
  ebooks: Product[];
  recipes: VideoRecipe[];
  courses: VideoCourse[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectProduct: (product: Product) => void;
  onSelectRecipe: (recipe: VideoRecipe) => void;
  onQuickBuy: (product: Product) => void;
  onToast: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  ebooks,
  recipes,
  courses,
  onNavigate,
  onSelectProduct,
  onSelectRecipe,
  onQuickBuy,
  onToast,
}) => {
  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Main Discovery Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2338] via-[#1c3854] to-[#0f2338] text-white p-6 sm:p-10 md:p-12 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_70%_20%,rgba(157,189,209,0.18),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs text-xs font-medium text-[#cbe1ef]">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Nuova Edizione Digitale · Andreina Boutique</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            I contenuti digitali per la tua nutrizione quotidiana.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Scopri gli e-book operativi della Dott.ssa Andreina Olivieri, impara con le video ricette gratuite e sblocca le masterclass avanzate nel Club Premium.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('ebooks')}
              className="px-5 py-3 rounded-xl bg-white text-[#0f2338] font-semibold text-xs sm:text-sm hover:bg-[#edf4f8] transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-102"
            >
              <BookOpen className="w-4 h-4 text-[#2b5374]" />
              <span>Catalogo E-book</span>
            </button>

            <button
              onClick={() => onNavigate('recipes')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs"
            >
              <PlayCircle className="w-4 h-4 text-[#9dbdd1]" />
              <span>Video Ricette Gratuite</span>
            </button>

            <button
              onClick={() => onNavigate('premium')}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-102"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Club Premium</span>
            </button>
          </div>
        </div>

        {/* Quiet assurance strip */}
        <div className="relative z-10 pt-8 mt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#9dbdd1]" />
            <span>Download PDF Immediato</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#9dbdd1]" />
            <span>Ricette Video Gratuite</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#9dbdd1]" />
            <span>Lettura su Qualsiasi Dispositivo</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#9dbdd1]" />
            <span>Nessun Abbonamento Obbligatorio</span>
          </div>
        </div>
      </section>

      {/* 2. Featured Real E-books Section */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2b5374]">
              <BookOpen className="w-4 h-4" />
              <span>E-book Ufficiali</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0f2338] mt-0.5">
              Guide pratiche e ricettari da scaricare
            </h2>
          </div>

          <button
            onClick={() => onNavigate('ebooks')}
            className="text-xs font-semibold text-[#2b5374] hover:text-[#0f2338] flex items-center gap-1 group cursor-pointer"
          >
            <span>Vedi tutti ({ebooks.length})</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ebooks.map((ebook) => (
            <div
              key={ebook.id}
              className="bg-white rounded-3xl border border-[#e2e8f0] overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-[#cbdfe9] transition-all group"
            >
              <div 
                onClick={() => onSelectProduct(ebook)} 
                className="cursor-pointer"
              >
                {/* Book Cover Container */}
                <div className="relative aspect-[4/5] bg-[#f8fafc] p-4 flex items-center justify-center overflow-hidden border-b border-[#f1f5f9]">
                  <img
                    src={ebook.coverImage}
                    alt={ebook.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain drop-shadow-md group-hover:scale-103 transition-transform duration-300"
                  />
                  {ebook.badge && (
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#2b5374] text-white shadow-xs">
                      {ebook.badge}
                    </span>
                  )}
                  {ebook.originalPrice && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                      Sconto
                    </span>
                  )}
                </div>

                {/* Content info */}
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2b5374] block">
                    {ebook.categoryLabel}
                  </span>
                  <h3 className="font-editorial text-sm font-semibold text-[#0f2338] line-clamp-2 leading-snug group-hover:text-[#2b5374] transition-colors">
                    {ebook.title}
                  </h3>
                  <p className="text-xs text-[#64748b] line-clamp-2 leading-relaxed">
                    {ebook.shortDescription}
                  </p>
                </div>
              </div>

              {/* Price and CTA footer */}
              <div className="p-4 pt-0 border-t border-[#f8fafc] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-semibold text-base text-[#0f2338] tabular-nums">
                      {ebook.formattedPrice}
                    </span>
                    {ebook.originalPrice && (
                      <span className="text-xs text-slate-400 line-through tabular-nums">
                        € {ebook.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">Download PDF</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectProduct(ebook)}
                    className="px-3 py-1.5 text-xs font-semibold text-[#2b5374] bg-[#edf4f8] hover:bg-[#e1edf5] rounded-xl transition-colors cursor-pointer"
                  >
                    Dettagli
                  </button>
                  <button
                    onClick={() => onQuickBuy(ebook)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2b5374] hover:bg-[#1f3f5a] rounded-xl transition-colors cursor-pointer shadow-2xs"
                  >
                    Acquista
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 3. Free Video Recipes Section */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2b5374]">
              <PlayCircle className="w-4 h-4" />
              <span>Video Ricette Gratuite</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0f2338] mt-0.5">
              Idee in cucina spiegate passo dopo passo
            </h2>
          </div>

          <button
            onClick={() => onNavigate('recipes')}
            className="text-xs font-semibold text-[#2b5374] hover:text-[#0f2338] flex items-center gap-1 group cursor-pointer"
          >
            <span>Tutte le ricette ({recipes.length})</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="bg-white rounded-3xl border border-[#e2e8f0] overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-[#cbdfe9] transition-all cursor-pointer group"
            >
              <div>
                {/* Video thumbnail with play badge */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={recipe.thumbnailUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/15 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/95 text-[#0f2338] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  <span className="absolute bottom-2.5 right-2.5 text-[10px] font-bold text-white bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {recipe.videoDuration}
                  </span>

                  <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-white bg-[#2b5374]/90 backdrop-blur-xs px-2 py-0.5 rounded-md uppercase">
                    {recipe.categoryLabel}
                  </span>
                </div>

                {/* Text description */}
                <div className="p-4 space-y-1.5">
                  <h3 className="font-editorial text-sm font-semibold text-[#0f2338] line-clamp-2 group-hover:text-[#2b5374] transition-colors leading-snug">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-[#64748b] line-clamp-2">
                    {recipe.shortDescription}
                  </p>
                </div>
              </div>

              {/* Tags footer */}
              <div className="p-4 pt-0 border-t border-[#f8fafc] flex items-center justify-between text-[11px] text-[#4a5e73]">
                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>Prep: {recipe.prepTime}</span>
                </div>
                <span className="text-[#2b5374] font-semibold flex items-center gap-1">
                  <span>Guarda Video</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Premium Subscription Teaser Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 border border-amber-200 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>Club Esclusivo · Andreina Boutique Premium</span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-amber-950">
            Accedi a tutte le masterclass e ai protocolli nutrizionali riservati.
          </h2>

          <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed">
            Con l'abbonamento Premium sblocchi immediatamente le video lezioni approfondite della Dottoressa, le dispense operative in PDF e la sessione esclusiva di Meal Prep settimanale da 90 minuti.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-amber-900">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-700" />
              <span>Video lezioni in 4K</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-700" />
              <span>Dispense PDF da 64 pagine</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-700" />
              <span>Cancellazione in un click</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-md text-center min-w-[260px] space-y-3">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
            Piano Consigliato
          </span>
          <div>
            <span className="font-editorial text-3xl font-bold text-[#0f2338]">€ 9,90</span>
            <span className="text-xs text-slate-500"> / al mese</span>
          </div>
          <p className="text-[11px] text-slate-600">
            Accesso completo a tutti i contenuti riservati
          </p>
          <button
            onClick={() => onNavigate('premium')}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Scopri il Club Premium
          </button>
        </div>
      </section>

      {/* 5. Video Courses Section */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2b5374]">
              <GraduationCap className="w-4 h-4" />
              <span>Video Corsi Strutturati</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0f2338] mt-0.5">
              Corsi completi suddivisi in moduli pratici
            </h2>
          </div>

          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-semibold text-[#2b5374] hover:text-[#0f2338] flex items-center gap-1 group cursor-pointer"
          >
            <span>Tutti i corsi ({courses.length})</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-[#e2e8f0] p-5 flex flex-col sm:flex-row gap-5 items-start justify-between hover:shadow-lg hover:border-[#cbdfe9] transition-all group"
            >
              <div className="relative aspect-video w-full sm:w-48 rounded-2xl overflow-hidden shrink-0 bg-slate-900">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-[#0f2338] flex items-center justify-center shadow-md">
                    <PlayCircle className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                {course.isIncludedInPremium && (
                  <span className="absolute top-2 left-2 text-[9px] font-bold text-amber-950 bg-amber-300 px-2 py-0.5 rounded shadow-xs">
                    Incluso in Premium
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
                  <span className="font-semibold text-[#2b5374]">{course.modulesCount} Moduli</span>
                  <span>·</span>
                  <span>{course.totalDuration}</span>
                </div>
                <h3 className="font-editorial text-base font-semibold text-[#0f2338] leading-snug group-hover:text-[#2b5374] transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-[#64748b] line-clamp-2">
                  {course.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#0f2338] tabular-nums">
                    {course.formattedPrice}
                  </span>
                  <button
                    onClick={() => onNavigate('courses')}
                    className="px-3 py-1.5 text-xs font-semibold text-[#2b5374] bg-[#edf4f8] hover:bg-[#e1edf5] rounded-xl transition-colors cursor-pointer"
                  >
                    Vedi Programma
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
