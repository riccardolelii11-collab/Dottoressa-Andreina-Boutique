import React from 'react';
import { NavigationTab, UserProfile } from '../types';

interface MobileBottomBarProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  user: UserProfile;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentTab,
  onNavigate,
}) => {
  return (
    <nav className="fixed bottom-6 inset-x-0 mx-auto w-[88%] max-w-sm z-40 md:hidden" data-purpose="floating-bottom-nav">
      <div className="bottom-capsule bg-white/95 backdrop-blur-md border border-brand-teal/30 rounded-full px-3 py-2 flex items-center justify-between">
        
        {/* Tab 1: E-BOOK (Active / Highlighted in light cyan/teal) */}
        <button 
          type="button"
          onClick={() => onNavigate('ebooks')}
          className="flex flex-col items-center justify-center flex-1 py-1 group cursor-pointer" 
          data-purpose={currentTab === 'ebooks' ? 'nav-item-active' : 'nav-item'}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95 ${
            currentTab === 'ebooks'
              ? 'bg-brand-tealLight/80 text-brand-tealDark border border-brand-teal/40 shadow-xs'
              : 'bg-transparent hover:bg-slate-50 text-slate-400 group-hover:text-brand-slate'
          }`}>
            <svg className="w-5 h-5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <span className={`text-[10px] mt-1 tracking-tight ${
            currentTab === 'ebooks' ? 'font-semibold text-brand-tealDark' : 'font-medium text-slate-400 group-hover:text-brand-slate'
          }`}>
            E-Book
          </span>
        </button>

        {/* Tab 2: Servizi */}
        <button 
          type="button"
          onClick={() => onNavigate('services')}
          className="flex flex-col items-center justify-center flex-1 py-1 group cursor-pointer" 
          data-purpose={currentTab === 'services' ? 'nav-item-active' : 'nav-item'}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 ${
            currentTab === 'services'
              ? 'bg-brand-tealLight/80 text-brand-tealDark border border-brand-teal/40 shadow-xs'
              : 'bg-transparent hover:bg-slate-50 text-slate-400 group-hover:text-brand-slate'
          }`}>
            <svg className="w-5 h-5 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <span className={`text-[10px] mt-1 tracking-tight ${
            currentTab === 'services' ? 'font-semibold text-brand-tealDark' : 'font-medium text-slate-400 group-hover:text-brand-slate'
          }`}>
            Servizi
          </span>
        </button>

        {/* Tab 3: Consulenze */}
        <button 
          type="button"
          onClick={() => onNavigate('consultations')}
          className="flex flex-col items-center justify-center flex-1 py-1 group cursor-pointer" 
          data-purpose={currentTab === 'consultations' ? 'nav-item-active' : 'nav-item'}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 ${
            currentTab === 'consultations'
              ? 'bg-brand-tealLight/80 text-brand-tealDark border border-brand-teal/40 shadow-xs'
              : 'bg-transparent hover:bg-slate-50 text-slate-400 group-hover:text-brand-slate'
          }`}>
            <svg className="w-5 h-5 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <span className={`text-[10px] mt-1 tracking-tight ${
            currentTab === 'consultations' ? 'font-semibold text-brand-tealDark' : 'font-medium text-slate-400 group-hover:text-brand-slate'
          }`}>
            Consulenze
          </span>
        </button>

        {/* Tab 4: Profilo */}
        <button 
          type="button"
          onClick={() => onNavigate('profile')}
          className="flex flex-col items-center justify-center flex-1 py-1 group cursor-pointer" 
          data-purpose={currentTab === 'profile' ? 'nav-item-active' : 'nav-item'}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 ${
            currentTab === 'profile'
              ? 'bg-brand-tealLight/80 text-brand-tealDark border border-brand-teal/40 shadow-xs'
              : 'bg-transparent hover:bg-slate-50 text-slate-400 group-hover:text-brand-slate'
          }`}>
            <svg className="w-5 h-5 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <span className={`text-[10px] mt-1 tracking-tight ${
            currentTab === 'profile' ? 'font-semibold text-brand-tealDark' : 'font-medium text-slate-400 group-hover:text-brand-slate'
          }`}>
            Profilo
          </span>
        </button>

      </div>
    </nav>
  );
};
