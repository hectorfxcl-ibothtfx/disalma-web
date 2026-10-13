import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Leemos las credenciales
const supabaseUrl = 'https://lsqofkjozfckhsvujwdx.supabase.co';
const supabaseKey = 'sb_publishable_MnhcsbRrVqvhFWE1oUYHVQ_me4j71o2';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Probando conexion con Supabase...');
  const { data, error } = await supabase.from('products').select('count', { count: 'exact', head: true });
  if (error) {
    console.log('Error o tabla no creada aun:', error.message);
  } else {
    console.log('Conexion exitosa! Total filas:', data);
  }
}

testConnection();
