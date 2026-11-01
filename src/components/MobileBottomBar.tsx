import React from 'react';
import { NavigationTab, UserProfile } from '../types';
import { Home, BookOpen, PlayCircle, Sparkles, User } from 'lucide-react';

interface MobileBottomBarProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  user: UserProfile;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentTab,
  onNavigate,
  user,
}) => {
  const tabs = [
    { id: 'home' as NavigationTab, label: 'Home', icon: Home },
    { id: 'ebooks' as NavigationTab, label: 'E-book', icon: BookOpen },
    { id: 'recipes' as NavigationTab, label: 'Ricette', icon: PlayCircle },
    { id: 'premium' as NavigationTab, label: 'Premium', icon: Sparkles },
    { id: 'profile' as NavigationTab, label: 'Profilo', icon: User },
  ];

  return (
    <nav 
      aria-label="Navigazione principale mobile"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#cbdfe9]/70 pb-safe select-none shadow-lg"
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-2 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          const isPremium = tab.id === 'premium';

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="min-h-[48px] min-w-[48px] flex flex-col items-center justify-center gap-1 transition-all relative cursor-pointer"
            >
              <div className={`p-1 rounded-xl transition-all ${
                isActive
                  ? isPremium 
                    ? 'bg-amber-100/80 text-amber-900 shadow-2xs' 
                    : 'bg-[#edf4f8] text-[#2b5374] shadow-2xs scale-105'
                  : 'text-[#64748b] hover:text-[#0f2338]'
              }`}>
                <Icon className={`w-5 h-5 ${
                  isActive 
                    ? isPremium ? 'text-amber-800' : 'text-[#2b5374]' 
                    : 'text-[#64748b]'
                }`} />
              </div>

              <span className={`text-[10px] tracking-tight leading-none ${
                isActive 
                  ? isPremium ? 'font-bold text-amber-900' : 'font-bold text-[#2b5374]' 
                  : 'font-medium text-[#7a8c9e]'
              }`}>
                {tab.label}
              </span>

              {/* Active dot indicator */}
              {isActive && (
                <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                  isPremium ? 'bg-amber-600' : 'bg-[#2b5374]'
                }`} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
