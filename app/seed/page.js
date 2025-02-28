import { sql } from "@vercel/postgres";

export default async () => {

    await sql `DROP TABLE IF EXISTS sa_users, sa_posts, sa_likes, sa_comments;`


    await sql `CREATE TABLE IF NOT EXISTS sa_users(
        user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username TEXT,
        name TEXT,
        picture TEXT,
        email TEXT UNIQUE
    )`;

    await sql `CREATE TABLE IF NOT EXISTS sa_posts(
        post_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        content TEXT,
        url TEXT,
        user_id UUID REFERENCES sa_users(user_id),
        created_at TIMESTAMP DEFAULT NOW()
    )`;
    
    await sql `CREATE TABLE IF NOT EXISTS sa_likes(
        user_id UUID REFERENCES sa_users(user_id),
        post_id UUID REFERENCES sa_posts(post_id),
        PRIMARY KEY(user_id, post_id)
    )`;

    await sql `CREATE TABLE IF NOT EXISTS sa_comments (
        comment_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        post_id UUID REFERENCES sa_posts(post_id) ON DELETE CASCADE,
        user_id UUID REFERENCES sa_users(user_id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        parent_comment_id UUID NULL REFERENCES sa_comments(comment_id) ON DELETE CASCADE
    )`;
    
    
    return <p>Database seed de guay</p>
}

