export type NavigationTab = 
  | 'home' 
  | 'ebooks' 
  | 'recipes' 
  | 'premium' 
  | 'courses' 
  | 'profile' 
  | 'product-detail'
  | 'admin-preview';

export interface ProductChapter {
  title: string;
  durationOrPages?: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'ebook' | 'video_course' | 'premium_content';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  formattedPrice: string;
  isFree: boolean;
  isPremiumOnly: boolean;
  coverImage: string;
  amazonUrl?: string;
  originalUrl?: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  format: string; // e.g. "Ebook PDF · 120 Pagine", "Video Corso HD · 8 Moduli"
  level: string; // e.g. "Tutti i livelli", "Intermedio"
  lastUpdated: string;
  shortDescription: string;
  fullDescription: string[];
  keyBenefits: string[];
  chapters: ProductChapter[];
  targetAudience: string[];
  featuresList: string[];
  previewExcerpt?: string[];
  demoVideoDuration?: string;
}

export interface VideoRecipeIngredient {
  name: string;
  amount: string;
}

export interface VideoRecipeStep {
  stepNumber: number;
  instruction: string;
  tip?: string;
}

export interface VideoRecipe {
  id: string;
  slug: string;
  title: string;
  category: 'colazione' | 'pranzo' | 'snack' | 'cena';
  categoryLabel: string;
  shortDescription: string;
  prepTime: string;
  cookTime: string;
  difficulty: 'Facile' | 'Media' | 'Avanzata';
  thumbnailUrl: string;
  videoDuration: string;
  isPremium: boolean;
  ingredients: VideoRecipeIngredient[];
  steps: VideoRecipeStep[];
  nutritionalNotes: string;
  dietaryTags: string[];
}

export interface VideoCourseModuleLesson {
  id: string;
  title: string;
  duration: string;
  previewAvailable?: boolean;
}

export interface VideoCourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: VideoCourseModuleLesson[];
}

export interface VideoCourse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  formattedPrice: string;
  isIncludedInPremium: boolean;
  coverImage: string;
  totalDuration: string;
  modulesCount: number;
  level: string;
  description: string;
  modules: VideoCourseModule[];
  handoutAvailable: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserOrder {
  id: string;
  orderNumber: string;
  date: string;
  items: { title: string; price: number; format: string }[];
  total: number;
  status: 'Completato' | 'In elaborazione';
  invoicePdfName: string;
}

export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  registeredDate: string;
  hasActiveSubscription: boolean;
  subscriptionPlan: 'monthly' | 'annual' | null;
  subscriptionRenewalDate?: string;
  purchasedProductIds: string[];
  savedRecipeIds: string[];
  orders: UserOrder[];
}
