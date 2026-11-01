import React, { useState } from 'react';
import { PREMIUM_EXCLUSIVE_ITEMS } from '../data/products';
import { UserProfile } from '../types';
import { 
  Sparkles, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Download, 
  PlayCircle, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Zap,
  HelpCircle
} from 'lucide-react';

interface PremiumPageProps {
  user: UserProfile;
  onOpenCheckoutSubscription: (plan: 'monthly' | 'annual') => void;
  onToggleSubscriptionDemo: () => void;
  onToast: (msg: string) => void;
}

export const PremiumPage: React.FC<PremiumPageProps> = ({
  user,
  onOpenCheckoutSubscription,
  onToggleSubscriptionDemo,
  onToast,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const monthlyPrice = 9.90;
  const annualPrice = 89.00; // ~7,41€/mese, 2 mesi gratis

  const hasAccess = user.hasActiveSubscription;

  return (
    <div className="space-y-12 pb-16">
      
      {/* Demo State Switch Bar (Allows user to preview both subscriber and non-subscriber views) */}
      <div className="p-3.5 rounded-2xl bg-[#edf4f8] border border-[#cbdfe9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#2b5374]">
          <Zap className="w-4 h-4 text-amber-600" />
          <span>
            Stato Attuale del tuo Account: <strong>{hasAccess ? 'Abbonato Premium Attivo' : 'Utente Non Abbonato (Visitatore Base)'}</strong>
          </span>
        </div>
        <button
          onClick={onToggleSubscriptionDemo}
          className="px-3 py-1.5 bg-white border border-[#cbdfe9] text-[#2b5374] hover:bg-[#dcebf4] font-semibold rounded-xl transition-colors cursor-pointer"
        >
          {hasAccess ? 'Simula Vista Non Abbonato' : 'Simula Attivazione Abbonamento'}
        </button>
      </div>

      {/* Hero Presentation */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0b1726] via-[#162e47] to-[#0b1726] text-white p-6 sm:p-10 md:p-12 overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_75%_25%,rgba(245,158,11,0.18),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Club Esclusivo · Andreina Boutique</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Tutti i contenuti avanzati in un unico spazio riservato.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            L'abbonamento Premium è pensato per chi desidera una guida nutrizionale continua: lezioni approfondite, dispense scientifiche stampabili, masterclass in video 4K e sessioni operative di cucina senza interruzioni.
          </p>

          {/* Subscription Action or Active Status Indicator */}
          <div className="pt-2">
            {hasAccess ? (
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
                <Unlock className="w-4 h-4 text-emerald-400" />
                <span>Il tuo abbonamento è attivo · Accesso illimitato sbloccato</span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenCheckoutSubscription(billingCycle)}
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-102"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Abbonati Ora a € {billingCycle === 'monthly' ? monthlyPrice.toFixed(2) : annualPrice.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plan Pricing Selector (Shown when not subscribed or for management) */}
      {!hasAccess && (
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0f2338]">
              Scegli la modalità di abbonamento
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b]">
              Accesso immediato a tutti i contenuti. Puoi disdire il rinnovo in qualunque momento dalla tua area personale con un solo click.
            </p>

            {/* Toggle Monthly / Annual */}
            <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 mt-2">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-[#0f2338] shadow-xs'
                    : 'text-[#64748b] hover:text-[#0f2338]'
                }`}
              >
                Fatturazione Mensile
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-white text-[#0f2338] shadow-xs'
                    : 'text-[#64748b] hover:text-[#0f2338]'
                }`}
              >
                <span>Fatturazione Annuale</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  Risparmi 2 Mesi
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Monthly Card */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between ${
              billingCycle === 'monthly'
                ? 'bg-white border-[#2b5374] ring-2 ring-[#2b5374]/20 shadow-lg'
                : 'bg-white/80 border-[#e2e8f0]'
            }`}>
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2b5374] block">
                  Piano Mensile Flessibile
                </span>
                <div>
                  <span className="font-editorial text-3xl font-bold text-[#0f2338]">€ 9,90</span>
                  <span className="text-xs text-slate-500"> / mese</span>
                </div>
                <p className="text-xs text-[#64748b]">
                  Ideale per provare la piattaforma e accedere subito a tutti i materiali digitali.
                </p>

                <ul className="space-y-2.5 text-xs text-[#334155] pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Accesso illimitato alle video masterclass</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Download dispense e guide PDF riservate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Nuovi contenuti pubblicati ogni mese</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Nessun vincolo: cancella quando vuoi</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenCheckoutSubscription('monthly')}
                className="mt-6 w-full py-3 rounded-xl bg-[#2b5374] hover:bg-[#1f3f5a] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
              >
                Abbonati a € 9,90/mese
              </button>
            </div>

            {/* Annual Card */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between relative overflow-hidden ${
              billingCycle === 'annual'
                ? 'bg-gradient-to-b from-amber-50/60 to-white border-amber-300 ring-2 ring-amber-300/30 shadow-lg'
                : 'bg-white/80 border-[#e2e8f0]'
            }`}>
              <span className="absolute top-4 right-4 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md bg-amber-400 text-slate-950">
                Più Conveniente
              </span>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                  Piano Annuale Completo
                </span>
                <div>
                  <span className="font-editorial text-3xl font-bold text-[#0f2338]">€ 89,00</span>
                  <span className="text-xs text-slate-500"> / all'anno (pari a € 7,41/mese)</span>
                </div>
                <p className="text-xs text-[#64748b]">
                  Accesso per 365 giorni a tutto il catalogo presente e a tutti i rilasci futuri.
                </p>

                <ul className="space-y-2.5 text-xs text-[#334155] pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Tutti i vantaggi del piano mensile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>2 Mesi interamente gratuiti</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Accesso prioritario a tutti i futuri video corsi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Archivio completo sempre a disposizione</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenCheckoutSubscription('annual')}
                className="mt-6 w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Abbonati a € 89,00/anno
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Catalog of Exclusive Items (Locked for non-subscribers with paywall screen, Unlocked for subscribers) */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2b5374]">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Contenuti Riservati ai Membri</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0f2338] mt-0.5">
            Archivio Masterclass & Dispense Operative
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PREMIUM_EXCLUSIVE_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl border p-6 flex flex-col justify-between transition-all ${
                hasAccess
                  ? 'bg-white border-[#cbdfe9] shadow-xs hover:shadow-md'
                  : 'bg-[#fafcff] border-[#e2e8f0] relative overflow-hidden'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-md">
                    {item.badge}
                  </span>
                  {hasAccess ? (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Sbloccato</span>
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Riservato</span>
                    </span>
                  )}
                </div>

                <h3 className="font-editorial text-base font-semibold text-[#0f2338] leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#64748b] leading-relaxed">
                  {item.description}
                </p>

                <div className="text-[11px] text-[#2b5374] font-medium pt-1">
                  <span>{item.duration}</span>
                </div>
              </div>

              {/* Action Button: Play/Download if subscribed, or Paywall prompt if not */}
              <div className="pt-6 border-t border-[#f1f5f9] mt-4">
                {hasAccess ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => onToast(`Riproduzione avviata per: ${item.title}`)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#2b5374] hover:bg-[#1f3f5a] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Guarda Masterclass</span>
                    </button>
                    {item.hasPdfHandout && (
                      <button
                        onClick={() => onToast(`Download avviato: ${item.handoutName}`)}
                        className="w-full py-2 px-3 rounded-xl bg-[#edf4f8] hover:bg-[#e1edf5] text-[#2b5374] text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Scarica Dispensa PDF</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => onOpenCheckoutSubscription(billingCycle)}
                    className="w-full py-2.5 px-3 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-800" />
                    <span>Sblocca con Premium</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* FAQ on Subscription */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e2e8f0] space-y-4 max-w-3xl mx-auto">
        <h3 className="font-editorial text-lg font-semibold text-[#0f2338]">
          Domande Frequenti sull'Abbonamento
        </h3>
        
        <div className="space-y-3 text-xs text-[#4a5e73]">
          <div>
            <h4 className="font-semibold text-[#0f2338]">Come funziona l'accesso ai contenuti?</h4>
            <p className="mt-0.5">Non appena completi la registrazione, l'intero archivio video e le dispense PDF si sbloccano istantaneamente nel tuo account.</p>
          </div>
          <div>
            <h4 className="font-semibold text-[#0f2338]">Posso disdire quando voglio?</h4>
            <p className="mt-0.5">Sì, in qualsiasi momento dalla sezione Profilo. Non ci sono penali né vincoli di permanenza.</p>
          </div>
          <div>
            <h4 className="font-semibold text-[#0f2338]">Gli ebook della Boutique sono inclusi?</h4>
            <p className="mt-0.5">I quattro volumi ufficiali sono acquistabili separatamente, mentre tutte le dispense, le schede operative e le video masterclass del Club sono incluse nell'abbonamento.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
