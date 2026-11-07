import React from 'react';
import { NavigationTab, UserProfile } from '../types';
import { BookOpen, LayoutGrid, Calendar, User, ShoppingBag } from 'lucide-react';
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
  // Strictly the 4 sections matching the bottom capsule
  const navItems = [
    { id: 'ebooks' as NavigationTab, label: 'E-Book', icon: BookOpen },
    { id: 'services' as NavigationTab, label: 'Servizi', icon: LayoutGrid },
    { id: 'consultations' as NavigationTab, label: 'Consulenze', icon: Calendar },
    { id: 'profile' as NavigationTab, label: 'Profilo', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-white/95 backdrop-blur-md border-r border-brand-teal/20 z-30 justify-between p-5 select-none font-sans">
      
      {/* Brand Header */}
      <div className="space-y-6">
        <div 
          onClick={() => onNavigate('ebooks')}
          className="cursor-pointer group flex items-center gap-3 pt-1"
        >
          <div className="w-10 h-10 rounded-full border border-brand-teal flex items-center justify-center bg-white shadow-xs group-hover:scale-105 transition-transform">
            <span className="font-serif font-bold text-brand-slate text-base tracking-tight">A</span>
          </div>
          <div>
            <h1 className="font-serif text-lg font-semibold text-brand-slate leading-tight tracking-tight group-hover:text-brand-teal transition-colors">
              A.O.
            </h1>
            <p className="text-[9px] uppercase tracking-widest text-brand-teal font-medium mt-0.5">
              Dott.ssa Andreina Olivieri
            </p>
          </div>
        </div>

        {/* Primary Navigation Links (Only the 4 specified tabs) */}
        <nav className="space-y-1.5 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-tealLight/80 text-brand-tealDark border border-brand-teal/40 shadow-xs'
                    : 'text-slate-600 hover:text-brand-slate hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-tealDark' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Quick Cart Drawer Action */}
        <div className="pt-2">
          <button
            onClick={onOpenCart}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-brand-teal/30 bg-white hover:bg-slate-50 text-brand-slate text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4 text-brand-teal" />
              <span>Carrello Acquisti</span>
            </div>
            {cartCount > 0 ? (
              <span className="w-5 h-5 rounded-full bg-brand-teal text-white text-[10px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">0</span>
            )}
          </button>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        {/* PWA Install Button */}
        <div>
          <PWAInstallButton />
        </div>

        {/* User Card */}
        {user.isLoggedIn ? (
          <div 
            onClick={() => onNavigate('profile')}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-brand-teal/20 hover:border-brand-teal/40 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-brand-teal text-white text-xs font-semibold flex items-center justify-center shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-brand-slate block truncate">
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Account Personale
                </span>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => onNavigate('profile')}
            className="w-full py-2.5 bg-brand-teal hover:bg-brand-tealDark text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Accedi o Registrati
          </button>
        )}
      </div>

    </aside>
  );
};
