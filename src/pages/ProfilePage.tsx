import React, { useState } from 'react';
import { UserProfile, Product, VideoRecipe, VideoCourse } from '../types';
import { 
  User, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  Receipt, 
  Settings, 
  LogOut, 
  Download, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Calendar,
  AlertCircle,
  Zap,
  Bookmark
} from 'lucide-react';

interface ProfilePageProps {
  user: UserProfile;
  allEbooks: Product[];
  allCourses: VideoCourse[];
  allRecipes: VideoRecipe[];
  onOpenPdfReader: (ebook: Product) => void;
  onLogout: () => void;
  onLogin: (email: string, name: string) => void;
  onToggleSubscription: () => void;
  onToast: (msg: string) => void;
  onNavigateToTab: (tab: any) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  allEbooks,
  allCourses,
  allRecipes,
  onOpenPdfReader,
  onLogout,
  onLogin,
  onToggleSubscription,
  onToast,
  onNavigateToTab,
}) => {
  const [activeTab, setActiveTab] = useState<'ebooks' | 'courses' | 'premium' | 'orders' | 'settings'>('ebooks');
  
  // Auth state for non-logged-in view
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  // Unlocked items
  const myEbooks = allEbooks.filter(b => user.purchasedProductIds.includes(b.id));
  const mySavedRecipes = allRecipes.filter(r => user.savedRecipeIds.includes(r.id));

  // If user is logged out, show the auth screen
  if (!user.isLoggedIn) {
    return (
      <div className="max-w-md mx-auto py-10 px-4">
        <div className="bg-white rounded-3xl border border-[#cbdfe9] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2b5374] to-[#0f2338] text-white flex items-center justify-center font-editorial text-xl font-bold mx-auto italic shadow-xs">
              AB
            </div>
            <h2 className="font-editorial text-2xl font-semibold text-[#0f2338]">
              {authMode === 'login' && 'Accedi ad Andreina Boutique'}
              {authMode === 'register' && 'Crea il tuo Account'}
              {authMode === 'forgot' && 'Recupera la Password'}
            </h2>
            <p className="text-xs text-[#64748b]">
              {authMode === 'login' && 'Inserisci le tue credenziali per accedere alla tua libreria digitale.'}
              {authMode === 'register' && 'Registrati per salvare le ricette e accedere agli ebook acquistati.'}
              {authMode === 'forgot' && 'Ti invieremo un link via email per reimpostare la tua password.'}
            </p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (authMode === 'forgot') {
                onToast('Email di recupero inviata a ' + authEmail);
                setAuthMode('login');
              } else {
                onLogin(authEmail || 'chiara.rossi@esempio.it', authName || 'Chiara Rossi');
                onToast('Accesso effettuato con successo.');
              }
            }} 
            className="space-y-4 text-xs"
          >
            {authMode === 'register' && (
              <div>
                <label className="block font-medium text-[#0f2338] mb-1">Nome e Cognome</label>
                <input
                  type="text"
                  required
                  placeholder="Es. Chiara Rossi"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#cbd5e1] rounded-xl focus:outline-none focus:border-[#2b5374]"
                />
              </div>
            )}

            <div>
              <label className="block font-medium text-[#0f2338] mb-1">Indirizzo Email</label>
              <input
                type="email"
                required
                placeholder="nome@esempio.it"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full px-3 py-2 border border-[#cbd5e1] rounded-xl focus:outline-none focus:border-[#2b5374]"
              />
            </div>

            {authMode !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-medium text-[#0f2338]">Password</label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-[11px] text-[#2b5374] hover:underline"
                    >
                      Password dimenticata?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-[#cbd5e1] rounded-xl focus:outline-none focus:border-[#2b5374]"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#2b5374] hover:bg-[#1f3f5a] text-white font-semibold rounded-xl transition-all cursor-pointer shadow-xs mt-2"
            >
              {authMode === 'login' && 'Entra nel tuo Profilo'}
              {authMode === 'register' && 'Completa Registrazione'}
              {authMode === 'forgot' && 'Invia Istruzioni di Reset'}
            </button>
          </form>

          <div className="pt-4 border-t border-[#f1f5f9] text-center text-xs text-[#64748b]">
            {authMode === 'login' ? (
              <p>
                Non hai ancora un account?{' '}
                <button
                  onClick={() => setAuthMode('register')}
                  className="text-[#2b5374] font-semibold hover:underline"
                >
                  Registrati ora
                </button>
              </p>
            ) : (
              <p>
                Hai già un account?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="text-[#2b5374] font-semibold hover:underline"
                >
                  Torna al Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      
      {/* User Header Profile Card */}
      <div className="rounded-3xl bg-white border border-[#e2e8f0] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2b5374] to-[#0f2338] text-white flex items-center justify-center font-editorial text-2xl font-bold shadow-md">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-editorial text-2xl font-semibold text-[#0f2338]">
                {user.name}
              </h1>
              {user.hasActiveSubscription && (
                <span className="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  Premium
                </span>
              )}
            </div>
            <p className="text-xs text-[#64748b]">{user.email}</p>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Iscritto da {user.registeredDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onLogout();
              onToast('Disconnessione effettuata.');
            }}
            className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Esci</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#e2e8f0]">
        <button
          onClick={() => setActiveTab('ebooks')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'ebooks'
              ? 'bg-[#2b5374] text-white shadow-xs'
              : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f8fafc]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>I Miei E-book ({myEbooks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'courses'
              ? 'bg-[#2b5374] text-white shadow-xs'
              : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f8fafc]'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>I Miei Video Corsi</span>
        </button>

        <button
          onClick={() => setActiveTab('premium')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'premium'
              ? 'bg-[#2b5374] text-white shadow-xs'
              : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f8fafc]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Abbonamento Premium</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-[#2b5374] text-white shadow-xs'
              : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f8fafc]'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>I Miei Acquisti & Ricevute</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-[#2b5374] text-white shadow-xs'
              : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f8fafc]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Dati Personali</span>
        </button>
      </div>

      {/* Tab 1: I Miei E-book */}
      {activeTab === 'ebooks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-editorial text-xl font-semibold text-[#0f2338]">
              E-book e Manuali Sbloccati
            </h2>
            <button
              onClick={() => onNavigateToTab('ebooks')}
              className="text-xs text-[#2b5374] font-semibold hover:underline"
            >
              Esplora catalogo
            </button>
          </div>

          {myEbooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myEbooks.map((ebook) => (
                <div
                  key={ebook.id}
                  className="bg-white rounded-3xl border border-[#e2e8f0] p-5 flex items-center gap-5 shadow-xs hover:border-[#cbdfe9] transition-all"
                >
                  <img
                    src={ebook.coverImage}
                    alt={ebook.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-contain rounded-xl bg-[#f8fafc] border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-[#2b5374] block">
                      {ebook.categoryLabel}
                    </span>
                    <h3 className="font-editorial text-sm font-semibold text-[#0f2338] line-clamp-1">
                      {ebook.title}
                    </h3>
                    <p className="text-[11px] text-[#64748b]">{ebook.format}</p>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onOpenPdfReader(ebook)}
                        className="px-3 py-1.5 bg-[#2b5374] hover:bg-[#1f3f5a] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Leggi Online</span>
                      </button>

                      <button
                        onClick={() => onToast(`Download avviato per: ${ebook.title}.pdf`)}
                        className="p-1.5 text-[#64748b] hover:text-[#0f2338] hover:bg-[#edf4f8] rounded-xl transition-colors cursor-pointer"
                        title="Scarica PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-[#e2e8f0] space-y-3">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-[#64748b]">Non hai ancora acquistato nessun e-book.</p>
              <button
                onClick={() => onNavigateToTab('ebooks')}
                className="px-4 py-2 bg-[#2b5374] text-white text-xs font-semibold rounded-xl hover:bg-[#1f3f5a] cursor-pointer"
              >
                Scopri gli E-book
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: I Miei Corsi */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <h2 className="font-editorial text-xl font-semibold text-[#0f2338]">
            I tuoi Video Corsi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allCourses.map((course) => {
              const isIncluded = user.hasActiveSubscription && course.isIncludedInPremium;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl border border-[#e2e8f0] p-5 flex items-center gap-5 shadow-xs hover:border-[#cbdfe9] transition-all"
                >
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-24 aspect-video object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-[#2b5374] block">
                      {isIncluded ? 'Sbloccato con Premium' : 'Corso Digitale'}
                    </span>
                    <h3 className="font-editorial text-sm font-semibold text-[#0f2338] line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-[11px] text-[#64748b]">{course.totalDuration}</p>

                    <button
                      onClick={() => onNavigateToTab('courses')}
                      className="mt-2 px-3 py-1.5 bg-[#2b5374] hover:bg-[#1f3f5a] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Accedi alle Lezioni
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Gestione Abbonamento Premium */}
      {activeTab === 'premium' && (
        <div className="bg-white rounded-3xl border border-[#e2e8f0] p-6 sm:p-8 space-y-6 max-w-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-editorial text-xl font-semibold text-[#0f2338]">
                Stato dell'Abbonamento Premium
              </h2>
              <p className="text-xs text-[#64748b] mt-0.5">
                Gestisci la tua iscrizione al Club di Andreina Boutique.
              </p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              user.hasActiveSubscription 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-slate-100 text-slate-600'
            }`}>
              {user.hasActiveSubscription ? 'Attivo' : 'Non Attivo'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#fafcff] border border-[#cbdfe9] space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#64748b]">Piano sottoscritto:</span>
              <strong className="text-[#0f2338]">
                {user.hasActiveSubscription 
                  ? user.subscriptionPlan === 'annual' ? 'Piano Annuale' : 'Piano Mensile Flessibile'
                  : 'Nessun piano'}
              </strong>
            </div>
            {user.hasActiveSubscription && (
              <div className="flex justify-between">
                <span className="text-[#64748b]">Prossimo rinnovo programmato:</span>
                <strong className="text-[#0f2338]">{user.subscriptionRenewalDate || '28 Novembre 2026'}</strong>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#64748b]">Metodo di pagamento associato:</span>
              <strong className="text-[#0f2338]">•••• 4242 (Stripe Connect)</strong>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                onToggleSubscription();
                onToast(user.hasActiveSubscription ? 'Abbonamento disattivato per il prossimo ciclo.' : 'Abbonamento attivato con successo!');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                user.hasActiveSubscription
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
              }`}
            >
              {user.hasActiveSubscription ? 'Disdici Rinnovo Automatico' : 'Attiva Abbonamento Premium'}
            </button>

            <button
              onClick={() => onToast('Ricevuta fiscale dell’abbonamento scaricata.')}
              className="px-4 py-2.5 bg-[#edf4f8] hover:bg-[#e1edf5] text-[#2b5374] text-xs font-semibold rounded-xl cursor-pointer"
            >
              Scarica Ultima Fattura
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Storico Ordini */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-[#e2e8f0] p-6 space-y-4">
          <h2 className="font-editorial text-xl font-semibold text-[#0f2338]">
            I tuoi Ordini Digitali
          </h2>

          <div className="space-y-3">
            {user.orders.map((ord) => (
              <div key={ord.id} className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[#0f2338]">Ordine #{ord.orderNumber}</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b] mt-1">
                    {ord.items.map(i => i.title).join(' · ')}
                  </p>
                  <span className="text-[11px] text-slate-400">{ord.date} · Pagamento Verificato</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm text-[#0f2338] tabular-nums">
                    € {ord.total.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onToast(`Download avviato: ${ord.invoicePdfName}`)}
                    className="px-3 py-1.5 text-xs text-[#2b5374] bg-[#edf4f8] hover:bg-[#e1edf5] rounded-xl font-semibold transition-colors cursor-pointer"
                  >
                    Scarica Ricevuta PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Dati Personali */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-[#e2e8f0] p-6 sm:p-8 space-y-6 max-w-xl">
          <h2 className="font-editorial text-xl font-semibold text-[#0f2338]">
            Dati Personali & Sicurezza
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-[#0f2338] mb-1">Nome visualizzato</label>
              <input
                type="text"
                readOnly
                value={user.name}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-slate-600"
              />
            </div>

            <div>
              <label className="block font-medium text-[#0f2338] mb-1">Email associata</label>
              <input
                type="text"
                readOnly
                value={user.email}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl text-slate-600"
              />
            </div>

            <button
              onClick={() => onToast('Profilo sincronizzato correttamente.')}
              className="px-4 py-2 bg-[#2b5374] text-white rounded-xl font-semibold hover:bg-[#1f3f5a] cursor-pointer"
            >
              Salva Modifiche
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
