import React from 'react';
import { NavigationTab, UserProfile } from '../types';
import { 
  Home, 
  BookOpen, 
  PlayCircle, 
  Sparkles, 
  GraduationCap, 
  User, 
  ShoppingBag, 
  LayoutDashboard,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface DesktopSidebarProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  user: UserProfile;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentTab,
  onNavigate,
  user,
  cartCount,
  onOpenCart,
  onOpenAuth,
}) => {
  const navItems = [
    { id: 'home' as NavigationTab, label: 'Home', icon: Home, badge: null },
    { id: 'ebooks' as NavigationTab, label: 'E-book', icon: BookOpen, badge: '4 Volumi' },
    { id: 'recipes' as NavigationTab, label: 'Video Ricette', icon: PlayCircle, badge: 'Gratis' },
    { id: 'premium' as NavigationTab, label: 'Club Premium', icon: Sparkles, badge: 'Esclusivo' },
    { id: 'courses' as NavigationTab, label: 'Video Corsi', icon: GraduationCap, badge: null },
    { id: 'profile' as NavigationTab, label: 'Profilo Utente', icon: User, badge: null },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-white/95 backdrop-blur-md border-r border-[#e2e8f0] z-30 justify-between p-5 select-none">
      
      {/* Brand Header */}
      <div className="space-y-6">
        <div 
          onClick={() => onNavigate('home')}
          className="cursor-pointer group flex items-center gap-3 pt-1"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2b5374] to-[#0f2338] text-white flex items-center justify-center font-editorial text-lg font-semibold italic shadow-xs group-hover:scale-105 transition-transform">
            AB
          </div>
          <div>
            <h1 className="font-editorial text-lg font-semibold text-[#0f2338] leading-tight tracking-tight group-hover:text-[#2b5374] transition-colors">
              Andreina Boutique
            </h1>
            <p className="text-[10px] font-medium text-[#7a8c9e] uppercase tracking-wider">
              Contenuti Nutrizionali
            </p>
          </div>
        </div>

        {/* Primary Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const isPremiumTab = item.id === 'premium';

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? isPremiumTab 
                      ? 'bg-amber-50 text-amber-900 border border-amber-200/80 shadow-2xs font-bold'
                      : 'bg-[#edf4f8] text-[#2b5374] border border-[#cbdfe9]/70 shadow-2xs'
                    : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f8fafc]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${
                    isActive 
                      ? isPremiumTab ? 'text-amber-700' : 'text-[#2b5374]' 
                      : 'text-[#64748b]'
                  }`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-md font-medium ${
                    isPremiumTab 
                      ? 'bg-amber-200/70 text-amber-900 font-bold' 
                      : 'bg-[#dcebf4] text-[#2b5374]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Cart Drawer Action */}
        <div className="pt-2">
          <button
            onClick={onOpenCart}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#cbdfe9] bg-[#f8fafc] hover:bg-[#edf4f8] text-[#2b5374] text-xs font-semibold transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4" />
              <span>Carrello Acquisti</span>
            </div>
            {cartCount > 0 ? (
              <span className="w-5 h-5 rounded-full bg-[#2b5374] text-white text-[10px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            ) : (
              <span className="text-[11px] text-[#94a3b8]">0</span>
            )}
          </button>
        </div>
      </div>

      {/* Footer Controls & User Card */}
      <div className="space-y-4 pt-4 border-t border-[#f1f5f9]">
        {/* PWA Install Button */}
        <div>
          <PWAInstallButton />
        </div>

        {/* Admin Preview Switch */}
        <button
          onClick={() => onNavigate('admin-preview')}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-medium transition-colors cursor-pointer ${
            currentTab === 'admin-preview'
              ? 'bg-slate-800 text-white'
              : 'text-[#64748b] hover:text-[#0f2338] hover:bg-slate-100'
          }`}
          title="Anteprima Pannello Amministrativo"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Dashboard Gestione Admin</span>
        </button>

        {/* User Card */}
        {user.isLoggedIn ? (
          <div 
            onClick={() => onNavigate('profile')}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#cbdfe9] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#2b5374] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-[#0f2338] block truncate">
                  {user.name}
                </span>
                <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  {user.hasActiveSubscription ? 'Premium Attivo' : 'Membro Base'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full py-2.5 bg-[#2b5374] text-white text-xs font-semibold rounded-xl hover:bg-[#1f3f5a] transition-colors cursor-pointer"
          >
            Accedi o Registrati
          </button>
        )}
      </div>

    </aside>
  );
};
