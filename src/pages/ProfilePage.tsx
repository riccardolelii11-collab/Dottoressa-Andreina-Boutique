import React, { useState, useEffect } from 'react';
import { UserProfile, Product } from '../types';
import { 
  User, 
  Mail, 
  Lock, 
  Phone,
  ShieldCheck, 
  BookOpen, 
  ShoppingBag, 
  LogOut, 
  Key, 
  Check, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  HelpCircle,
  ExternalLink,
  Database,
  RefreshCw,
  Server,
  Settings
} from 'lucide-react';
import { 
  loginUser, 
  registerUser, 
  resetUserPassword, 
  logoutUser, 
  isSupabaseConfigured,
  checkSupabaseConnection,
  setSupabaseConfig,
  getSupabaseUrl
} from '../lib/supabase';

interface ProfilePageProps {
  user: UserProfile;
  allEbooks: Product[];
  cartCount: number;
  onOpenCart?: () => void;
  onUpdateUser: (updatedUser: Partial<UserProfile>) => void;
  onOpenPdfReader: (product: Product) => void;
  onNavigateToCatalog: () => void;
  onToast: (msg: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  allEbooks,
  cartCount,
  onOpenCart,
  onUpdateUser,
  onOpenPdfReader,
  onNavigateToCatalog,
  onToast,
}) => {
  // Auth Form State (when not logged in or switching accounts)
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  
  // Registration & Login inputs
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [isEditingData, setIsEditingData] = useState(false);

  // Supabase Live Diagnostic & Connection State
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [supabaseTestResult, setSupabaseTestResult] = useState<{
    connected: boolean;
    message: string;
    url?: string;
  } | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [inputUrl, setInputUrl] = useState(getSupabaseUrl() || '');
  const [inputKey, setInputKey] = useState('');
  const [configFeedback, setConfigFeedback] = useState<{ success: boolean; text: string } | null>(null);

  // Run initial passive check for Supabase
  useEffect(() => {
    if (isSupabaseConfigured()) {
      checkSupabaseConnection().then((res) => {
        setSupabaseTestResult(res);
      });
    }
  }, []);

  // Purchased products list
  const purchasedEbooks = allEbooks.filter((b) => user.purchasedProductIds.includes(b.id));

  // User initials for monogram avatar
  const getInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    if (user.name && user.name.trim().length > 0) {
      const parts = user.name.trim().split(' ');
      if (parts.length >= 2) {
        return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
      }
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Submit Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!email || !password) {
      setAuthError('Inserisci sia l\'indirizzo email sia la password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginUser(email, password);
      if (res.success && res.user) {
        const full = `${res.user.firstName || ''} ${res.user.lastName || ''}`.trim() || res.user.email.split('@')[0];
        onUpdateUser({
          isLoggedIn: true,
          email: res.user.email,
          firstName: res.user.firstName,
          lastName: res.user.lastName,
          phone: res.user.phone || '',
          name: full
        });
        onToast(`Bentornato, ${full}!`);
      } else {
        setAuthError(res.message || 'Credenziali non valide. Riprova.');
      }
    } catch {
      setAuthError('Si è verificato un errore durante l\'accesso.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Registration (Nome, Cognome, Telefono, Email, Password)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setAuthError('Inserisci sia il nome sia il cognome.');
      return;
    }
    if (!email.trim() || !password) {
      setAuthError('Inserisci un indirizzo email valido e una password.');
      return;
    }
    if (password.length < 6) {
      setAuthError('La password deve contenere almeno 6 caratteri.');
      return;
    }
    if (password !== confirmPassword) {
      setAuthError('Le password inserite non coincidono.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await registerUser(
        email.trim(), 
        password, 
        firstName.trim(), 
        lastName.trim(), 
        phone.trim()
      );

      if (res.success && res.user) {
        const fullName = `${firstName.trim()} ${lastName.trim()}`;
        onUpdateUser({
          isLoggedIn: true,
          email: res.user.email,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          name: fullName,
          registeredDate: new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric' }).format(new Date())
        });
        onToast(`Benvenuto/a, ${fullName}! Registrazione completata.`);
      } else {
        setAuthError(res.message || 'Errore durante la registrazione.');
      }
    } catch {
      setAuthError('Si è verificato un errore durante la registrazione.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Password Reset
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setResetMessage(null);

    if (!email.trim()) {
      setAuthError('Inserisci l\'indirizzo email del tuo account.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await resetUserPassword(email.trim());
      if (res.success) {
        setResetMessage(res.message);
      } else {
        setAuthError(res.message || 'Impossibile inviare la richiesta di reset.');
      }
    } catch {
      setAuthError('Errore durante la richiesta di recupero password.');
    } finally {
      setIsLoading(false);
    }
  };

  // Run live Supabase test
  const handleRunSupabaseTest = async () => {
    setIsTestingSupabase(true);
    setSupabaseTestResult(null);
    try {
      const result = await checkSupabaseConnection();
      setSupabaseTestResult(result);
      if (result.connected) {
        onToast('Supabase verificato con successo!');
      }
    } finally {
      setIsTestingSupabase(false);
    }
  };

  // Save Supabase credentials from UI
  const handleSaveSupabaseCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfigFeedback(null);

    const res = setSupabaseConfig(inputUrl, inputKey);
    if (!res.success) {
      setConfigFeedback({ success: false, text: res.message });
      return;
    }

    setConfigFeedback({ success: true, text: 'Credenziali memorizzate! Verifica in corso...' });
    
    setIsTestingSupabase(true);
    const testRes = await checkSupabaseConnection();
    setIsTestingSupabase(false);
    setSupabaseTestResult(testRes);

    if (testRes.connected) {
      setConfigFeedback({ success: true, text: 'Supabase collegato e attivo al 100%!' });
      setTimeout(() => setShowConfigModal(false), 1500);
    } else {
      setConfigFeedback({ success: false, text: testRes.message });
    }
  };

  // Save personal details update
  const handleSaveProfileChanges = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || user.name;
    onUpdateUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      name: fullName,
      phone: phone.trim()
    });
    setIsEditingData(false);
    onToast('Dati del profilo aggiornati con successo!');
  };

  // Logout
  const handleLogout = async () => {
    await logoutUser();
    onUpdateUser({
      isLoggedIn: false,
      name: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    });
    setAuthMode('login');
    setPassword('');
    setConfirmPassword('');
    onToast('Disconnessione effettuata con successo.');
  };

  return (
    <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-8 font-sans antialiased text-brand-slate space-y-6 md:space-y-8 pb-32">
      
      {/* 1. Header Navigation Bar (Brand Identity A.O.) */}
      <header className="flex items-center justify-between pb-4 border-b border-brand-teal/20" data-purpose="profile-header">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-full border border-brand-teal flex items-center justify-center bg-white shadow-xs">
            <span className="font-serif font-bold text-brand-slate text-base tracking-tight">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-semibold tracking-wide text-brand-slate leading-none">A.O.</span>
            <span className="text-[9px] uppercase tracking-widest text-brand-teal font-medium mt-0.5">
              Dott.ssa Andreina Olivieri
            </span>
          </div>
        </div>

        {/* Right Cart Action with live count badge */}
        <button 
          type="button"
          onClick={onOpenCart}
          aria-label="Carrello" 
          className="relative p-2 rounded-full bg-white hover:bg-slate-50 border border-brand-teal/30 text-brand-slate transition-colors shadow-2xs cursor-pointer"
        >
          <svg className="w-5 h-5 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13m-10.5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-teal text-white text-[10px] font-semibold flex items-center justify-center rounded-full leading-none">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* 2. Page Section Title */}
      <section className="px-1" data-purpose="section-title">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="font-serif uppercase tracking-wider text-base sm:text-xl font-semibold text-brand-slate/90 border-l-2 border-brand-teal pl-3 py-0.5">
            {user.isLoggedIn ? 'Il Tuo Profilo & Libreria' : 'Accesso & Registrazione Account'}
          </h1>
          <span className="text-xs text-slate-500 font-medium">
            Spazio sicuro per i tuoi e-book, credenziali e dati
          </span>
        </div>
      </section>

      {/* ========================================================
          CASE A: USER IS NOT LOGGED IN (LOGIN / REGISTRAZIONE / FORGOT)
          ======================================================== */}
      {!user.isLoggedIn ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Main Auth Form Card */}
          <div className="md:col-span-8 editorial-card bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-brand-teal/20 shadow-xs space-y-6">
            
            {/* Tab Selector: Accedi vs Crea un Account vs Recupera */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setAuthError(null); setResetMessage(null); }}
                className={`text-xs sm:text-sm font-semibold pb-1 cursor-pointer transition-colors relative ${
                  authMode === 'login'
                    ? 'text-brand-slate font-bold'
                    : 'text-slate-400 hover:text-brand-slate'
                }`}
              >
                Accedi
                {authMode === 'login' && (
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-brand-teal rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => { setAuthMode('register'); setAuthError(null); setResetMessage(null); }}
                className={`text-xs sm:text-sm font-semibold pb-1 cursor-pointer transition-colors relative ${
                  authMode === 'register'
                    ? 'text-brand-slate font-bold'
                    : 'text-slate-400 hover:text-brand-slate'
                }`}
              >
                Crea un Account
                {authMode === 'register' && (
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-brand-teal rounded-full" />
                )}
              </button>

              {authMode === 'forgot' && (
                <button
                  type="button"
                  className="text-xs sm:text-sm font-semibold pb-1 text-brand-slate font-bold relative"
                >
                  Recupero Password
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-brand-teal rounded-full" />
                </button>
              )}
            </div>

            {/* Error Message Box */}
            {authError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Success Reset Message */}
            {resetMessage && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-semibold text-emerald-800">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Email di ripristino inviata</span>
                </div>
                <p>{resetMessage}</p>
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setResetMessage(null); }}
                  className="text-xs font-bold text-emerald-800 underline cursor-pointer mt-1 block"
                >
                  Torna all'accesso
                </button>
              </div>
            )}

            {/* TAB 1: LOGIN FORM */}
            {authMode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-slate block">
                    Indirizzo Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="es. nome@dominio.it"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-brand-surface border border-brand-teal/20 rounded-xl text-xs sm:text-sm text-brand-slate placeholder:text-slate-400 focus:outline-none focus:border-brand-teal transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-brand-slate block">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => { setAuthMode('forgot'); setAuthError(null); }}
                      className="text-[11px] text-brand-teal hover:underline cursor-pointer"
                    >
                      Hai dimenticato la password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-brand-surface border border-brand-teal/20 rounded-xl text-xs sm:text-sm text-brand-slate placeholder:text-slate-400 focus:outline-none focus:border-brand-teal transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-brand-teal hover:bg-brand-tealDark text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer mt-2 disabled:opacity-50"
                >
                  {isLoading ? 'Accesso in corso...' : 'Accedi alla tua Libreria'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* TAB 2: REGISTRATION FORM (NOME, COGNOME, TELEFONO, EMAIL, PASSWORD) */}
            {authMode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                
                {/* Nome e Cognome Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-slate block">
                      Nome <span className="text-brand-teal">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="es. Mario"
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-brand-surface border border-brand-teal/20 rounded-xl text-xs sm:text-sm text-brand-slate placeholder:text-slate-400 focus:outline-none focus:border-brand-teal transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-slate block">
                      Cognome <span className="text-brand-teal">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="es. Rossi"
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-brand-surface border border-brand-teal/20 rounded-xl text-xs sm:text-sm text-brand-slate placeholder:text-slate-400 focus:outline-none focus:border-brand-teal transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Numero di Cellulare / Telefono */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-brand-slate block">
                      Numero di Cellulare <span className="text-brand-teal">*</span>
                    </label>
                    <span className="text-[10px] text-slate-400">Salvataggio automatico per ordini & sicurezza</span>
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+39 333 1234567"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-brand-surface border border-brand-teal/20 rounded-xl text-xs sm:text-sm text-brand-slate placeholder:text-slate-400 focus:outline-none focus:border-brand-teal transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-slate block">
                    Indirizzo Email <span className="text-brand-teal">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nome.cognome@email.it"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-brand-surface border border-brand-teal/20 rounded-xl text-xs sm:text-sm text-brand-slate placeholder:text-slate-400 focus:outline-none focus:border-brand-teal transition-colors"
                    />
                  </div>
                </div>

                {/* Password e Conferma Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-slate block">
                      Password (min. 6 car.) <span className="text-brand-teal">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="w-full pl-10 pr-4 py-2.5 bg-brand-surface border border-brand-teal/20 rounded-xl text-xs sm:text-sm text-brand-slate placeholder:text-slate-400 focus:outline-none focus:border-brand-teal transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-slate block">
                      Conferma Password <span className="text-brand-teal">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="w-full pl-10 pr-4 py-2.5 bg-brand-surface border border-brand-teal/20 rounded-xl text-xs sm:text-sm text-brand-slate placeholder:text-slate-400 focus:outline-none focus:border-brand-teal transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-brand-teal hover:bg-brand-tealDark text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? 'Creazione account in corso...' : 'Crea il Tuo Account Sicuro'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: PASSWORD RECOVERY */}
            {authMode === 'forgot' && !resetMessage && (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-teal/20 text-xs text-slate-600 leading-relaxed">
                  Inserisci l'indirizzo email con cui ti sei registrato. Riceverai un link sicuro per reimpostare la tua password senza perdere l'accesso ai tuoi e-book.
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-slate block">
                    La tua Email di Registrazione
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="es. nome@dominio.it"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-brand-surface border border-brand-teal/20 rounded-xl text-xs sm:text-sm text-brand-slate placeholder:text-slate-400 focus:outline-none focus:border-brand-teal transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 bg-brand-teal hover:bg-brand-tealDark text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? 'Invio in corso...' : 'Invia Link di Ripristino'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setAuthError(null); }}
                    className="py-3 px-4 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs sm:text-sm font-medium cursor-pointer"
                  >
                    Annulla
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Side Column: Supabase Connection Tester & Guarantees */}
          <div className="md:col-span-4 space-y-4">
            
            {/* Supabase Realtime Tester Card */}
            <div className="p-5 rounded-2xl sm:rounded-3xl bg-white border border-brand-teal/20 space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand-slate">
                  <Database className="w-4 h-4 text-brand-teal" />
                  <span className="font-serif text-sm font-bold">
                    Test Connessione Supabase
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfigModal(!showConfigModal)}
                  className="p-1.5 text-slate-400 hover:text-brand-slate rounded-lg hover:bg-slate-100 transition-colors"
                  title="Configura credenziali Supabase"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {/* Status pill */}
              <div className="space-y-2">
                {supabaseTestResult ? (
                  <div className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                    supabaseTestResult.connected
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    {supabaseTestResult.connected ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold block">
                        {supabaseTestResult.connected ? 'Supabase Connesso' : 'Connessione da Configurare'}
                      </span>
                      <span>{supabaseTestResult.message}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
                    {isSupabaseConfigured()
                      ? 'Supabase è rilevato. Clicca sul pulsante sotto per eseguire un test di verifica live.'
                      : 'Nessun progetto Supabase collegato al momento. Puoi inserire le credenziali cliccando sull\'ingranaggio in alto a destra.'}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleRunSupabaseTest}
                  disabled={isTestingSupabase}
                  className="w-full py-2.5 px-3 bg-brand-surface hover:bg-brand-teal/10 border border-brand-teal/30 text-brand-slate rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-brand-teal ${isTestingSupabase ? 'animate-spin' : ''}`} />
                  <span>{isTestingSupabase ? 'Verifica in corso...' : 'Verifica Connessione Supabase'}</span>
                </button>
              </div>

              {/* Quick Config Drawer if opened */}
              {showConfigModal && (
                <form onSubmit={handleSaveSupabaseCredentials} className="pt-3 border-t border-slate-100 space-y-2.5">
                  <span className="text-[11px] font-bold text-brand-slate uppercase tracking-wider block">
                    Inserisci Credenziali Progetto
                  </span>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-slate-600">Project URL Supabase</label>
                    <input
                      type="url"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="https://xyzcompany.supabase.co"
                      required
                      className="w-full px-2.5 py-1.5 bg-brand-surface border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-slate-600">Anon Public Key</label>
                    <input
                      type="password"
                      value={inputKey}
                      onChange={(e) => setInputKey(e.target.value)}
                      placeholder="eyJhbGciOi..."
                      required
                      className="w-full px-2.5 py-1.5 bg-brand-surface border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  {configFeedback && (
                    <p className={`text-[11px] ${configFeedback.success ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {configFeedback.text}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2 bg-brand-teal hover:bg-brand-tealDark text-white text-xs font-semibold rounded-lg shadow-2xs"
                  >
                    Salva e Collega Supabase
                  </button>
                </form>
              )}

              {/* Automated Database schema notice */}
              <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                <span className="font-semibold text-brand-slate block">
                  Tabelle Predisposte:
                </span>
                <p className="leading-relaxed">
                  Tabella <code className="bg-slate-100 px-1 py-0.5 rounded text-brand-slate">public.profiles</code> con Nome, Cognome, Telefono, Email e Trigger di salvataggio automatico da <code className="bg-slate-100 px-1 py-0.5 rounded text-brand-slate">auth.users</code>.
                </p>
              </div>

            </div>

            {/* Purchase Security Assurance Box */}
            <div className="p-5 rounded-2xl sm:rounded-3xl bg-brand-surface border border-brand-teal/20 space-y-3.5 shadow-2xs">
              <div className="flex items-center gap-2 text-brand-teal">
                <ShieldCheck className="w-5 h-5 text-brand-teal" />
                <span className="font-serif text-sm font-bold text-brand-slate">
                  I Tuoi Acquisti Protetti
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                I tuoi dati e acquisti di e-book sono associati in modo crittografato al tuo account. Anche cambiando telefono o computer, tutti i volumi restano accessibili nella tua libreria.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] font-semibold text-brand-tealDark">
                <Check className="w-4 h-4 text-brand-teal" />
                <span>Salvataggio cloud e locale attivo</span>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* ========================================================
            CASE B: USER IS LOGGED IN (PROFILO COMPLETO & LIBRERIA)
            ======================================================== */
        <div className="space-y-6">
          
          {/* Main User Profile Card: Monogram, Name, Email, Status */}
          <section className="editorial-card bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-brand-teal/20 shadow-xs space-y-5" data-purpose="user-card">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* User Avatar with Initials + Information */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-surface border-2 border-brand-teal flex items-center justify-center shadow-xs shrink-0">
                  <span className="font-serif font-bold text-brand-slate text-2xl tracking-wider">
                    {getInitials()}
                  </span>
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-slate">
                      {user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Lettrice Appassionata'}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Account Protetto
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                    <span>{user.email}</span>
                  </p>

                  {user.phone && (
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 truncate">
                      <Phone className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                      <span>{user.phone}</span>
                    </p>
                  )}

                  <p className="text-[11px] text-slate-400">
                    Membro da {user.registeredDate || 'Novembre 2026'}
                  </p>
                </div>
              </div>

              {/* Actions: Edit Data or Logout */}
              <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditingData(!isEditingData)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-surface hover:bg-slate-100 border border-brand-teal/30 text-brand-slate transition-colors cursor-pointer"
                >
                  {isEditingData ? 'Annulla Modifiche' : 'Modifica Dati'}
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                  title="Disconnetti account"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              <div className="p-3.5 rounded-xl bg-brand-surface/70 border border-brand-teal/15">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  E-book Acquistati
                </span>
                <span className="font-serif text-xl font-bold text-brand-slate mt-0.5 block">
                  {purchasedEbooks.length}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-brand-surface/70 border border-brand-teal/15">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Articoli nel Carrello
                </span>
                <span className="font-serif text-xl font-bold text-brand-slate mt-0.5 block">
                  {cartCount}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-brand-surface/70 border border-brand-teal/15 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Garanzia Lettura
                </span>
                <span className="text-xs font-semibold text-brand-tealDark mt-1 block">
                  Accesso a Vita Illimitato
                </span>
              </div>
            </div>

            {/* Edit Profile Form Drawer */}
            {isEditingData && (
              <form onSubmit={handleSaveProfileChanges} className="pt-4 border-t border-slate-100 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-slate block">
                  Modifica Nome, Cognome e Numero di Cellulare
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600">Nome</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Nome"
                      required
                      className="w-full px-3 py-2 bg-brand-surface border border-brand-teal/20 rounded-xl text-xs text-brand-slate focus:outline-none focus:border-brand-teal"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600">Cognome</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Cognome"
                      required
                      className="w-full px-3 py-2 bg-brand-surface border border-brand-teal/20 rounded-xl text-xs text-brand-slate focus:outline-none focus:border-brand-teal"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Numero di Cellulare</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+39 333 1234567"
                    required
                    className="w-full px-3 py-2 bg-brand-surface border border-brand-teal/20 rounded-xl text-xs text-brand-slate focus:outline-none focus:border-brand-teal"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-teal hover:bg-brand-tealDark text-white rounded-xl text-xs font-semibold cursor-pointer shadow-2xs"
                  >
                    Salva Dati
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingData(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium cursor-pointer"
                  >
                    Chiudi
                  </button>
                </div>
              </form>
            )}

          </section>

          {/* Section: I Miei E-Book Acquistati (Personal Library) */}
          <section className="editorial-card bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-brand-teal/20 shadow-xs space-y-4" data-purpose="purchased-books">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base sm:text-lg font-semibold text-brand-slate border-l-2 border-brand-teal pl-3">
                I Miei E-Book Acquistati
              </h3>
              <span className="text-xs text-slate-400">
                {purchasedEbooks.length} volumi sbloccati
              </span>
            </div>

            {purchasedEbooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {purchasedEbooks.map((book) => (
                  <article key={book.id} className="p-3.5 rounded-2xl bg-brand-surface border border-brand-teal/20 flex gap-3.5 items-center">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-16 h-20 object-contain rounded-lg bg-white p-1 border border-slate-200 shrink-0 shadow-2xs"
                    />
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <h4 className="font-serif text-xs font-semibold text-brand-slate line-clamp-2">
                        {book.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onOpenPdfReader(book)}
                        className="py-1.5 px-3 bg-brand-teal hover:bg-brand-tealDark text-white rounded-lg text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Leggi Ora</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-brand-surface/70 border border-dashed border-brand-teal/30 text-center space-y-3">
                <BookOpen className="w-8 h-8 text-brand-teal/60 mx-auto" />
                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-semibold text-brand-slate">
                    La tua libreria digitale è pronta
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Non hai ancora acquistato e-book. Quando acquisti un volume dal catalogo, comparirà qui istantaneamente per essere letto o scaricato in ogni momento.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onNavigateToCatalog}
                  className="inline-flex items-center gap-2 py-2 px-4 bg-brand-teal hover:bg-brand-tealDark text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-2xs"
                >
                  <span>Esplora i libri nel catalogo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </section>

          {/* Section: Supabase Connection Test & Sicurezza */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Box Verifica Supabase per l'utente connesso */}
            <div className="p-5 rounded-2xl bg-white border border-brand-teal/20 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand-teal">
                  <Database className="w-4 h-4 text-brand-teal" />
                  <h4 className="font-serif text-sm font-bold text-brand-slate">
                    Stato Database Cloud Supabase
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfigModal(!showConfigModal)}
                  className="p-1 text-slate-400 hover:text-brand-slate rounded"
                  title="Impostazioni Supabase"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {supabaseTestResult ? (
                <div className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                  supabaseTestResult.connected
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  {supabaseTestResult.connected ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span>{supabaseTestResult.message}</span>
                </div>
              ) : (
                <p className="text-xs text-slate-600 leading-relaxed">
                  Verifica in tempo reale che la sincronizzazione tra la tua web app e il database Supabase sia attiva.
                </p>
              )}

              <button
                type="button"
                onClick={handleRunSupabaseTest}
                disabled={isTestingSupabase}
                className="text-xs font-semibold text-brand-teal hover:underline inline-flex items-center gap-1.5 cursor-pointer pt-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTestingSupabase ? 'animate-spin' : ''}`} />
                <span>{isTestingSupabase ? 'Verifica in corso...' : 'Esegui test di connessione ora'}</span>
              </button>

              {showConfigModal && (
                <form onSubmit={handleSaveSupabaseCredentials} className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-brand-slate uppercase block">
                    Aggiorna URL & Key Supabase
                  </span>
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://xyz.supabase.co"
                    required
                    className="w-full px-2.5 py-1.5 bg-brand-surface border border-slate-200 rounded-lg text-xs"
                  />
                  <input
                    type="password"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="Anon key (eyJhb...)"
                    required
                    className="w-full px-2.5 py-1.5 bg-brand-surface border border-slate-200 rounded-lg text-xs"
                  />
                  {configFeedback && (
                    <p className={`text-[11px] ${configFeedback.success ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {configFeedback.text}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-2 bg-brand-teal hover:bg-brand-tealDark text-white text-xs font-semibold rounded-lg shadow-2xs"
                  >
                    Salva e Verifica
                  </button>
                </form>
              )}
            </div>

            {/* Box Sicurezza Password */}
            <div className="p-5 rounded-2xl bg-white border border-brand-teal/20 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-brand-teal">
                <Key className="w-4 h-4 text-brand-teal" />
                <h4 className="font-serif text-sm font-bold text-brand-slate">
                  Sicurezza dell'Account
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                I tuoi accessi sono protetti. Puoi richiedere in qualsiasi momento un link via email per reimpostare la tua password senza rischiare di perdere i tuoi e-book.
              </p>
              <button
                type="button"
                onClick={() => {
                  resetUserPassword(user.email);
                  onToast(`Link di reimpostazione inviato a ${user.email}`);
                }}
                className="text-xs font-semibold text-brand-teal hover:underline inline-flex items-center gap-1.5 cursor-pointer pt-1"
              >
                <span>Reimposta Password via Email</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
