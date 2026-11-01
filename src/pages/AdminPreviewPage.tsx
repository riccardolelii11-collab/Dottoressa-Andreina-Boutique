import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, ArrowLeft, BookOpen, Video, DollarSign, Users, Download, Eye, Edit3, Trash2, Check, Upload, X, ShieldAlert } from 'lucide-react';
import { ProductCoverPlaceholder } from '../components/ProductCoverPlaceholder';

interface AdminPreviewPageProps {
  products: Product[];
  onBackToBoutique: () => void;
  onAddNewProduct: (newProduct: Product) => void;
  onToast: (msg: string) => void;
}

export const AdminPreviewPage: React.FC<AdminPreviewPageProps> = ({
  products,
  onBackToBoutique,
  onAddNewProduct,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'orders' | 'subscribers'>('catalog');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<'ebook' | 'video_course' | 'premium_content'>('ebook');
  const [newPrice, setNewPrice] = useState('25.00');
  const [newFormat, setNewFormat] = useState('Ebook PDF · 80 Pagine');
  const [newShortDesc, setNewShortDesc] = useState('');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const priceNum = parseFloat(newPrice) || 0;
    const isFree = priceNum === 0;

    const createdProduct: Product = {
      id: `prod-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Nuova risorsa nutrizionale per la Boutique.',
      category: newCategory,
      categoryLabel: newCategory === 'ebook' ? 'Ebook & Guida' : newCategory === 'video_course' ? 'Video Corso Pratico' : 'Contenuto Esclusivo Premium',
      price: isFree ? 0 : priceNum,
      formattedPrice: isFree ? 'Gratuito' : `€ ${priceNum.toFixed(2).replace('.', ',')}`,
      isFree: isFree,
      isPremiumOnly: newCategory === 'premium_content',
      coverImage: '',
      badge: 'Nuovo',
      rating: 5.0,
      reviewsCount: 1,
      format: newFormat,
      level: 'Per tutti i livelli',
      lastUpdated: 'Oggi',
      shortDescription: newShortDesc || 'Guida scientifica e pratica a cura della Dott.ssa Andreina Olivieri.',
      fullDescription: [
        newShortDesc || 'Descrizione completa del nuovo prodotto digitale disponibile nella Boutique.',
        'Contenuto realizzato secondo principi scientifici di biochimica nutrizionale e sostenibilità quotidiana.'
      ],
      keyBenefits: [
        'Linee guida chiare e applicabili immediatamente',
        'Materiale in alta definizione con accesso permanente a vita',
        'Consigli e strategie nutrizionali verificate'
      ],
      chapters: [
        {
          title: 'Modulo Introduttivo',
          durationOrPages: '15 pagine',
          description: 'Basi biologiche e indicazioni pratiche.'
        }
      ],
      targetAudience: ['Chi desidera approfondire argomenti specifici di nutrizione consapevole.'],
      featuresList: ['Download immediato', 'Supporto digitale']
    };

    onAddNewProduct(createdProduct);
    setIsAddModalOpen(false);
    onToast(`Prodotto "${createdProduct.title}" aggiunto con successo al catalogo!`);
    
    // Reset form
    setNewTitle('');
    setNewSubtitle('');
    setNewShortDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Bar with Navigation and Context */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#e2e8f0] pb-6">
        <div>
          <button
            onClick={onBackToBoutique}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#2b5374] hover:text-[#193752] mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ritorna alla Boutique Pubblica</span>
          </button>
          <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0f2338]">
            Area Riservata Professionista
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            Pannello di controllo predisposto per la gestione di ebook, video lezioni e catalogo della Dott.ssa Andreina Olivieri.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#2b5374] hover:bg-[#1f3f5a] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Aggiungi Nuovo Prodotto</span>
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <div className="flex justify-between items-center text-[#64748b] text-xs">
            <span>Prodotti in Catalogo</span>
            <BookOpen className="w-4 h-4 text-[#2b5374]" />
          </div>
          <div className="text-2xl font-semibold text-[#0f2338] mt-2 tabular-nums">
            {products.length}
          </div>
          <p className="text-[11px] text-emerald-700 mt-1">Tutti attivi e disponibili</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <div className="flex justify-between items-center text-[#64748b] text-xs">
            <span>Download Risorse Gratuite</span>
            <Download className="w-4 h-4 text-[#2b5374]" />
          </div>
          <div className="text-2xl font-semibold text-[#0f2338] mt-2 tabular-nums">
            348
          </div>
          <p className="text-[11px] text-[#64748b] mt-1">Questo mese</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <div className="flex justify-between items-center text-[#64748b] text-xs">
            <span>Iscritti alla Newsletter</span>
            <Users className="w-4 h-4 text-[#2b5374]" />
          </div>
          <div className="text-2xl font-semibold text-[#0f2338] mt-2 tabular-nums">
            1.240
          </div>
          <p className="text-[11px] text-emerald-700 mt-1">+84 nuovi lettori</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <div className="flex justify-between items-center text-[#64748b] text-xs">
            <span>Stato Piattaforma</span>
            <ShieldAlert className="w-4 h-4 text-[#2b5374]" />
          </div>
          <div className="text-sm font-semibold text-[#2b5374] mt-2">
            Architettura Predisposta
          </div>
          <p className="text-[11px] text-[#64748b] mt-1">Pronta per integrazione DB e pagamenti</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e2e8f0] gap-8">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'catalog'
              ? 'border-[#2b5374] text-[#0f2338]'
              : 'border-transparent text-[#64748b] hover:text-[#0f2338]'
          }`}
        >
          Gestione Catalogo Prodotti
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'border-[#2b5374] text-[#0f2338]'
              : 'border-transparent text-[#64748b] hover:text-[#0f2338]'
          }`}
        >
          Monitoraggio Acquisti & Utenti
        </button>
      </div>

      {/* Tab: Catalog Table */}
      {activeTab === 'catalog' && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-xs">
          <div className="p-4 sm:p-6 border-b border-[#f1f5f9] flex justify-between items-center">
            <h3 className="font-editorial text-lg font-semibold text-[#0f2338]">
              Elenco Contenuti Pubblicati ({products.length})
            </h3>
            <span className="text-xs text-[#64748b]">
              Modifica prezzi e disponibilità istantanea
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Prodotto</th>
                  <th className="py-3 px-4">Tipologia</th>
                  <th className="py-3 px-4">Prezzo</th>
                  <th className="py-3 px-4">Formato</th>
                  <th className="py-3 px-4">Stato</th>
                  <th className="py-3 px-4 text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#fcfdfd]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {prod.coverImage ? (
                          <img
                            src={prod.coverImage}
                            alt={prod.title}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#cbdfe9]/70">
                            <ProductCoverPlaceholder product={prod} compact aspectRatio="square" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="font-semibold text-[#0f2338] block truncate max-w-xs sm:max-w-sm">
                            {prod.title}
                          </span>
                          <span className="text-[11px] text-[#64748b] truncate block">
                            {prod.subtitle}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-[11px] font-medium text-[#2b5374]">
                        {prod.categoryLabel}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-semibold text-[#0f2338] tabular-nums">
                      {prod.isFree ? 'Gratuito' : prod.formattedPrice}
                    </td>

                    <td className="py-3 px-4 text-[#64748b]">
                      {prod.format}
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        <Check className="w-3 h-3" />
                        <span>Pubblicato</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => onToast(`Apertura editor per: ${prod.title}`)}
                          className="p-1.5 text-[#2b5374] hover:bg-[#edf4f8] rounded-lg transition-colors cursor-pointer"
                          title="Modifica prodotto"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Orders Overview */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 space-y-4">
          <h3 className="font-editorial text-lg font-semibold text-[#0f2338]">
            Riepilogo Transazioni e Sblocchi Digitali
          </h3>
          <p className="text-xs text-[#64748b]">
            Dati dimostrativi pronti per il collegamento al gateway di pagamento (Stripe / PayPal) e gestione licenze.
          </p>

          <div className="space-y-3">
            {[
              { id: 'ORD-982', customer: 'Chiara V.', email: 'chiara.v@example.it', item: 'Masterclass Meal Prep', amount: '€ 39,00', date: 'Oggi, 11:20' },
              { id: 'ORD-981', customer: 'Marco T.', email: 'marco.t@example.it', item: 'Nutrizione Consapevole', amount: '€ 24,00', date: 'Ieri, 18:45' },
              { id: 'ORD-980', customer: 'Elena S.', email: 'elena.s@example.it', item: 'Guida Gratuita 7 Pilastri', amount: 'Gratuito', date: 'Ieri, 14:10' },
            ].map((ord) => (
              <div key={ord.id} className="p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#0f2338]">{ord.id}</span>
                    <span className="text-[#64748b]">·</span>
                    <span className="text-[#2b5374] font-medium">{ord.customer}</span>
                    <span className="text-[#94a3b8]">({ord.email})</span>
                  </div>
                  <p className="text-[#4a5e73] mt-0.5">{ord.item}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] text-[#94a3b8]">{ord.date}</span>
                  <span className="font-semibold text-[#0f2338] tabular-nums">{ord.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Aggiungi Nuovo Prodotto */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-[#0f2338]/45 backdrop-blur-md transition-opacity" 
          />

          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-3xl liquid-glass-azure text-left shadow-[0_24px_60px_-15px_rgba(15,35,56,0.25)] transition-all sm:my-8 sm:w-full sm:max-w-lg border border-white/80">
              
              <div className="px-6 py-5 border-b border-[#cbd5e1]/50 bg-white/40 backdrop-blur-xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#2b5374] uppercase tracking-wider block">
                    Area Professionista
                  </span>
                  <h3 className="font-editorial text-lg font-semibold text-[#0f2338]">
                    Pubblica un Nuovo Contenuto Digitale
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 text-[#64748b] hover:text-[#0f2338] glass-pill-control rounded-full transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-[#0f2338] mb-1">Titolo del prodotto</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Es. Ebook: Crononutrizione e Ritmi Circadiani"
                    className="w-full px-3 py-2 border border-[#cbd5e1] rounded-lg focus:outline-none focus:border-[#2b5374]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#0f2338] mb-1">Sottotitolo / Claim sintetico</label>
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                    placeholder="Es. Come ottimizzare i livelli di energia quotidiana"
                    className="w-full px-3 py-2 border border-[#cbd5e1] rounded-lg focus:outline-none focus:border-[#2b5374]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-[#0f2338] mb-1">Categoria</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 border border-[#cbd5e1] rounded-lg focus:outline-none focus:border-[#2b5374] bg-white cursor-pointer"
                    >
                      <option value="ebook">Ebook & Guida PDF</option>
                      <option value="video_course">Video Corso Pratico</option>
                      <option value="premium_content">Contenuto Esclusivo Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#0f2338] mb-1">Prezzo (€)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="24.00"
                      className="w-full px-3 py-2 border border-[#cbd5e1] rounded-lg focus:outline-none focus:border-[#2b5374]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#0f2338] mb-1">Formato</label>
                  <input
                    type="text"
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value)}
                    placeholder="Es. Ebook PDF · 120 Pagine oppure Video HD Streaming"
                    className="w-full px-3 py-2 border border-[#cbd5e1] rounded-lg focus:outline-none focus:border-[#2b5374]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#0f2338] mb-1">Descrizione breve</label>
                  <textarea
                    rows={2}
                    value={newShortDesc}
                    onChange={(e) => setNewShortDesc(e.target.value)}
                    placeholder="Breve testo che apparirà nella card della Boutique..."
                    className="w-full px-3 py-2 border border-[#cbd5e1] rounded-lg focus:outline-none focus:border-[#2b5374]"
                  />
                </div>

                {/* Upload simulation placeholder */}
                <div className="border border-dashed border-[#cbd5e1] rounded-xl p-4 text-center bg-[#f8fafc]">
                  <Upload className="w-5 h-5 mx-auto text-[#2b5374] mb-1" />
                  <span className="font-medium text-[#0f2338] block">Carica file digitale (PDF o Video MP4)</span>
                  <span className="text-[10px] text-[#94a3b8]">In questa versione demo il file viene simulato automaticamente</span>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-[#cbd5e1] text-[#64748b] rounded-lg hover:bg-[#f8fafc] cursor-pointer"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2b5374] hover:bg-[#1f3f5a] text-white font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Pubblica Prodotto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
