import { createClient } from '@supabase/supabase-js';
import { atom } from 'nanostores';

// Create a single supabase client for interacting with your database
export class SupaBaseConection {
   videoSelected:any = atom('./videos/iglesia5.mp4');
  supabaseUrl: string = 'https://cbl-supabase.virtalus.cbluna-dev.com/';
  anonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzE1MjM4MDAwLAogICJleHAiOiAxODczMDA0NDAwCn0.qKqYn2vjtHqKqyt1FAghuIjvNsyr9b1ElpVfvJg6zJ4';
  redirectUrl: string = this.supabaseUrl + '/change-pass/change-password/token';
  apiGatewayUrl: string = 'https://cbl.virtalus.cbluna-dev.com/uapi/';
  supabase: any = createClient(this.supabaseUrl, this.anonKey);


  static supabasetest() {
    throw new Error('Method not implemented.');
  }

  getVideoCategories = async () => {
  
    const { data, error } = await this.supabase.from('genre_ad').select();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
    return data;
  }
  //crea una funcion que recibe un id de categoria y devuelve los videos de esa categoria de la tabla "ad"
  
  getVideosByCategory = async (id: number) => {
    const { data, error } = await this.supabase.from('ad').select().eq('genre_id', id);
    if (error) {
      console.log(error);
    } else {
  /*     console.log(data); */
    }
    return data;
  }
  
}
