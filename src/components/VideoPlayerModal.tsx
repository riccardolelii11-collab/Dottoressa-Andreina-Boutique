import React, { useState } from 'react';
import { Product } from '../types';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, CheckCircle2, Download, FileText } from 'lucide-react';

interface VideoPlayerModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  product,
  isOpen,
  onClose,
  onToast,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progressPercent, setProgressPercent] = useState(28);

  if (!isOpen || !product) return null;

  const currentChapter = product.chapters[currentChapterIdx] || product.chapters[0];

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleDownloadHandout = () => {
    onToast(`Download dispensa allegata: Dispensa_${product.slug}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col bg-[#0b1a2b]/90 backdrop-blur-md">
      {/* Header with Liquid Glass Dark */}
      <div className="liquid-glass-dark text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-semibold text-[#9dbdd1] uppercase tracking-wider hidden sm:inline">
            Masterclass Streaming HD
          </span>
          <span className="hidden sm:inline text-slate-500">·</span>
          <h3 className="font-editorial text-sm sm:text-base font-medium text-white truncate max-w-sm sm:max-w-xl">
            {product.title}
          </h3>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer border border-transparent hover:border-white/20"
          aria-label="Chiudi masterclass"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Area: Video Player + Chapter Sidebar */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Player & Video Controls */}
        <div className="lg:col-span-8 flex flex-col bg-black/60 p-4 sm:p-6 lg:p-8 justify-center">
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group">
            {/* Background Atmosphere / Scene */}
            {product.coverImage ? (
              <img
                src={product.coverImage}
                alt={product.title}
                className="w-full h-full object-cover opacity-80"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#0c1825] via-[#14263a] to-[#08121d] flex flex-col items-center justify-center p-8 select-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(157,189,209,0.12),transparent_70%)] pointer-events-none" />
                <div className="w-20 h-20 rounded-full border border-[#9dbdd1]/20 flex items-center justify-center mb-3">
                  <div className="w-14 h-14 rounded-full border border-[#9dbdd1]/30 flex items-center justify-center">
                    <span className="font-editorial text-xl font-light text-[#9dbdd1]/80 italic">AO</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#9dbdd1]/70 font-semibold mb-1">
                  Masterclass Nutrizionale
                </span>
                <span className="text-white/90 text-sm font-editorial text-center max-w-sm font-medium">
                  {product.title}
                </span>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

            {/* Central Play/Pause Watermark Overlay */}
            <button
              onClick={handleTogglePlay}
              className="absolute z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#2b5374]/85 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform backdrop-blur-xs cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 sm:w-8 sm:h-8" />
              ) : (
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
              )}
            </button>

            {/* In-Video Status Overlays */}
            <div className="absolute top-4 left-4 text-xs font-medium text-white/90 bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <span>{currentChapter.title}</span>
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-5 flex flex-col gap-2">
              {/* Progress Scrubber */}
              <div 
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPercent = Math.round((clickX / rect.width) * 100);
                  setProgressPercent(Math.max(0, Math.min(100, newPercent)));
                }}
                className="w-full h-1.5 bg-slate-700 rounded-full cursor-pointer overflow-hidden group-hover:h-2 transition-all"
              >
                <div 
                  style={{ width: `${progressPercent}%` }} 
                  className="h-full bg-[#9dbdd1] rounded-full relative"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-white pt-1">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleTogglePlay}
                    className="hover:text-[#9dbdd1] cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-[#9dbdd1] cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-[11px] text-slate-300 tabular-nums">
                    {Math.floor((progressPercent * 18) / 100)}:24 / {currentChapter.durationOrPages || '18:00'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const speeds = [1, 1.25, 1.5];
                      const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                      setPlaybackSpeed(nextSpeed);
                    }}
                    className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-medium text-slate-300 hover:text-white"
                  >
                    {playbackSpeed}x
                  </button>
                  <button 
                    onClick={() => onToast('Modalità schermo intero')}
                    className="hover:text-[#9dbdd1] cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Module description underneath player */}
          <div className="max-w-4xl mx-auto w-full mt-4 text-white">
            <h4 className="text-base font-semibold text-white">
              {currentChapter.title}
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {currentChapter.description}
            </p>
          </div>
        </div>

        {/* Right Column: Chapters & Nutritional Handout */}
        <div className="lg:col-span-4 bg-[#0d2033] border-l border-slate-800 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-[#9dbdd1] uppercase tracking-wider">
                Indice dei Moduli ({product.chapters.length})
              </h4>
              <span className="text-xs text-slate-400 tabular-nums">
                {product.demoVideoDuration || 'Corso completo'}
              </span>
            </div>

            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
              {product.chapters.map((chapter, idx) => {
                const isActive = idx === currentChapterIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentChapterIdx(idx);
                      setIsPlaying(true);
                      setProgressPercent(0);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isActive
                        ? 'bg-[#2b5374]/40 border-[#9dbdd1] text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isActive ? (
                        <div className="w-5 h-5 rounded-full bg-[#9dbdd1] text-[#0f2338] flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs">
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{chapter.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{chapter.durationOrPages}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Handout Download Box */}
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#9dbdd1]" />
                <div>
                  <h5 className="text-xs font-semibold text-white">Dispensa & Ricettario PDF</h5>
                  <p className="text-[11px] text-slate-400">Include schede operative e lista della spesa stampabile.</p>
                </div>
              </div>
              <button
                onClick={handleDownloadHandout}
                className="mt-3 w-full py-2 px-3 bg-[#2b5374] hover:bg-[#396991] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Scarica Dispensa (.pdf)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
