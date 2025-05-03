// src/types/supabase.ts
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: number;
          slug: string;
          company_name: string;
          logo_url: string;
          description: string;
          about_us: string;
          contact_info: string;
          footer_links: { name: string; url: string }[];
          footer_icons: { name: string; url: string }[];
          sample_images: string[];
          footer_text: string;
        };
        Insert: Partial<Database['public']['Tables']['companies']['Row']>;
        Update: Partial<Database['public']['Tables']['companies']['Row']>;
      };
    };
    Views: {};
    Functions: {};
  };
}
