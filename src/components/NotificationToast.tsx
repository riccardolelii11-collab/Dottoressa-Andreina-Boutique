import React from 'react';
import { CheckCircle, Info } from 'lucide-react';

interface NotificationToastProps {
  message: string | null;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className="liquid-glass-dark text-white px-5 py-3 rounded-2xl shadow-[0_16px_36px_rgba(15,35,56,0.3)] flex items-center gap-3 border border-white/20 text-xs sm:text-sm">
        <CheckCircle className="w-4 h-4 text-[#9dbdd1] shrink-0" />
        <span className="font-medium text-slate-100">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors text-xs cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
