import { sql } from "@vercel/postgres";

export default async () => {
    //await sql`DROP TABLE IF EXISTS POSTS`
    await sql `CREATE TABLE IF NOT EXISTS POSTS(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        content TEXT,
        url TEXT
    )`
    
    return <p>Database seed de guay</p>
}