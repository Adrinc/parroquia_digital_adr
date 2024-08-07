
import { createClient } from '@supabase/supabase-js';
import { atom } from 'nanostores';

export class VideoPlayerLogic {
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
  
    const { data, error } = await this.supabase.from('genre_ad').select().eq('visible', true);

    return data;
  }

  getVideosByCategory = async (id: number) => {
    const { data, error } =  await this.supabase.rpc('get_videos_from_category_id', {
      'categoria_id': id
    }).select();

    console.log(data);
    return data;
  }
  getAllVideosList = async () => {
  
    const { data, error } = await this.supabase.from('ad_in_gnre_view').select().eq('visible', true).order('genre_name', { ascending: true });

    return data;
  }
  
}