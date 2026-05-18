-- Supabase Schema for Shoenitarian
-- Run this in the Supabase SQL Editor

-- 1. Create a table for orders
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  shoe_type TEXT NOT NULL,
  service_type TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Cleaning', 'Drying', 'Ready', 'Completed')),
  total_price NUMERIC(12, 2) NOT NULL,
  payment_proof_url TEXT,
  payment_status TEXT DEFAULT 'Unpaid' CHECK (payment_status IN ('Paid', 'Unpaid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Set Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow authenticated users (admins) to do anything
CREATE POLICY "Admins can do everything" ON orders
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Policy: Allow public to read orders (for tracking)
CREATE POLICY "Public can read orders" ON orders
  FOR SELECT
  TO anon
  USING (true);
  
-- 5. Policy: Allow public to insert orders (for booking)
CREATE POLICY "Public can insert orders" ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);
