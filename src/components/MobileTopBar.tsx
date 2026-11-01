import React from 'react';
import { NavigationTab, UserProfile } from '../types';
import { ShoppingBag, GraduationCap, LayoutDashboard } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface MobileTopBarProps {
  onNavigate: (tab: NavigationTab) => void;
  user: UserProfile;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({
  onNavigate,
  user,
  cartCount,
  onOpenCart,
  onOpenAuth,
}) => {
  return (
    <header className="md:hidden sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] px-4 flex items-center justify-between shadow-2xs">
      
      {/* Brand Wordmark */}
      <div 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2b5374] to-[#0f2338] text-white flex items-center justify-center font-editorial text-sm font-semibold italic">
          AB
        </div>
        <div>
          <span className="font-editorial text-base font-semibold text-[#0f2338] tracking-tight block leading-tight">
            Andreina Boutique
          </span>
          <span className="text-[9px] font-medium text-[#7a8c9e] uppercase tracking-wider block">
            Digital Nutrition Hub
          </span>
        </div>
      </div>

      {/* Right Action Icons: Courses, Cart, Profile Avatar */}
      <div className="flex items-center gap-2">
        {/* Quick Link to Video Courses */}
        <button
          onClick={() => onNavigate('courses')}
          className="min-h-[40px] min-w-[40px] flex items-center justify-center text-[#4a5e73] hover:text-[#0f2338] rounded-xl hover:bg-[#f8fafc] transition-colors"
          title="Video Corsi"
        >
          <GraduationCap className="w-5 h-5" />
        </button>

        {/* Cart Drawer Trigger */}
        <button
          onClick={onOpenCart}
          className="min-h-[40px] min-w-[40px] flex items-center justify-center text-[#2b5374] relative rounded-xl hover:bg-[#f8fafc] transition-colors"
          title="Carrello"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#2b5374] text-white text-[9px] flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>

        {/* User Avatar / Login */}
        {user.isLoggedIn ? (
          <button
            onClick={() => onNavigate('profile')}
            className="w-7 h-7 rounded-full bg-[#2b5374] text-white text-xs font-semibold flex items-center justify-center border border-white shadow-2xs"
            title="Area Personale"
          >
            {user.name.charAt(0)}
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="px-2.5 py-1 bg-[#2b5374] text-white text-xs font-medium rounded-lg"
          >
            Accedi
          </button>
        )}
      </div>

    </header>
  );
};
