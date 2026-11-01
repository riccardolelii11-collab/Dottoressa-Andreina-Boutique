import React, { useState } from 'react';
import { VideoRecipe } from '../types';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Clock, 
  Utensils, 
  Check, 
  Bookmark, 
  Printer, 
  Sparkles,
  ChevronRight,
  Flame,
  ChefHat
} from 'lucide-react';

interface RecipePlayerModalProps {
  recipe: VideoRecipe | null;
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
  isSaved?: boolean;
  onToggleSave?: (recipeId: string) => void;
}

export const RecipePlayerModal: React.FC<RecipePlayerModalProps> = ({
  recipe,
  isOpen,
  onClose,
  onToast,
  isSaved = false,
  onToggleSave,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(30);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'steps' | 'nutrition'>('ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  if (!isOpen || !recipe) return null;

  const toggleIngredient = (name: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm select-none">
      <div 
        className="w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-4xl bg-white sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        
        {/* Header Bar */}
        <div className="p-4 px-5 bg-white border-b border-[#f1f5f9] flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-[10px] uppercase font-bold text-[#2b5374] bg-[#edf4f8] px-2.5 py-1 rounded-md tracking-wider shrink-0">
              {recipe.categoryLabel}
            </span>
            <h3 className="font-editorial text-base sm:text-lg font-semibold text-[#0f2338] truncate">
              {recipe.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onToggleSave && (
              <button
                onClick={() => {
                  onToggleSave(recipe.id);
                  onToast(isSaved ? 'Ricetta rimossa dai preferiti' : 'Ricetta salvata nel tuo profilo');
                }}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isSaved 
                    ? 'border-amber-300 bg-amber-50 text-amber-700' 
                    : 'border-slate-200 text-[#4a5e73] hover:bg-slate-50'
                }`}
                title={isSaved ? 'Rimuovi dai preferiti' : 'Salva ricetta'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}

            <button
              onClick={() => onToast('Scheda ricetta pronta per la stampa (PDF generato)')}
              className="p-2 rounded-xl border border-slate-200 text-[#4a5e73] hover:bg-slate-50 transition-colors cursor-pointer"
              title="Stampa scheda ricetta"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player in Foreground */}
        <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden group">
          {/* Cover / Backdrop */}
          <img
            src={recipe.thumbnailUrl}
            alt={recipe.title}
            className="w-full h-full object-cover opacity-70 group-hover:scale-102 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

          {/* Central Play/Pause Watermark Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-16 h-16 rounded-full bg-[#2b5374]/85 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform backdrop-blur-xs cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7" />
            ) : (
              <Play className="w-7 h-7 fill-white ml-0.5" />
            )}
          </button>

          {/* Top Overlays */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[11px] font-semibold text-white/95 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg">
              Video Ricetta Gratuita
            </span>
            <span className="text-[11px] font-medium text-slate-300 bg-black/40 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {recipe.videoDuration}
            </span>
          </div>

          {/* Bottom Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
            {/* Scrubber Bar */}
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newPercent = Math.round((clickX / rect.width) * 100);
                setProgress(Math.max(0, Math.min(100, newPercent)));
              }}
              className="w-full h-1.5 bg-slate-700/80 rounded-full cursor-pointer overflow-hidden group-hover:h-2 transition-all"
            >
              <div 
                style={{ width: `${progress}%` }}
                className="h-full bg-[#9dbdd1] rounded-full"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-white pt-1">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
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
                  02:14 / {recipe.videoDuration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
                  HD 1080p
                </span>
                <button 
                  onClick={() => onToast('Modalità schermo intero attivata')}
                  className="hover:text-[#9dbdd1] cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Information Tabs & Steps */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#fcfdfd]">
          
          {/* Quick Stats Strip */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#4a5e73] pb-4 border-b border-[#e2e8f0]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#2b5374]" />
              <span>Prep: <strong>{recipe.prepTime}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Cottura: <strong>{recipe.cookTime}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-[#2b5374]" />
              <span>Difficoltà: <strong>{recipe.difficulty}</strong></span>
            </div>
            {recipe.dietaryTags.map((tag, idx) => (
              <span key={idx} className="text-[11px] text-[#2b5374] bg-[#edf4f8] px-2.5 py-0.5 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#e2e8f0] pb-2">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'ingredients'
                  ? 'bg-[#2b5374] text-white shadow-xs'
                  : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f1f5f9]'
              }`}
            >
              Ingredienti Dosati ({recipe.ingredients.length})
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'steps'
                  ? 'bg-[#2b5374] text-white shadow-xs'
                  : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f1f5f9]'
              }`}
            >
              Preparazione Step-by-Step ({recipe.steps.length})
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'nutrition'
                  ? 'bg-[#2b5374] text-white shadow-xs'
                  : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f1f5f9]'
              }`}
            >
              Note Nutrizionali
            </button>
          </div>

          {/* Tab 1: Ingredients with interactive checklists */}
          {activeTab === 'ingredients' && (
            <div className="space-y-3">
              <p className="text-xs text-[#64748b]">
                Spunta gli ingredienti che hai già in dispensa per organizzare la preparazione:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {recipe.ingredients.map((ing, idx) => {
                  const isChecked = checkedIngredients[ing.name];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleIngredient(ing.name)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#f0fdf4] border-emerald-200 text-emerald-900'
                          : 'bg-white border-[#e2e8f0] hover:border-[#cbdfe9] text-[#0f2338]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className={`text-xs ${isChecked ? 'line-through text-slate-500' : 'font-medium'}`}>
                          {ing.name}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#2b5374] tabular-nums shrink-0 ml-2">
                        {ing.amount}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Detailed Preparation Steps */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              {recipe.steps.map((st) => (
                <div key={st.stepNumber} className="p-4 rounded-2xl bg-white border border-[#e2e8f0] space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#2b5374] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {st.stepNumber}
                    </span>
                    <h5 className="font-editorial text-sm font-semibold text-[#0f2338]">
                      Fase {st.stepNumber}
                    </h5>
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed pl-8">
                    {st.instruction}
                  </p>
                  {st.tip && (
                    <div className="ml-8 p-2.5 rounded-xl bg-[#edf4f8] border border-[#cbdfe9]/70 text-[11px] text-[#2b5374] flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span><strong>Consiglio della Nutrizionista:</strong> {st.tip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Nutritional notes */}
          {activeTab === 'nutrition' && (
            <div className="p-5 rounded-2xl bg-white border border-[#e2e8f0] space-y-3">
              <h4 className="font-editorial text-sm font-semibold text-[#0f2338]">
                Perché questo abbinamento funziona nel tuo metabolismo:
              </h4>
              <p className="text-xs text-[#4a5e73] leading-relaxed">
                {recipe.nutritionalNotes}
              </p>
              <div className="pt-3 border-t border-[#f1f5f9] text-[11px] text-[#64748b]">
                I contenuti video delle ricette sono pensati per una fruizione autonoma ed educativa quotidiana.
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
