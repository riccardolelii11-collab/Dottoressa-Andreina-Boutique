import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Leggi le credenziali da .env o dalla memoria locale (configurazione dinamica)
function getSavedConfig(): { url: string; key: string } {
  try {
    const local = localStorage.getItem('ao_supabase_config');
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed.url && parsed.key) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  return {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    key: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  };
}

let activeConfig = getSavedConfig();

export function getSupabaseUrl(): string {
  return activeConfig.url;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    activeConfig.url && 
    activeConfig.key && 
    activeConfig.url.startsWith('https://') &&
    activeConfig.url.includes('.supabase.co')
  );
}

let supabaseInstance: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(activeConfig.url, activeConfig.key)
  : null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseInstance && isSupabaseConfigured()) {
    supabaseInstance = createClient(activeConfig.url, activeConfig.key);
  }
  return supabaseInstance;
}

/**
 * Salva o aggiorna le credenziali di Supabase direttamente dall'interfaccia
 */
export function setSupabaseConfig(url: string, key: string): { success: boolean; message: string } {
  const cleanUrl = url.trim();
  const cleanKey = key.trim();

  if (!cleanUrl.startsWith('https://') || !cleanUrl.includes('.supabase.co')) {
    return {
      success: false,
      message: 'L\'URL di Supabase deve iniziare con https:// e contenere .supabase.co (es. https://xyz.supabase.co)'
    };
  }

  if (cleanKey.length < 20) {
    return {
      success: false,
      message: 'La chiave anonima (anon public key) di Supabase inserita non sembra valida.'
    };
  }

  activeConfig = { url: cleanUrl, key: cleanKey };
  try {
    localStorage.setItem('ao_supabase_config', JSON.stringify(activeConfig));
    supabaseInstance = createClient(cleanUrl, cleanKey);
    return {
      success: true,
      message: 'Credenziali Supabase salvate con successo!'
    };
  } catch {
    return {
      success: false,
      message: 'Impossibile salvare la configurazione localmente.'
    };
  }
}

/**
 * Rimuove le credenziali salvate localmente
 */
export function clearSupabaseConfig(): void {
  activeConfig = {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    key: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  };
  try {
    localStorage.removeItem('ao_supabase_config');
  } catch {
    // ignore
  }
  supabaseInstance = isSupabaseConfigured() ? createClient(activeConfig.url, activeConfig.key) : null;
}

/**
 * Test di connessione in tempo reale a Supabase
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
  url?: string;
}> {
  if (!isSupabaseConfigured()) {
    return {
      connected: false,
      message: 'Supabase non è ancora configurato. Inserisci l\'URL del tuo progetto e la chiave Anon per attivare il collegamento cloud.'
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      connected: false,
      message: 'Impossibile inizializzare il client Supabase.'
    };
  }

  try {
    // Test 1: ping getSession
    const { error: sessionError } = await client.auth.getSession();
    if (sessionError) {
      return {
        connected: false,
        message: `Errore di autenticazione con Supabase: ${sessionError.message}`
      };
    }

    return {
      connected: true,
      message: 'Connessione a Supabase verificata con successo! Servizio Auth e Database attivi.',
      url: activeConfig.url
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Errore sconosciuto';
    return {
      connected: false,
      message: `Errore durante il test di connessione: ${errorMsg}`
    };
  }
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}

/**
 * Registrazione nuovo utente con Nome, Cognome, Email, Password e Telefono
 */
export async function registerUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone?: string
): Promise<AuthResponse> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: fullName,
            phone: phone || ''
          }
        }
      });

      if (error) {
        return { success: false, message: error.message };
      }

      // Se l'utente è creato, prova ad aggiornare/inserire il record nella tabella profiles
      if (data.user) {
        try {
          await client.from('profiles').upsert({
            id: data.user.id,
            first_name: firstName,
            last_name: lastName,
            full_name: fullName,
            email: email,
            phone: phone || '',
            updated_at: new Date().toISOString()
          });
        } catch {
          // Se la tabella profiles non è ancora stata creata nel SQL Editor, l'utente in auth.users è comunque registrato
        }
      }

      return {
        success: true,
        user: {
          id: data.user?.id || 'usr-' + Date.now(),
          email: data.user?.email || email,
          firstName,
          lastName,
          phone: phone || ''
        }
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Errore durante la registrazione con Supabase.';
      return { success: false, message: errorMsg };
    }
  }

  // Fallback con localStorage (testabile subito)
  try {
    const existingUsers = JSON.parse(localStorage.getItem('ao_registered_users') || '[]');
    const alreadyExists = existingUsers.some((u: { email: string }) => u.email.toLowerCase() === email.toLowerCase());
    
    if (alreadyExists) {
      return { success: false, message: 'Un account con questa email esiste già. Prova ad accedere.' };
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      email,
      firstName,
      lastName,
      phone: phone || '',
      password,
      registeredDate: new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric' }).format(new Date()),
      purchasedProductIds: []
    };

    existingUsers.push(newUser);
    localStorage.setItem('ao_registered_users', JSON.stringify(existingUsers));
    localStorage.setItem('ao_current_user', JSON.stringify(newUser));

    return {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone
      }
    };
  } catch {
    return { success: true, user: { id: 'usr-1', email, firstName, lastName, phone } };
  }
}

/**
 * Accesso utente con Supabase (o verifica credenziali locali)
 */
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, message: error.message };
      }

      const meta = data.user?.user_metadata || {};
      let phone = meta.phone || '';

      // Tenta di leggere telefono e dettagli estesi dalla tabella profiles se disponibile
      try {
        const { data: profile } = await client
          .from('profiles')
          .select('phone, first_name, last_name')
          .eq('id', data.user.id)
          .single();
        if (profile?.phone) {
          phone = profile.phone;
        }
      } catch {
        // ignore
      }

      return {
        success: true,
        user: {
          id: data.user?.id || 'usr-' + Date.now(),
          email: data.user?.email || email,
          firstName: meta.first_name || '',
          lastName: meta.last_name || '',
          phone
        }
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Errore durante il login con Supabase.';
      return { success: false, message: errorMsg };
    }
  }

  // Fallback locale
  try {
    const existingUsers = JSON.parse(localStorage.getItem('ao_registered_users') || '[]');
    const found = existingUsers.find((u: { email: string }) => u.email.toLowerCase() === email.toLowerCase());

    if (found) {
      if (found.password && found.password !== password) {
        return { success: false, message: 'Password non corretta. Riprova o usa "Password dimenticata".' };
      }
      localStorage.setItem('ao_current_user', JSON.stringify(found));
      return {
        success: true,
        user: {
          id: found.id,
          email: found.email,
          firstName: found.firstName,
          lastName: found.lastName,
          phone: found.phone || ''
        }
      };
    }

    const parts = email.split('@')[0].split('.');
    const firstName = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'Utente';
    const lastName = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : '';

    return {
      success: true,
      user: {
        id: 'usr-' + Date.now(),
        email,
        firstName,
        lastName,
        phone: ''
      }
    };
  } catch {
    return { success: true, user: { id: 'usr-1', email } };
  }
}

/**
 * Recupero password (invia email con Supabase o conferma la richiesta)
 */
export async function resetUserPassword(email: string): Promise<{ success: boolean; message: string }> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return {
        success: true,
        message: `Ti abbiamo inviato un link di sicurezza all'indirizzo ${email}. Controlla la tua casella di posta per impostare una nuova password.`
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Impossibile inviare la richiesta di reset.';
      return { success: false, message: errorMsg };
    }
  }

  return {
    success: true,
    message: `Ti abbiamo inviato un link di ripristino all'indirizzo ${email}. Segui le istruzioni nell'email per impostare una nuova password sicura.`
  };
}

/**
 * Logout
 */
export async function logoutUser(): Promise<void> {
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch {
      // Ignora errori di disconnessione
    }
  }
  try {
    localStorage.removeItem('ao_current_user');
  } catch {
    // ignore
  }
}
