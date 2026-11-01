import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  Product, 
  VideoRecipe, 
  VideoCourse, 
  CartItem, 
  UserProfile 
} from './types';
import { 
  REAL_EBOOKS, 
  FREE_VIDEO_RECIPES, 
  VIDEO_COURSES, 
  DEFAULT_USER_PROFILE 
} from './data/products';

import { DesktopSidebar } from './components/DesktopSidebar';
import { MobileTopBar } from './components/MobileTopBar';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CartDrawer } from './components/CartDrawer';
import { PreCheckoutModal } from './components/PreCheckoutModal';
import { RecipePlayerModal } from './components/RecipePlayerModal';
import { PdfReaderModal } from './components/PdfReaderModal';
import { AuthModal } from './components/AuthModal';
import { NotificationToast } from './components/NotificationToast';

import { HomePage } from './pages/HomePage';
import { EbooksPage } from './pages/EbooksPage';
import { VideoRecipesPage } from './pages/VideoRecipesPage';
import { PremiumPage } from './pages/PremiumPage';
import { CoursesPage } from './pages/CoursesPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AdminPreviewPage } from './pages/AdminPreviewPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [ebooks, setEbooks] = useState<Product[]>(REAL_EBOOKS);
  const [recipes] = useState<VideoRecipe[]>(FREE_VIDEO_RECIPES);
  const [courses] = useState<VideoCourse[]>(VIDEO_COURSES);

  // Selected item states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(REAL_EBOOKS[0]);
  const [activeRecipe, setActiveRecipe] = useState<VideoRecipe | null>(null);

  // User and cart state
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPreCheckoutOpen, setIsPreCheckoutOpen] = useState(false);
  const [checkoutProducts, setCheckoutProducts] = useState<Product[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPdfReaderOpen, setIsPdfReaderOpen] = useState(false);
  const [pdfProduct, setPdfProduct] = useState<Product | null>(null);
  const [isRecipePlayerOpen, setIsRecipePlayerOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Navigation router
  const handleNavigate = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Selection
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductId = (id: string) => {
    const found = ebooks.find((p) => p.id === id);
    if (found) {
      handleSelectProduct(found);
    }
  };

  // Recipe Selection & Playback
  const handleSelectRecipe = (recipe: VideoRecipe) => {
    setActiveRecipe(recipe);
    setIsRecipePlayerOpen(true);
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev;
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Aggiunto al carrello: ${product.title}`);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Prodotto rimosso dal carrello.');
  };

  // Direct checkout for single item
  const handleQuickBuy = (product: Product) => {
    setCheckoutProducts([product]);
    setIsPreCheckoutOpen(true);
  };

  // Cart checkout for all items
  const handleCartCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutProducts(cartItems.map((item) => item.product));
    setIsCartOpen(false);
    setIsPreCheckoutOpen(true);
  };

  // Subscription checkout
  const handleSubscriptionCheckout = (plan: 'monthly' | 'annual') => {
    const subProduct: Product = {
      id: `sub-premium-${plan}`,
      slug: `abbonamento-premium-${plan}`,
      title: `Abbonamento Andreina Boutique Premium (${plan === 'annual' ? 'Annuale' : 'Mensile'})`,
      subtitle: 'Accesso completo a video masterclass, dispense e guide esclusive',
      category: 'premium_content',
      categoryLabel: 'Club Premium',
      price: plan === 'annual' ? 89.00 : 9.90,
      formattedPrice: plan === 'annual' ? '€ 89,00' : '€ 9,90',
      isFree: false,
      isPremiumOnly: true,
      coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviewsCount: 140,
      format: 'Accesso Digitale Illimitato',
      level: 'Tutti i livelli',
      lastUpdated: 'Attuale',
      shortDescription: 'Tutte le masterclass e i protocolli nutrizionali riservati.',
      fullDescription: ['Abbonamento al Club digitale della Dott.ssa Andreina Olivieri.'],
      keyBenefits: ['Masterclass in 4K', 'Dispense PDF da 64 pagine', 'Cancellazione flessibile'],
      chapters: [],
      targetAudience: [],
      featuresList: []
    };
    setCheckoutProducts([subProduct]);
    setIsPreCheckoutOpen(true);
  };

  // Course checkout
  const handleCourseCheckout = (course: VideoCourse) => {
    const courseProduct: Product = {
      id: course.id,
      slug: course.slug,
      title: course.title,
      subtitle: course.subtitle,
      category: 'video_course',
      categoryLabel: 'Video Corso Pratico',
      price: course.price,
      formattedPrice: course.formattedPrice,
      isFree: false,
      isPremiumOnly: false,
      coverImage: course.coverImage,
      rating: 4.9,
      reviewsCount: 45,
      format: `${course.modulesCount} Moduli · ${course.totalDuration}`,
      level: course.level,
      lastUpdated: 'Edizione Corrente',
      shortDescription: course.description,
      fullDescription: [course.description],
      keyBenefits: ['Dispensa operativa inclusa', 'Accesso a vita senza limiti'],
      chapters: course.modules.map((m) => ({ title: m.title, durationOrPages: m.duration, description: '' })),
      targetAudience: [],
      featuresList: []
    };
    setCheckoutProducts([courseProduct]);
    setIsPreCheckoutOpen(true);
  };

  // Authorization callback from PreCheckoutModal
  const handleCheckoutAuthorized = (productIds: string[]) => {
    setUser((prev) => ({
      ...prev,
      purchasedProductIds: Array.from(new Set([...prev.purchasedProductIds, ...productIds])),
      orders: [
        {
          id: `ord-${Date.now()}`,
          orderNumber: `AB-2026-${Math.floor(100 + Math.random() * 900)}`,
          date: 'Oggi',
          items: checkoutProducts.map((p) => ({ title: p.title, price: p.price, format: p.format })),
          total: checkoutProducts.reduce((sum, p) => sum + p.price, 0),
          status: 'Completato',
          invoicePdfName: `Ricevuta_Ordine_${Date.now()}.pdf`
        },
        ...prev.orders
      ]
    }));

    // If subscription was purchased, mark active
    if (productIds.some(id => id.includes('sub-premium'))) {
      setUser(prev => ({
        ...prev,
        hasActiveSubscription: true,
        subscriptionPlan: productIds.some(id => id.includes('annual')) ? 'annual' : 'monthly'
      }));
    }

    // Clear cart if items matched
    setCartItems([]);
  };

  // Toggle user subscription in demo
  const handleToggleSubscription = () => {
    setUser((prev) => ({
      ...prev,
      hasActiveSubscription: !prev.hasActiveSubscription,
      subscriptionPlan: !prev.hasActiveSubscription ? 'monthly' : null
    }));
  };

  // Toggle recipe bookmark
  const handleToggleSaveRecipe = (recipeId: string) => {
    setUser((prev) => {
      const exists = prev.savedRecipeIds.includes(recipeId);
      return {
        ...prev,
        savedRecipeIds: exists
          ? prev.savedRecipeIds.filter((id) => id !== recipeId)
          : [...prev.savedRecipeIds, recipeId]
      };
    });
  };

  // Add new product from Admin panel
  const handleAddNewProduct = (newProduct: Product) => {
    setEbooks((prev) => [newProduct, ...prev]);
    showToast(`Nuovo prodotto "${newProduct.title}" aggiunto al catalogo.`);
  };

  // PDF Reader open
  const handleOpenPdfReader = (ebook: Product) => {
    setPdfProduct(ebook);
    setIsPdfReaderOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-[#0f2338] flex flex-col md:flex-row antialiased selection:bg-[#cbe1ef] selection:text-[#0b1a2b]">
      
      {/* 1. Desktop Sidebar (Hidden on mobile) */}
      <DesktopSidebar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        user={user}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 2. Main Content Container */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen pb-20 md:pb-8">
        
        {/* Mobile Top Bar (Hidden on desktop) */}
        <MobileTopBar
          onNavigate={handleNavigate}
          user={user}
          cartCount={cartItems.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {/* Viewport Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8">
          
          {currentTab === 'home' && (
            <HomePage
              ebooks={ebooks}
              recipes={recipes}
              courses={courses}
              onNavigate={handleNavigate}
              onSelectProduct={handleSelectProduct}
              onSelectRecipe={handleSelectRecipe}
              onQuickBuy={handleQuickBuy}
              onToast={showToast}
            />
          )}

          {currentTab === 'ebooks' && (
            <EbooksPage
              ebooks={ebooks}
              onSelectProduct={handleSelectProduct}
              onQuickBuy={handleQuickBuy}
            />
          )}

          {currentTab === 'recipes' && (
            <VideoRecipesPage
              recipes={recipes}
              onSelectRecipe={handleSelectRecipe}
              savedRecipeIds={user.savedRecipeIds}
              onToggleSaveRecipe={handleToggleSaveRecipe}
              onToast={showToast}
            />
          )}

          {currentTab === 'premium' && (
            <PremiumPage
              user={user}
              onOpenCheckoutSubscription={handleSubscriptionCheckout}
              onToggleSubscriptionDemo={handleToggleSubscription}
              onToast={showToast}
            />
          )}

          {currentTab === 'courses' && (
            <CoursesPage
              courses={courses}
              hasPremiumAccess={user.hasActiveSubscription}
              onOpenCheckoutCourse={handleCourseCheckout}
              onToast={showToast}
            />
          )}

          {currentTab === 'profile' && (
            <ProfilePage
              user={user}
              allEbooks={ebooks}
              allCourses={courses}
              allRecipes={recipes}
              onOpenPdfReader={handleOpenPdfReader}
              onLogout={() => setUser((prev) => ({ ...prev, isLoggedIn: false }))}
              onLogin={(email, name) => setUser((prev) => ({ ...prev, isLoggedIn: true, email, name }))}
              onToggleSubscription={handleToggleSubscription}
              onToast={showToast}
              onNavigateToTab={handleNavigate}
            />
          )}

          {currentTab === 'product-detail' && selectedProduct && (
            <ProductDetailPage
              product={selectedProduct}
              onBack={() => handleNavigate('ebooks')}
              onAddToCart={handleAddToCart}
              onDirectBuy={handleQuickBuy}
              isPurchased={user.purchasedProductIds.includes(selectedProduct.id)}
              onOpenPdfReader={handleOpenPdfReader}
              onSelectProduct={handleSelectProductId}
              allProducts={ebooks}
              onToast={showToast}
            />
          )}

          {currentTab === 'admin-preview' && (
            <AdminPreviewPage
              products={ebooks}
              onBackToBoutique={() => handleNavigate('home')}
              onAddNewProduct={handleAddNewProduct}
              onToast={showToast}
            />
          )}

        </main>
      </div>

      {/* 3. Mobile Bottom Tab Bar (Pinned at bottom on smartphones) */}
      <MobileBottomBar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        user={user}
      />

      {/* 4. Global Modals & Drawers */}
      
      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCartCheckout}
        onNavigateToBoutique={() => handleNavigate('ebooks')}
      />

      {/* Transparent Pre-Checkout Modal (Ready for Stripe/PayPal) */}
      <PreCheckoutModal
        isOpen={isPreCheckoutOpen}
        onClose={() => setIsPreCheckoutOpen(false)}
        products={checkoutProducts}
        onSuccessAuthorize={handleCheckoutAuthorized}
        onToast={showToast}
      />

      {/* Free Video Recipe Player Modal */}
      <RecipePlayerModal
        recipe={activeRecipe}
        isOpen={isRecipePlayerOpen}
        onClose={() => setIsRecipePlayerOpen(false)}
        onToast={showToast}
        isSaved={activeRecipe ? user.savedRecipeIds.includes(activeRecipe.id) : false}
        onToggleSave={handleToggleSaveRecipe}
      />

      {/* PDF Reader Modal */}
      <PdfReaderModal
        product={pdfProduct}
        isOpen={isPdfReaderOpen}
        onClose={() => setIsPdfReaderOpen(false)}
        onToast={showToast}
      />

      {/* Popup Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(name, email) => {
          setUser((prev) => ({ ...prev, isLoggedIn: true, name, email }));
          showToast(`Accesso effettuato: benvenuto/a ${name}`);
        }}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <NotificationToast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}

    </div>
  );
}
