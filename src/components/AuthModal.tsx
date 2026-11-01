import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string, email: string) => void;
  initialMode?: 'login' | 'register' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setResetSent(true);
      return;
    }
    const finalName = name.trim() || (email ? email.split('@')[0] : 'Lettrice Appassionata');
    const finalEmail = email.trim() || 'lettrice@example.it';
    onLoginSuccess(finalName, finalEmail);
    onClose();
  };

  const handleDemoLogin = () => {
    onLoginSuccess('Giulia Martelli', 'giulia.martelli@example.it');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-[#0f2338]/45 backdrop-blur-md transition-opacity" 
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl liquid-glass-azure text-left shadow-[0_24px_60px_-15px_rgba(15,35,56,0.25)] transition-all sm:my-8 sm:w-full sm:max-w-md border border-white/80">
          
          {/* Header with Frosted Base */}
          <div className="px-6 pt-6 pb-4 border-b border-[#cbd5e1]/50 bg-white/40 backdrop-blur-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#2b5374] uppercase tracking-wider block">
                Andreina Boutique
              </span>
              <h3 className="font-editorial text-xl font-semibold text-[#0f2338] mt-0.5">
                {mode === 'login' && 'Accedi alla Tua Libreria'}
                {mode === 'register' && 'Crea il Tuo Spazio Digitale'}
                {mode === 'forgot' && 'Recupera Password'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#64748b] hover:text-[#0f2338] glass-pill-control rounded-full transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Selector */}
          {mode !== 'forgot' && (
            <div className="flex border-b border-[#cbd5e1]/40 px-6 bg-white/20">
              <button
                onClick={() => setMode('login')}
                className={`py-3 text-xs font-semibold border-b-2 mr-6 transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'border-[#2b5374] text-[#0f2338]'
                    : 'border-transparent text-[#64748b] hover:text-[#0f2338]'
                }`}
              >
                Accedi
              </button>
              <button
                onClick={() => setMode('register')}
                className={`py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'border-[#2b5374] text-[#0f2338]'
                    : 'border-transparent text-[#64748b] hover:text-[#0f2338]'
                }`}
              >
                Registrati
              </button>
            </div>
          )}

          {/* Form Content */}
          <div className="p-6">
            {mode === 'forgot' && resetSent ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-editorial text-lg font-semibold text-[#0f2338]">Istruzioni Inviate</h4>
                <p className="text-xs text-[#5b6b7a] max-w-xs mx-auto">
                  Abbiamo inviato un link di recupero a <strong>{email || 'tua-email@dominio.it'}</strong>. Controlla la tua casella di posta.
                </p>
                <button
                  onClick={() => {
                    setResetSent(false);
                    setMode('login');
                  }}
                  className="mt-4 px-4 py-2 text-xs font-medium text-[#2b5374] bg-[#edf4f8] rounded-lg hover:bg-[#e1edf5]"
                >
                  Torna all’accesso
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-[#0f2338] mb-1">
                      Nome e Cognome
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Es. Giulia Martelli"
                        className="w-full pl-9 pr-3 py-2.5 text-xs border border-[#cbd5e1] rounded-lg focus:outline-none focus:border-[#2b5374]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-[#0f2338] mb-1">
                    Indirizzo Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nome@esempio.it"
                      className="w-full pl-9 pr-3 py-2.5 text-xs border border-[#cbd5e1] rounded-lg focus:outline-none focus:border-[#2b5374]"
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-medium text-[#0f2338]">
                        Password
                      </label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-[11px] text-[#2b5374] hover:underline"
                        >
                          Password dimenticata?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2.5 text-xs border border-[#cbd5e1] rounded-lg focus:outline-none focus:border-[#2b5374]"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#2b5374] hover:bg-[#1f3f5a] text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <span>
                    {mode === 'login' && 'Accedi'}
                    {mode === 'register' && 'Crea Account'}
                    {mode === 'forgot' && 'Invia Link di Recupero'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {mode === 'forgot' && (
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="w-full text-center text-xs text-[#64748b] hover:text-[#0f2338] pt-2"
                  >
                    Torna al login
                  </button>
                )}

                {/* Demo Quick Login Assist */}
                <div className="pt-4 border-t border-[#cbd5e1]/40">
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="w-full py-2.5 px-3 glass-pill-control text-[#2b5374] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#2b5374]" />
                    <span>Accesso Rapido Dimostrativo (1 Click)</span>
                  </button>
                  <p className="text-[10px] text-center text-[#94a3b8] mt-1.5 font-medium">
                    Permette di testare subito la Libreria Digitale con contenuti d’esempio.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
