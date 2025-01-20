// import type AnaboData from "@/model/AnaboData"
// import { createClient } from '@supabase/supabase-js'
// import { type Database } from '../../supabase';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)


// export async function getTable(tableName: keyof AnaboData) {
//     const resp = await supabase.from(tableName).select()
//     if (resp.data) return resp.data
//     else return [];
// }