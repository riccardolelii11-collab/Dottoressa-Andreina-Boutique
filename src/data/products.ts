import { Product, VideoRecipe, VideoCourse, UserProfile } from '../types';

/**
 * PRODOTTI REALI DEDICATI ALLA BOUTIQUE
 * Recuperati direttamente dal sito ufficiale della Dott.ssa Andreina Olivieri.
 */
export const REAL_EBOOKS: Product[] = [
  {
    id: 'ebook-menu-salvatempo',
    slug: 'i-menu-salvatempo-della-tua-nutrizionista',
    title: 'I menu salvatempo della tua nutrizionista',
    subtitle: 'Consigli per la spesa e ricette per comporre pasti equilibrati e veloci',
    category: 'ebook',
    categoryLabel: 'Ebook & Ricettario Operativo',
    price: 17.10,
    originalPrice: 18.00,
    formattedPrice: '€ 17,10',
    isFree: false,
    isPremiumOnly: false,
    coverImage: '/assets/aistudio/I-menu-salvatempo-della-tua-nutrizionista_11fb9f5e.png',
    originalUrl: 'https://www.dottoressaandreinaolivieri.it/prodotto/i-menu-salvatempo-della-tua-nutrizionista-consigli-per-la-spesa-e-ricette-per-comporre-pasti-equilibrati-e-veloci/',
    badge: 'In Promozione',
    rating: 5.0,
    reviewsCount: 38,
    format: 'Ebook Digitale PDF · Formato Ottimizzato per Tablet e Smartphone',
    level: 'Per tutti i giorni',
    lastUpdated: 'Edizione Aggiornata 2026',
    shortDescription: 'Consigli pratici per organizzare la spesa, creare pasti equilibrati e preparare ricette veloci. Include proposte onnivore, vegetariane e vegane, menu stagionali e idee per pranzi da asporto.',
    fullDescription: [
      'Una guida indispensabile creata per chi ha poco tempo ma non vuole rinunciare a mangiare bene, con equilibrio e gusto durante la settimana.',
      'All’interno troverai strategie collaudate per fare la spesa in modo consapevole senza sprechi, schemi di combinazione degli alimenti per massimizzare sazietà ed energia, e decine di ricette pronte in meno di 25 minuti.',
      'Il manuale offre alternative flessibili adatte a regimi onnivori, vegetariani e vegani, oltre a pratiche soluzioni salva-cena e idee smart per i pasti da portare in ufficio o all’università.'
    ],
    keyBenefits: [
      'Pianificazione completa dei menu settimanali stagionali',
      'Guida alla spesa efficiente con lista degli indispensabili in dispensa',
      'Ricette rapide divise per categorie (onnivore, vegetariane, vegane)',
      'Soluzioni salva-tempo per cucinare in anticipo (batch cooking)'
    ],
    chapters: [
      {
        title: 'Capitolo 1: La Dispensa Intelligente',
        durationOrPages: 'Pag. 12 - 28',
        description: 'Come organizzare frigorifero e dispensa per non trovarsi mai senza idee sane.'
      },
      {
        title: 'Capitolo 2: La Tecnica del Piatto Equilibrato',
        durationOrPages: 'Pag. 29 - 48',
        description: 'La corretta proporzione di carboidrati complessi, proteine nobili e grassi buoni.'
      },
      {
        title: 'Capitolo 3: I Menu delle 4 Stagioni',
        durationOrPages: 'Pag. 49 - 88',
        description: '4 settimane complete di menu dettagliati con lista della spesa correlata.'
      },
      {
        title: 'Capitolo 4: Ricettario Rapido (sotto i 20 minuti)',
        durationOrPages: 'Pag. 89 - 134',
        description: 'Oltre 35 preparazioni bilanciate per pranzi e cene dell’ultimo minuto.'
      }
    ],
    targetAudience: [
      'Chi ha ritmi frenetici e poco tempo per cucinare',
      'Lavoratori e studenti che mangiano spesso fuori casa',
      'Famiglie che desiderano un’organizzazione settimanale fluida e serena'
    ],
    featuresList: [
      'Download immediato in formato PDF ad alta risoluzione',
      'Grafica curata e schede stampabili per il frigorifero',
      'Accessibile su tablet, smartphone, ereader e computer',
      'Aggiornamenti futuri inclusi'
    ],
    previewExcerpt: [
      '«Cucinare sano non significa passare ore ai fornelli né pesare ogni singolo grammo. L’equilibrio nutrizionale si fonda sulla scelta consapevole delle materie prime e sull’armonia degli abbinamenti biochimici.»',
      '«Quando la dispensa è organizzata con ingredienti versatili e nutrienti, comporre un pasto equilibrato richiede meno tempo di ordinare cibo d’asporto.»'
    ]
  },
  {
    id: 'ebook-alimentazione-ciclo-mestruale',
    slug: 'alimentazione-e-ciclo-mestruale',
    title: 'Alimentazione e ciclo mestruale',
    subtitle: 'La guida per supportare il benessere ormonale attraverso il cibo',
    category: 'ebook',
    categoryLabel: 'Ebook & Guida Nutrizionale',
    price: 12.90,
    formattedPrice: '€ 12,90',
    isFree: false,
    isPremiumOnly: false,
    coverImage: '/assets/aistudio/Alimentazione-ciclo-mestruale-centered.png',
    originalUrl: 'https://www.dottoressaandreinaolivieri.it/prodotto/alimentazione-e-ciclo-mestruale/',
    amazonUrl: 'https://amzn.to/44e9e1g',
    badge: 'Disponibile anche su Amazon',
    rating: 4.9,
    reviewsCount: 42,
    format: 'Ebook Digitale PDF · Disponibile anche in versione cartacea su Amazon',
    level: 'Benessere femminile',
    lastUpdated: 'Edizione Ufficiale',
    shortDescription: 'Guida dedicata all’alimentazione nelle diverse fasi del ciclo mestruale, dalla fase premestruale alla mestruazione, fino all’ovulazione.',
    fullDescription: [
      'Il ciclo mestruale non è solo il momento della mestruazione: è un ritmo biologico continuo che influenza energia, umore, appetito e sensibilità insulinica.',
      'Questo volume esplora nel dettaglio come il fabbisogno di micronutrienti cambi durante la fase follicolare, ovulatoria, luteale e mestruale, spiegando quali cibi privilegiare per attenuare dolori, ritenzione idrica e sbalzi d’umore.',
      'Include schemi pratici, ricette mirate per la sindrome premestruale (PMS) e indicazioni sugli integratori alimentari evidence-based.'
    ],
    keyBenefits: [
      'Comprensione chiara delle 4 fasi ormonali e del loro impatto sul metabolismo',
      'Strategie nutrizionali per contrastare gonfiore, ritenzione e craving di zuccheri',
      'Focus su magnesio, ferro, acidi grassi omega-3 e vitamine del gruppo B',
      'Menu consigliati per la fase luteale e mestruale'
    ],
    chapters: [
      {
        title: 'Fase Follicolare & Proliferativa',
        durationOrPages: 'Pag. 10 - 24',
        description: 'La risalita degli estrogeni, energia in crescita e scelte alimentari fresche.'
      },
      {
        title: 'Fase Ovulatoria: Il Picco Ormonale',
        durationOrPages: 'Pag. 25 - 38',
        description: 'Supporto epatico per la metabolizzazione degli estrogeni e idratazione.'
      },
      {
        title: 'Fase Luteale & Gestione della PMS',
        durationOrPages: 'Pag. 39 - 62',
        description: 'Il ruolo del progesterone, sazietà glicemica e rimedi naturali al gonfiore.'
      },
      {
        title: 'Fase Mestruale & Ricarica',
        durationOrPages: 'Pag. 63 - 86',
        description: 'Cibi caldi, ferro biodisponibile e riposo metabolico.'
      }
    ],
    targetAudience: [
      'Donne che desiderano vivere il ciclo mestruale con maggiore serenità e armonia',
      'Chi soffre di sindrome premestruale, sbalzi d’umore o dolori mestruali ricorrenti',
      'Professionisti e appassionati di salute femminile e ginecologia funzionale'
    ],
    featuresList: [
      'Edizione digitale PDF a colori sfogliabile ovunque',
      'Link diretto per ordinare la copia cartacea su Amazon per la tua libreria',
      'Schede sintetiche di automonitoraggio'
    ]
  },
  {
    id: 'ebook-migliora-la-tua-colazione',
    slug: 'migliora-la-tua-colazione',
    title: 'Migliora la tua colazione',
    subtitle: 'Ricette dolci, salate e vegane per iniziare la giornata con energia stabile',
    category: 'ebook',
    categoryLabel: 'Ebook & Guida Pratica',
    price: 12.90,
    formattedPrice: '€ 12,90',
    isFree: false,
    isPremiumOnly: false,
    coverImage: '/assets/aistudio/3-2_4eecd11f.png',
    originalUrl: 'https://www.dottoressaandreinaolivieri.it/prodotto/migliora-la-tua-colazione/',
    amazonUrl: 'https://amzn.to/4aN1o0Z',
    badge: 'Disponibile anche su Amazon',
    rating: 4.9,
    reviewsCount: 31,
    format: 'Ebook Digitale PDF · Disponibile anche in versione cartacea su Amazon',
    level: 'Alimentazione quotidiana',
    lastUpdated: 'Edizione Ufficiale',
    shortDescription: 'Guida dedicata alla colazione, con ricette dolci, salate e vegane, idee stagionali, consigli per la spesa e informazioni sugli ingredienti.',
    fullDescription: [
      'La colazione è spesso il pasto più monotono e sbilanciato della giornata, dominato da zuccheri semplici che provocano picchi glicemici seguiti da fame improvvisa e cali di concentrazione.',
      'Questa guida ribalta la concezione tradizionale della colazione proponendo oltre 40 ricette genuine e bilanciate: dai pancake integrali senza zucchero ai porridge caldi e freddi (overnight oats), fino alle opzioni salate ricche di proteine e alle alternative 100% vegetali.',
      'Troverai inoltre una dettagliata analisi degli ingredienti (farine integrali, bevande vegetali, dolcificanti naturali, semi oleosi) e suggerimenti per preparare le basi in anticipo.'
    ],
    keyBenefits: [
      'Basta picchi glicemici: come ottenere sazietà prolungata fino a pranzo',
      'Oltre 40 ricette suddivise tra colazioni dolci, salate e vegane',
      'Guida all’acquisto consapevole di yogurt, bevande vegetali e cereali',
      'Idee veloci da preparare in meno di 5 minuti al mattino'
    ],
    chapters: [
      {
        title: 'I Principi della Colazione Bilanciata',
        durationOrPages: 'Pag. 08 - 22',
        description: 'Perché la classica colazione bar zuccherina ti lascia affamato dopo due ore.'
      },
      {
        title: 'Colazioni Dolci Nutrienti',
        durationOrPages: 'Pag. 23 - 52',
        description: 'Porridge, waffle integrali, muffin senza zucchero raffinato e smoothie bowl.'
      },
      {
        title: 'La Svolta della Colazione Salata',
        durationOrPages: 'Pag. 53 - 74',
        description: 'Toast all’avocado e uova, hummus di ceci, pancake salati e formaggi magri.'
      },
      {
        title: 'Idee Vegane & Prep Ahead',
        durationOrPages: 'Pag. 75 - 96',
        description: 'Overnight oats, chia pudding e granola fatta in casa che dura 3 settimane.'
      }
    ],
    targetAudience: [
      'Chi arriva sempre stanco o affamato a metà mattina',
      'Chi desidera variare la propria routine della colazione senza complicarsi la vita',
      'Sportivi e famiglie alla ricerca di alternative genuine alle merendine industriali'
    ],
    featuresList: [
      'Formato PDF interattivo con indice cliccabile',
      'Link alla versione stampata su Amazon',
      'Valori nutrizionali e tempi di esecuzione per ogni ricetta'
    ]
  },
  {
    id: 'ebook-componi-i-tuoi-pasti-da-asporto',
    slug: 'componi-i-tuoi-pasti-da-asporto',
    title: 'Componi i tuoi pasti da asporto',
    subtitle: 'Strategie, contenitori e combinazioni per mangiare sano al lavoro e fuori casa',
    category: 'ebook',
    categoryLabel: 'Ebook & Guida Operativa',
    price: 12.90,
    formattedPrice: '€ 12,90',
    isFree: false,
    isPremiumOnly: false,
    coverImage: '/assets/aistudio/Libro-componi-i-tuoi-pasti-dasporto_5c9898ec.png',
    originalUrl: 'https://www.dottoressaandreinaolivieri.it/prodotto/componi-i-tuoi-pasti-da-asporto/',
    amazonUrl: 'https://www.amazon.it/Componi-tuoi-pasti-asporto-mangiare/dp/B0BZFG51D4',
    badge: 'Disponibile anche su Amazon',
    rating: 4.8,
    reviewsCount: 26,
    format: 'Ebook Digitale PDF · Formato Mobile Friendly',
    level: 'Pratico & Operativo',
    lastUpdated: 'Edizione Ufficiale',
    shortDescription: 'Guida pratica per organizzare e comporre pasti equilibrati da portare fuori casa, ideali per lavoro, università e viaggi.',
    fullDescription: [
      'Mangiare fuori casa non deve essere sinonimo di panini frettolosi al bar o piatti pronti ricchi di sale e grassi idrogenati.',
      'In questo ebook trovi un metodo scientifico e pratico per comporre la tua "schiscetta" perfetta: ricca di colori, digeribile per non provocare sonnolenza pomeridiana, e conservabile in sicurezza anche senza scaldavivande.',
      'Include la selezione dei migliori contenitori per alimenti (vetro borosilicato, acciaio termico), le tecniche di stratificazione nei barattoli (mason jar salad) e decine di ricette fresche a lunga tenuta.'
    ],
    keyBenefits: [
      'Come evitare il calo di concentrazione e il sonno post-pranzo al lavoro',
      'La tecnica dei barattoli a strati: condimenti sul fondo e verdure croccanti in cima',
      'Menu freddi per l’estate e piatti caldi con contenitori termici per l’inverno',
      'Risparmio economico notevole calcolato sul budget mensile'
    ],
    chapters: [
      {
        title: 'Igiene & Conservazione degli Alimenti',
        durationOrPages: 'Pag. 06 - 18',
        description: 'La catena del freddo, i materiali sicuri e come conservare i pasti trasportati.'
      },
      {
        title: 'La Formula del Pranzo Fuori Casa',
        durationOrPages: 'Pag. 19 - 36',
        description: 'Cereali in chicco a lento rilascio, proteine pratiche e verdure a bassa fermentazione.'
      },
      {
        title: 'Ricette Fredde in Vaso & Bowl',
        durationOrPages: 'Pag. 37 - 64',
        description: 'Insalate di cereali antichi, quinoa aromatica, legumi pronti e salse leggere.'
      },
      {
        title: 'Pasti Caldi da Ufficio',
        durationOrPages: 'Pag. 65 - 88',
        description: 'Zuppe dense, risotti da riscaldare e tortini proteici monoporzione.'
      }
    ],
    targetAudience: [
      'Professionisti in ufficio, pendolari e studenti universitari',
      'Chi vuole tagliare le spese dei pranzi fuori mantenendo alta la qualità del cibo',
      'Chi soffre di gonfiore e sonnolenza dopo la pausa pranzo'
    ],
    featuresList: [
      'PDF ottimizzato per consultazione rapida da smartphone durante la spesa',
      'Consigli precisi sui contenitori ermetici più durevoli',
      'Guida alle combinazioni salva-tempo della domenica sera'
    ]
  }
];

/**
 * LIBRERIA VIDEO RICETTE GRATUITE
 * Contenuti dimostrativi di qualità professionale, gratuiti ed accessibili a tutti gli utenti.
 */
export const FREE_VIDEO_RECIPES: VideoRecipe[] = [
  {
    id: 'recipe-porridge-avena',
    slug: 'porridge-avena-cremoso-frutti-bosco',
    title: 'Porridge d’Avena Cremoso ai Frutti di Bosco & Semi di Chia',
    category: 'colazione',
    categoryLabel: 'Colazione Bilanciata',
    shortDescription: 'La colazione ideale per la stabilità glicemica: avena integrale cotta a fiamma dolce con bevanda di soia, mirtilli freschi e croccantezza di semi.',
    prepTime: '5 min',
    cookTime: '7 min',
    difficulty: 'Facile',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=800&q=80',
    videoDuration: '06:45',
    isPremium: false,
    dietaryTags: ['Vegano', 'Senza Zuccheri Aggiunti', 'Ricco di Fibre'],
    nutritionalNotes: 'I beta-glucani dell’avena rallentano l’assorbimento degli zuccheri e nutrono il microbiota intestinale, garantendo energia costante per 4 ore.',
    ingredients: [
      { name: 'Fiocchi d’avena integrali piccoli', amount: '50 g' },
      { name: 'Bevanda vegetale di soia o mandorla senza zuccheri', amount: '180 ml' },
      { name: 'Acqua naturale', amount: '60 ml' },
      { name: 'Semi di chia', amount: '1 cucchiaino (5 g)' },
      { name: 'Mirtilli freschi o frutti di bosco', amount: '70 g' },
      { name: 'Cannella in polvere di Ceylon', amount: '1 pizzico' },
      { name: 'Crema di mandorle pelate 100%', amount: '1 cucchiaio raso (12 g)' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'In un pentolino antiaderente versa i fiocchi d’avena, la bevanda vegetale, l’acqua e un pizzico di cannella.',
        tip: 'Usare fiocchi piccoli garantisce una cremosità vellutata senza dover frullare.'
      },
      {
        stepNumber: 2,
        instruction: 'Cuoci a fuoco medio-basso mescolando continuamente con una spatola di silicone per 5-7 minuti finché il liquido non viene assorbito e il composto diventa morbido.',
        tip: 'Non lasciare asciugare troppo: raffreddandosi nella ciotola tenderà ad addensarsi ulteriormente.'
      },
      {
        stepNumber: 3,
        instruction: 'Versa il porridge caldo in una bowl, unisci i semi di chia e lascia riposare un minuto.',
        tip: 'I semi di chia assorbono l’umidità residua creando un leggero gel benefico per la mucosa gastrica.'
      },
      {
        stepNumber: 4,
        instruction: 'Guarnisci con i mirtilli freschi e completa con la crema di mandorle a filo in superficie.',
        tip: 'La quota di grassi buoni della mandorla riduce ulteriormente l’impatto glicemico del pasto.'
      }
    ]
  },
  {
    id: 'recipe-quinoa-salmone-avocado',
    slug: 'bowl-quinoa-salmone-avocado-lime',
    title: 'Bowl di Quinoa, Salmone Scottato & Avocado al Profumo di Lime',
    category: 'pranzo',
    categoryLabel: 'Pranzo Completo',
    shortDescription: 'Un piatto unico equilibrato secondo il modello del piatto del benessere: carboidrati complessi senza glutine, omega-3 nobili e verdure croccanti.',
    prepTime: '10 min',
    cookTime: '15 min',
    difficulty: 'Facile',
    thumbnailUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    videoDuration: '08:20',
    isPremium: false,
    dietaryTags: ['Senza Glutine', 'Ricco di Omega-3', 'Piatto Unico'],
    nutritionalNotes: 'La quinoa fornisce tutti gli aminoacidi essenziali; il salmone selvaggio apporta EPA e DHA fondamentali per il benessere cardiovascolare e cerebrale.',
    ingredients: [
      { name: 'Quinoa tricolore o bianca (pesata a crudo)', amount: '60 g' },
      { name: 'Filetto di salmone fresco (o cotto al vapore)', amount: '120 g' },
      { name: 'Avocado maturo hass', amount: '1/2 (circa 60 g)' },
      { name: 'Cetriolo con buccia', amount: '1/2 tagliato a cubetti' },
      { name: 'Rucola fresca o spinacini', amount: '40 g' },
      { name: 'Succo di lime fresco', amount: '1/2 lime' },
      { name: 'Olio extravergine d’oliva spremuto a freddo', amount: '1 cucchiaio (10 ml)' },
      { name: 'Semi di sesamo tostato', amount: '1 cucchiaino' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Sciacqua accuratamente la quinoa sotto acqua corrente fredda per eliminare la saponina amara esterna.',
        tip: 'Usa un colino a maglie fitte e sciacqua per almeno 30 secondi.'
      },
      {
        stepNumber: 2,
        instruction: 'Cuoci la quinoa in un volume doppio di acqua bollente leggermente salata per circa 12-14 minuti, finché il germe bianco non si apre. Scola e lascia intiepidire.',
        tip: 'Puoi cuocere più quinoa in anticipo: in frigo si conserva perfettamente per 3 giorni.'
      },
      {
        stepNumber: 3,
        instruction: 'Scalda una padella antiaderente e scotta il filetto di salmone 2-3 minuti per lato, mantenendo il cuore morbido e rosato.',
        tip: 'Aggiungi una spruzzata di succo di lime in padella sul finale per esaltare gli aromi.'
      },
      {
        stepNumber: 4,
        instruction: 'Componi la bowl disponendo il letto di rucola, la quinoa, il salmone a tocchetti, il cetriolo e l’avocado a fette. Condisci con olio EVO e sesamo tostato.'
      }
    ]
  },
  {
    id: 'recipe-energy-balls-cacao',
    slug: 'energy-balls-cacao-crudo-datteri',
    title: 'Energy Balls al Cacao Crudo, Datteri Medjool & Mandorle',
    category: 'snack',
    categoryLabel: 'Spuntino Sano',
    shortDescription: 'Piccole praline energetiche senza cottura, ideali per lo spuntino pre-workout o per soddisfare la voglia di dolce in modo funzionale.',
    prepTime: '10 min',
    cookTime: '0 min',
    difficulty: 'Facile',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    videoDuration: '05:15',
    isPremium: false,
    dietaryTags: ['Raw / Senza Cottura', 'Vegano', 'Senza Zuccheri Aggiunti'],
    nutritionalNotes: 'I polifenoli del cacao crudo migliorano l’umore e stimolano l’attenzione; il magnesio delle mandorle riduce la stanchezza mentale.',
    ingredients: [
      { name: 'Datteri Medjool denocciolati morbidi', amount: '6 pezzi (circa 100 g)' },
      { name: 'Mandorle sgusciate non tostate', amount: '60 g' },
      { name: 'Cacao amaro crudo in polvere', amount: '2 cucchiai colmi (20 g)' },
      { name: 'Farina o scaglie di cocco per la copertura', amount: '15 g' },
      { name: 'Acqua tiepida (se necessario)', amount: '1 cucchiaino' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Inserisci le mandorle nel mixer e tritale grossolanamente per qualche secondo.',
        tip: 'Non frullare troppo a lungo altrimenti le mandorle rilasciano l’olio prima del tempo.'
      },
      {
        stepNumber: 2,
        instruction: 'Aggiungi i datteri spezzettati e il cacao crudo. Frulla a impulsi finché l’impasto non diventa compatto ed appiccicoso.',
        tip: 'Se i datteri sono un po’ asciutti, lasciali in ammollo in acqua calda 5 minuti prima di usarli.'
      },
      {
        stepNumber: 3,
        instruction: 'Con le mani leggermente inumidite preleva porzioni di impasto grandi quanto una noce e forma delle palline lisce.',
        tip: 'L’impasto si compatta con il calore delle mani.'
      },
      {
        stepNumber: 4,
        instruction: 'Rotola ciascuna energy ball nella farina di cocco e riponi in frigorifero per almeno 30 minuti prima di gustare. Si conservano 10 giorni in barattolo chiuso.'
      }
    ]
  },
  {
    id: 'recipe-vellutata-zucca-zenzero',
    slug: 'vellutata-zucca-delica-zenzero',
    title: 'Vellutata di Zucca Delica, Zenzero & Crostini Integrali al Timo',
    category: 'cena',
    categoryLabel: 'Cena Antinfiammatoria',
    shortDescription: 'Una cena calda e distensiva per la sera: zucca arrostita con zenzero fresco e timo, abbinata a crostini integrali a lievitazione naturale.',
    prepTime: '10 min',
    cookTime: '20 min',
    difficulty: 'Facile',
    thumbnailUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80',
    videoDuration: '07:30',
    isPremium: false,
    dietaryTags: ['Leggero per la Notte', 'Ricco di Beta-Carotene', 'Digestivo'],
    nutritionalNotes: 'La zucca è povera di calorie ma ricca di triptofano, precursore della melatonina che favorisce un sonno profondo e ristoratore.',
    ingredients: [
      { name: 'Zucca Delica sbucciata a cubotti', amount: '400 g' },
      { name: 'Radice di zenzero fresco grattugiata', amount: '1 cucchiaino' },
      { name: 'Scalogno dolce', amount: '1 piccolo' },
      { name: 'Brodo vegetale leggero fatto in casa', amount: '350 ml' },
      { name: 'Pane integrale di segale o farro a cubetti', amount: '40 g' },
      { name: 'Olio EVO e timo essiccato', amount: '1 cucchiaio' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Fai dorare lo scalogno tritato in una casseruola con un cucchiaino di olio e lo zenzero fresco grattugiato.',
        tip: 'Non far bruciare lo scalogno per mantenere la dolcezza naturale della base.'
      },
      {
        stepNumber: 2,
        instruction: 'Unisci la zucca a cubetti, fai insaporire 2 minuti e copri a filo con il brodo vegetale caldo.',
        tip: 'Usare poco brodo permette di regolare la densità perfetta della vellutata.'
      },
      {
        stepNumber: 3,
        instruction: 'Copri con coperchio e cuoci per 15-18 minuti, finché la zucca non diventa tenerissima. Frulla con frullatore a immersione fino a consistenza di seta.'
      },
      {
        stepNumber: 4,
        instruction: 'Tosta i cubetti di pane in padella con timo e un filo d’olio, quindi servili sulla vellutata calda fumante.'
      }
    ]
  }
];

/**
 * CONTENUTI ESCLUSIVI PER L'ABBONAMENTO PREMIUM
 * Accessibili solo per chi possiede l'abbonamento attivo.
 */
export const PREMIUM_EXCLUSIVE_ITEMS = [
  {
    id: 'prem-masterclass-metabolismo',
    title: 'Masterclass: Flessibilità Metabolica & Stabilità dell’Insulina',
    category: 'Video Lezione Esclusiva',
    duration: '45 minuti di video lezione in 4K',
    description: 'Come allenare il corpo ad alternare efficientemente l’uso di carboidrati e grassi come combustibile biologico senza blocchi metabolici.',
    badge: 'Esclusivo Premium',
    hasPdfHandout: true,
    handoutName: 'Protocollo_Flessibilita_Metabolica_Andreina_Boutique.pdf'
  },
  {
    id: 'prem-guida-microbiota',
    title: 'Guida Operativa: Il Protocollo del Microbiota e Permeabilità Intestinale',
    category: 'Ebook Riservato ai Membri',
    duration: 'PDF di 64 pagine con schede operative',
    description: 'Approfondimento scientifico sugli alimenti fermentati, prebiotici resistenti e gestione del gonfiore da disbiosi.',
    badge: 'Esclusivo Premium',
    hasPdfHandout: true,
    handoutName: 'Guida_Microbiota_Intestinale_Membri.pdf'
  },
  {
    id: 'prem-recipe-batch-cooking',
    title: 'Video Pratica: La Sessione di Meal Prep da 90 Minuti per 5 Pranzi',
    category: 'Video Ricetta Esclusiva',
    duration: '32 minuti step-by-step',
    description: 'La Dottoressa cucina in diretta preparando 5 pranzi completi e 2 colazioni, illustrando la gestione simultanea di forno e fornelli.',
    badge: 'Esclusivo Premium',
    hasPdfHandout: true,
    handoutName: 'Lista_Spesa_MealPrep_90Minuti.pdf'
  }
];

/**
 * VIDEO CORSI DISPONIBILI NELLA BOUTIQUE
 */
export const VIDEO_COURSES: VideoCourse[] = [
  {
    id: 'course-meal-prep-mastery',
    slug: 'meal-prep-batch-cooking-mastery',
    title: 'Meal Prep & Batch Cooking: Cucinare in Anticipo per Tutta la Settimana',
    subtitle: 'Il corso completo per rivoluzionare l’organizzazione della tua cucina senza stress',
    price: 39.00,
    formattedPrice: '€ 39,00',
    isIncludedInPremium: true,
    coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    totalDuration: '2 ore e 40 minuti',
    modulesCount: 5,
    level: 'Principiante / Intermedio',
    handoutAvailable: true,
    description: 'Un percorso video pratico passo dopo passo per imparare ad acquistare ingredienti versatili e cucinare basi sane in sole due ore nel weekend.',
    modules: [
      {
        id: 'mod-1',
        title: 'Modulo 1: Pianificazione del Menu & Lista Intelligente',
        duration: '25 min',
        lessons: [
          { id: 'les-1-1', title: 'La matrice dei pasti settimanali', duration: '12 min', previewAvailable: true },
          { id: 'les-1-2', title: 'Come fare la spesa in 30 minuti senza sprechi', duration: '13 min' }
        ]
      },
      {
        id: 'mod-2',
        title: 'Modulo 2: Le Cotture Multiple Simultanee',
        duration: '38 min',
        lessons: [
          { id: 'les-2-1', title: 'La teglia divisa in 3 al forno', duration: '18 min' },
          { id: 'les-2-2', title: 'Cereali in chicco a doppia porzione', duration: '20 min' }
        ]
      },
      {
        id: 'mod-3',
        title: 'Modulo 3: I Condimenti e le Salse Magiche',
        duration: '32 min',
        lessons: [
          { id: 'les-3-1', title: 'Dressing emulsionati a lunga durata', duration: '16 min' },
          { id: 'les-3-2', title: 'Pesto di verdure stagionali senza formaggio', duration: '16 min' }
        ]
      },
      {
        id: 'mod-4',
        title: 'Modulo 4: Conservazione Sicura in Frigo e Freezer',
        duration: '28 min',
        lessons: [
          { id: 'les-4-1', title: 'Vetro sottovuoto e abbattimento casalingo', duration: '14 min' },
          { id: 'les-4-2', title: 'Cosa si può congelare e cosa no', duration: '14 min' }
        ]
      },
      {
        id: 'mod-5',
        title: 'Modulo 5: Assemblaggio Rapido dei Piatti in 3 Minuti',
        duration: '37 min',
        lessons: [
          { id: 'les-5-1', title: 'Rigenerazione termica perfetta', duration: '18 min' },
          { id: 'les-5-2', title: 'Varianti last minute con ingredienti freschi', duration: '19 min' }
        ]
      }
    ]
  },
  {
    id: 'course-mindful-eating',
    slug: 'nutrizione-consapevole-mindful-eating',
    title: 'Nutrizione Consapevole & Mindful Eating nella Vita Quotidiana',
    subtitle: 'Riconoscere la fame emotiva, rallentare e riscoprire il piacere fisiologico del cibo',
    price: 29.00,
    formattedPrice: '€ 29,00',
    isIncludedInPremium: true,
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    totalDuration: '1 ora e 50 minuti',
    modulesCount: 4,
    level: 'Tutti i livelli',
    handoutAvailable: true,
    description: 'Impara a disinnescare gli automatismi dello stress eating, ascoltare i segnali di sazietà e coltivare un rapporto sereno con qualsiasi alimento.',
    modules: [
      {
        id: 'me-mod-1',
        title: 'Modulo 1: Fame Biologica vs Fame Emotiva',
        duration: '22 min',
        lessons: [
          { id: 'me-1-1', title: 'La scala della fame da 1 a 10', duration: '10 min', previewAvailable: true },
          { id: 'me-1-2', title: 'I trigger emotivi dello stress serale', duration: '12 min' }
        ]
      },
      {
        id: 'me-mod-2',
        title: 'Modulo 2: La Masticazione e i Segnali della Leptina',
        duration: '30 min',
        lessons: [
          { id: 'me-2-1', title: 'Fisiologia dell’asse stomaco-cervello', duration: '15 min' },
          { id: 'me-2-2', title: 'Esercizio pratico di masticazione sensoriale', duration: '15 min' }
        ]
      },
      {
        id: 'me-mod-3',
        title: 'Modulo 3: Mangiare Senza Schermi e Distrazioni',
        duration: '26 min',
        lessons: [
          { id: 'me-3-1', title: 'L’impatto delle notifiche durante il pasto', duration: '12 min' },
          { id: 'me-3-2', title: 'Creare un rituale sereno alla tavola', duration: '14 min' }
        ]
      },
      {
        id: 'me-mod-4',
        title: 'Modulo 4: Uscire dalla Mentalità della Dieta Restrittiva',
        duration: '32 min',
        lessons: [
          { id: 'me-4-1', title: 'Perché la privazione genera abbuffate', duration: '16 min' },
          { id: 'me-4-2', title: 'Permesso incondizionato e libertà nutrizionale', duration: '16 min' }
        ]
      }
    ]
  }
];

/**
 * PROFILO UTENTE DEMO PRECONFIGURATO
 */
export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Chiara Rossi',
  email: 'chiara.rossi@esempio.it',
  isLoggedIn: true,
  registeredDate: 'Gennaio 2026',
  hasActiveSubscription: true,
  subscriptionPlan: 'monthly',
  subscriptionRenewalDate: '28 Novembre 2026',
  purchasedProductIds: ['ebook-menu-salvatempo', 'ebook-migliora-la-tua-colazione'],
  savedRecipeIds: ['recipe-porridge-avena', 'recipe-quinoa-salmone-avocado'],
  orders: [
    {
      id: 'ord-102',
      orderNumber: 'AB-2026-881',
      date: '14 Ottobre 2026',
      items: [
        { title: 'I menu salvatempo della tua nutrizionista', price: 17.10, format: 'Ebook PDF' },
        { title: 'Migliora la tua colazione', price: 12.90, format: 'Ebook PDF' }
      ],
      total: 30.00,
      status: 'Completato',
      invoicePdfName: 'Ricevuta_Fiscale_AB-2026-881.pdf'
    }
  ]
};
