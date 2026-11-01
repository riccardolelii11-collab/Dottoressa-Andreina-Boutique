import React, { useState } from 'react';
import { VideoRecipe } from '../types';
import { PlayCircle, Search, Clock, Flame, ChefHat, Bookmark, Sparkles, Filter } from 'lucide-react';

interface VideoRecipesPageProps {
  recipes: VideoRecipe[];
  onSelectRecipe: (recipe: VideoRecipe) => void;
  savedRecipeIds: string[];
  onToggleSaveRecipe: (recipeId: string) => void;
  onToast: (msg: string) => void;
}

export const VideoRecipesPage: React.FC<VideoRecipesPageProps> = ({
  recipes,
  onSelectRecipe,
  savedRecipeIds,
  onToggleSaveRecipe,
  onToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Tutte le Ricette' },
    { id: 'colazione', label: 'Colazione & Brunch' },
    { id: 'pranzo', label: 'Pranzi Veloci' },
    { id: 'snack', label: 'Spuntini & Merende' },
    { id: 'cena', label: 'Cene Leggere' },
  ];

  const filteredRecipes = recipes.filter((r) => {
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ingredients.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2b5374]">
          <PlayCircle className="w-4 h-4" />
          <span>Libreria Video Gratuita</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0f2338]">
          Video Ricette Funzionali & Consapevoli
        </h1>
        <p className="text-xs sm:text-sm text-[#4a5e73] max-w-2xl leading-relaxed">
          Una raccolta video completa, 100% gratuita, ideata per mostrarti come abbinare i nutrienti con gusto e velocità. Clicca su qualsiasi ricetta per avviare il video, dosare gli ingredienti e seguire la preparazione.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cerca ingrediente o ricetta (es: avena, salmone, zucca)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#2b5374] bg-[#fcfdfd]"
          />
        </div>

        {/* Category Pills/Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2b5374] text-white shadow-2xs'
                  : 'text-[#4a5e73] hover:text-[#0f2338] hover:bg-[#f8fafc]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Video Recipes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => {
          const isSaved = savedRecipeIds.includes(recipe.id);

          return (
            <div
              key={recipe.id}
              className="bg-white rounded-3xl border border-[#e2e8f0] overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#cbdfe9] transition-all group"
            >
              <div 
                onClick={() => onSelectRecipe(recipe)}
                className="cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={recipe.thumbnailUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/15 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-[#0f2338] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  <span className="absolute bottom-3 right-3 text-[11px] font-bold text-white bg-black/75 backdrop-blur-xs px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {recipe.videoDuration}
                  </span>

                  <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-[#2b5374]/90 backdrop-blur-xs px-2.5 py-1 rounded-md uppercase">
                    {recipe.categoryLabel}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2.5">
                  <h3 className="font-editorial text-base font-semibold text-[#0f2338] line-clamp-2 group-hover:text-[#2b5374] transition-colors leading-snug">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-[#64748b] line-clamp-2 leading-relaxed">
                    {recipe.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {recipe.dietaryTags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] text-[#2b5374] bg-[#edf4f8] px-2 py-0.5 rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action and Timing footer */}
              <div className="p-5 pt-0 border-t border-[#f8fafc] flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[#526374]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#2b5374]" />
                    <span>Prep: {recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat className="w-3.5 h-3.5 text-[#2b5374]" />
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSaveRecipe(recipe.id);
                      onToast(isSaved ? 'Ricetta rimossa dai preferiti' : 'Ricetta salvata nel tuo profilo');
                    }}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isSaved
                        ? 'border-amber-300 bg-amber-50 text-amber-700'
                        : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                    title={isSaved ? 'Rimuovi dai preferiti' : 'Salva nei preferiti'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => onSelectRecipe(recipe)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#2b5374] bg-[#edf4f8] hover:bg-[#e1edf5] rounded-xl transition-colors cursor-pointer"
                  >
                    Guarda
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
