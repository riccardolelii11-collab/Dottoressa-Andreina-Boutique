-- ==============================================================================
-- BOUTIQUE DOTT.SSA ANDREINA OLIVIERI - SCHEMA DATABASE SUPABASE
-- Esegui questo script nel "SQL Editor" della tua dashboard Supabase per creare
-- automaticamente le tabelle dei profili utente, numeri di telefono e acquisti.
-- ==============================================================================

-- 1. TABELLA PROFILI UTENTE (collegata a auth.users di Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  purchased_ebooks TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. ABILITA ROW LEVEL SECURITY (RLS) PER LA MASSIMA PROTEZIONE DEI DATI
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Ciascun utente può visualizzare solo il proprio profilo
CREATE POLICY "Gli utenti possono leggere il proprio profilo"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Ciascun utente può aggiornare solo il proprio profilo (nome, cognome, telefono)
CREATE POLICY "Gli utenti possono modificare il proprio profilo"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Consenti inserimento durante la registrazione
CREATE POLICY "Gli utenti possono inserire il proprio profilo"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 3. TRIGGER AUTOMATICO: CREA IL PROFILO NON APPENA L'UTENTE SI REGISTRA
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    first_name,
    last_name,
    full_name,
    email,
    phone,
    purchased_ebooks,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    '{}',
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Elimina il trigger se già esistente per evitare conflitti e ricrealo
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. TABELLA ACQUISTI E ORDINI E-BOOK (per storico e tracciamento)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL,
  items JSONB NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'Completato' NOT NULL,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gli utenti possono vedere i propri ordini"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Gli utenti possono inserire i propri ordini"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);
