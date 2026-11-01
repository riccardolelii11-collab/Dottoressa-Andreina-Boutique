# Andreina Boutique – Piattaforma Digitale di Contenuti e Prodotti Nutrizionali

Riprogettazione completa dell'applicazione in una vera **Web App per prodotti e contenuti digitali**, con approccio Mobile-First (PWA installabile), navigazione ergonomica dedicata per smartphone (bottom bar fissa a 5 tab) e per desktop (sidebar laterale fissa), catalogo degli e-book reali con copertine originali, archivio di video ricette gratuite con player completo e ricettario, area Premium riservata con paywall e stato abbonamento, catalogo video corsi, dashboard del profilo personale e modale di pre-checkout con connettori pronti.

---

### Revisione Utente e Decisioni Chiave Confermate

> [!IMPORTANT]
> **Sintesi delle scelte confermate in Fase 1 e requisiti inderogabili:**
> - **Navigazione Desktop**: Sidebar laterale fissa stile applicazione digitale contemporanea (ispirata a moderni content player e piattaforme editoriali).
> - **Navigazione Mobile**: Bottom bar fissa a 5 tab (*Home, E-book, Video ricette, Premium, Profilo*) con touch target minimi di 44px e Liquid Glass satinato.
> - **Esperienza Video**: Player video completo a pieno schermo con capitoli operativi, ingredienti dosati e passaggi di preparazione step-by-step.
> - **Flusso di Acquisto**: Modale di pre-checkout con riepilogo trasparente dell'ordine, informativa chiara e connettori gateway pronti per Stripe/PayPal (senza falsi pagamenti simulati).
> - **Rimozione Radicale Elementi Vetrina**: Eliminazione totale di sezioni "Chi sono", biografie professionali, percorsi nutrizionali clinici, consulenze/visite, prenotazioni appuntamenti e testimonianze di pazienti.

---

## 1. Visione Generale & Concetto Chiave

- **Cos'è**: Una boutique digitale e hub di contenuti nutrizionali focalizzato interamente sul prodotto digitale, consentendo agli utenti di scoprire e acquistare ebook, consultare video ricette pratiche gratuite, accedere a masterclass e lezioni riservate tramite abbonamento Premium, e gestire la propria libreria personale da qualsiasi dispositivo.
- **Target di Riferimento**: Persone interessate ad un'alimentazione sana, veloce e scientifica che desiderano strumenti operativi immediati (PDF scaricabili, guide per la spesa, video ricette veloci e corsi strutturati).
- **Valore Distintivo**: Esperienza da applicazione nativa tramite browser (installabile su iOS e Android come PWA), assenza di rumore commerciale o distrazioni cliniche, accesso istantaneo ai materiali digitali e qualità grafica d'eccellenza.

---

## 2. Esperienza Utente & Design Visivo

### Flussi Utente Principali

1. **Esplorazione e Scoperta (Home)**:
   - Banner dinamico di benvenuto con invito alla scoperta dei nuovi ebook e delle ricette del mese.
   - Rail orizzontale/griglia degli E-book in evidenza con prezzi reali e badge sconto.
   - Selezione delle Video Ricette gratuite della settimana con preview visuale e tempo di preparazione.
   - Vetrina dell'abbonamento Premium con anteprima dei contenuti sbloccabili e vantaggi esclusivi.
   - Vetrina dei Video Corsi disponibili.

2. **Catalogo E-book & Scheda Dettaglio**:
   - Vetrina dei 4 prodotti reali con copertine e dati originali da `dottoressaandreinaolivieri.it`:
     1. *I menu salvatempo della tua nutrizionista* (17,10 € / 18,00 €)
     2. *Alimentazione e ciclo mestruale* (12,90 € + link Amazon versione cartacea)
     3. *Migliora la tua colazione* (12,90 € + link Amazon versione cartacea)
     4. *Componi i tuoi pasti da asporto* (12,90 €)
   - Scheda prodotto approfondita con visualizzazione ad alta definizione, indice dei capitoli, benefici nutrizionali e pulsante di pre-checkout.
   - Lettore PDF integrato per i contenuti già posseduti o in estratto preview.

3. **Libreria Video Ricette Gratuite**:
   - Filtro rapido per occasione (*Colazioni*, *Pranzi veloci*, *Snack bilanciati*, *Cene leggere*).
   - Apertura del player con video in primo piano, scrubber interattivo, elenco ingredienti dosati e sequenza degli step di preparazione.

4. **Area Premium & Paywall**:
   - Per utenti non abbonati: panoramica dei vantaggi (ricette esclusive, approfondimenti scientifici, lezioni registrate, materiale PDF riservato), selettore piano (mensile / annuale) e pulsante di abbonamento.
   - Per utenti abbonati: accesso immediato a tutti i contenuti contrassegnati con badge dorato/blu *Premium*, con download di dispense esclusive.

5. **Catalogo Video Corsi**:
   - Corsi strutturati a moduli con indicazione del programma, durata totale, prezzo dedicato o inclusione nel piano Premium.

6. **Profilo & Area Personale**:
   - Accesso con autenticazione dimostrativa predisposta (Login, Registrazione, Password dimenticata).
   - Scheda *I miei acquisti* con storico ordini e fatture scaricabili.
   - Schede dedicate *I miei E-book*, *I miei Corsi* e *I miei contenuti Premium*.
   - Gestione stato abbonamento (Attivo / Rinnovo / Annulla) e preferenze account.

### Identità Grafica & Sistema Visivo

- **Palette Cromatica**:
  - Sfondo principale: Bianco puro (`#ffffff`) e grigio chiarissimo neutro (`#f8fafc`).
  - Colore Identificativo Brand: Azzurro polvere (`#9dbdd1`, `#cbe1ef`).
  - Accenti e Pulsanti Primari: Blu tenue / denim elegante (`#2b5374`, hover `#1f3f5a`).
  - Testi Primari e Titoli: Blu navy profondo (`#0f2338`).
  - Dettagli secondari e testi di supporto: Grigio ardesia medio (`#64748b`).
- **Tipografia**:
  - *Titoli & Hero*: Font serif raffinato (`font-editorial` / Cormorant Garamond / Playfair Display).
  - *Interfaccia, Paragrafi & Controlli*: Font sans-serif moderno, pulito e geometrico ad alta leggibilità.
  - *Prezzi & Durate*: Tabular numerals (`tabular-nums`) per perfetto allineamento visivo.
- **Liquid Glass & Superfici**:
  - Satinato neutro con blur discreto (`backdrop-blur-md`) per la sidebar desktop, la bottom bar mobile e le barre di intestazione.
  - Sfumature delicate azzurrate per modali e schede floating.
  - Rispetto del *Zero-Pill Discipline*: metadati e categorie presentati con testo pulito e separatori tipografici (`·`), senza capsule pesanti.

---

## 3. Decisioni di Prodotto & Trade-Off Architetturali

1. **Architettura Mobile-First con Layout Responsive Adattivo**:
   - *Scelta*: Su schermi smartphone ($\le 768\text{px}$) viene attivata la bottom bar ergonomica a 5 voci e un'intestazione compatta ($\le 56\text{px}$). Su desktop ($\ge 1024\text{px}$) l'interfaccia espande una sidebar laterale elegante a larghezza fissa (260px) con area contenuti a tutta ampiezza.
   - *Motivazione*: Garantisce che su mobile l'utente percepisca una vera app installabile con raggiungibilità del pollice ottimale, evitando l'effetto "sito desktop compresso".

2. **Dati Reali vs Dati Dimostrativi**:
   - *Scelta*: Gli ebook utilizzano fedelmente i titoli, le copertine autentiche, i prezzi e le descrizioni recuperate dal sito originale. Le video ricette, i corsi e l'abbonamento premium sono strutturati con dati dimostrativi di qualità professionale, chiaramente etichettati, pronti per l'alimentazione da CMS/Database.
   - *Motivazione*: Rispetta la direttiva dell'utente di non inventare libri inesistenti e allo stesso tempo offre un'esperienza ricca e completa per la fruizione digitale.

3. **Integrazione PWA & Installabilità**:
   - *Scelta*: Configurazione del Web App Manifest con modalità `standalone`, icone ad alta risoluzione e componente `PWAInstallButton` con istruzioni dedicate per iOS Safari ("Aggiungi a schermata Home").
   - *Motivazione*: Soddisfa la richiesta esplicita di rendere Andreina Boutique installabile direttamente dalla web app.

4. **Flusso di Pre-Checkout Trasparente**:
   - *Scelta*: Modale elegante di finalizzazione dell'ordine con riepilogo prodotti, calcolo IVA, casella coupon e predisposizione per i provider di pagamento (Stripe, PayPal, Apple Pay) con indicazione esplicita di ambiente di test/predisposto.
   - *Motivazione*: Evita ingannevoli notifiche di "acquisto completato con addebito" e fornisce al contempo l'architettura pronta per il collegamento backend.

---

## 4. Architettura Tecnica & Modello dei Dati

### Diagramma dei Componenti & Navigazione

```
┌────────────────────────────────────────────────────────────────────────┐
│                          ANDREINA BOUTIQUE                             │
├────────────────────────────┬───────────────────────────────────────────┤
│    DESKTOP SIDEBAR         │             MAIN APP VIEWPORT             │
│  ┌──────────────────────┐  │  ┌─────────────────────────────────────┐  │
│  │ Logo Andreina Boutiq.│  │  │ Top Bar: Ricerca · PWA · Profilo/Cart│ │
│  ├──────────────────────┤  │  ├─────────────────────────────────────┤  │
│  │ ⊞ Home               │  │  │                                     │  │
│  │ 📖 E-book            │  │  │ ACTIVE VIEW:                        │  │
│  │ 🎬 Video Ricette     │  │  │ • HomeDiscoveryView                │  │
│  │ ★ Premium Club       │  │  │ • EbooksCatalogView                 │  │
│  │ 🎓 Video Corsi       │  │  │ • VideoRecipesLibraryView           │  │
│  │ 👤 Profilo Utente    │  │  │ • PremiumSubscriptionView           │  │
│  ├──────────────────────┤  │  │ • VideoCoursesCatalogView           │  │
│  │ 📥 Installa App      │  │  │ • PersonalProfileDashboardView      │  │
│  │ ⚙️ Gestione Admin    │  │  │ • ProductDetailView (Ebook/Corso)   │  │
│  └──────────────────────┘  │  │                                     │  │
│                            │  └─────────────────────────────────────┘  │
├────────────────────────────┴───────────────────────────────────────────┤
│ MOBILE BOTTOM NAV (≤768px): [Home] [Ebook] [Ricette] [Premium] [Profilo]│
└────────────────────────────────────────────────────────────────────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   ▼                           ▼
        MODALI INTERATTIVE:          CONTROLLI DI FRUIZIONE:
        • PreCheckoutModal (Stripe)  • VideoPlayer (Capitoli/Ricetta)
        • AuthModal (Login/Reg)      • PdfReader (Viewer Ebook)
        • CartDrawer (Carrello)      • PWAInstallGuide (iOS)
```

### Struttura Entità & Dati

- **Product (Ebook & Corsi)**:
  - `id`, `slug`, `title`, `subtitle`, `category` (`'ebook' | 'video_recipe' | 'video_course' | 'premium_content'`)
  - `price`, `originalPrice`, `isFree`, `isPremiumOnly`, `coverImage`, `amazonUrl`
  - `shortDescription`, `fullDescription`, `chapters`, `keyBenefits`, `format`
- **VideoRecipe**:
  - `id`, `title`, `duration`, `difficulty`, `category` (`'colazione' | 'pranzo' | 'snack' | 'cena'`)
  - `thumbnailUrl`, `videoUrl`, `ingredients: { name, amount }[]`, `steps: string[]`, `nutritionalNotes`
- **UserProfile & Abbonamento**:
  - `name`, `email`, `isLoggedIn`, `hasActiveSubscription`, `subscriptionPlan` (`'monthly' | 'annual' | null`)
  - `purchasedProductIds: string[]`, `savedRecipeIds: string[]`
- **Cart & Pre-Checkout**:
  - `items: CartItem[]`, `subtotal`, `vat`, `appliedCoupon`

---

## 5. Fasi di Implementazione Sequenziale

1. **Aggiornamento Tipologie e Dataset Centralizzato (`src/types.ts` & `src/data/products.ts`)**:
   - Integrazione dei 4 ebook reali con i link ufficiali delle immagini e le schede complete.
   - Integrazione dell'archivio video ricette gratuite con ingredienti e step.
   - Definizione dei pacchetti abbonamento Premium e dei corsi video dimostrativi.

2. **Nuova Struttura di Layout Responsive (`src/components/Navigation`)**:
   - Creazione della **Sidebar Desktop** elegante con logo `Andreina Boutique`, indicatori attivi e bottone di installazione PWA.
   - Creazione della **Mobile Bottom Bar** a 5 tab con icone chiare e touch target ergonomici.
   - Top bar minimale con ricerca contestuale, indicatore cart e avatar profilo.

3. **Viste Principali della Web App (`src/pages/`)**:
   - `HomePage`: Banner di scoperta, carousel e-book, griglia video ricette, teaser Premium e catalogo corsi.
   - `EbooksPage`: Catalogo moderno a griglia con card prodotto raffinate, prezzi reali, badge e accesso al dettaglio.
   - `VideoRecipesPage`: Libreria ricette filtrabile per pasto, durata e difficoltà.
   - `PremiumPage`: Presentazione immersiva del club esclusivo, paywall con anteprima dei contenuti bloccati e selettore piano.
   - `CoursesPage`: Vetrina corsi con moduli e lezioni.
   - `ProfilePage`: Dashboard utente con schede *I miei E-book*, *I miei Corsi*, *I miei contenuti Premium*, gestione account e stato abbonamento.
   - `ProductDetailPage`: Scheda approfondita del singolo prodotto con pulsante acquisto e indice.

4. **Modali & Player di Fruizione**:
   - `RecipePlayerModal`: Schermata video in primo piano affiancata da ingredienti e passaggi di cucina step-by-step.
   - `PreCheckoutModal`: Schermata trasparente di pre-pagamento predisposta per gateway esterni.
   - `AuthModal`: Login / Registrazione / Recupero password con switch rapido.
   - `PdfReaderModal`: Lettura online per gli ebook sbloccati.

5. **PWA & Integrazione Manifest**:
   - Configurazione Web App Manifest con nome, tema `#ffffff`, icone e hook `usePWAInstall` con guida iOS.
