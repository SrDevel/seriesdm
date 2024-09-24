import * as dotenv from 'dotenv';

dotenv.config();

export default (config) => {
    return {
        ...config,
        slug: "seriesdm",
        name: "SeriesDm",
        scheme: "seriesdm",
        extra : {
            ...config.extra,
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseKey: process.env.SUPABASE_ANON_KEY,
        }
    }
}