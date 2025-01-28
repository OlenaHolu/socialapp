import { sql } from "@vercel/postgres";

export async function getPost() {
    return (await sql`SELECT * FROM POSTS`).rows;
}