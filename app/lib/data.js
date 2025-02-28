import { sql } from "@vercel/postgres";

export async function getPosts() {
    return (await sql
        `
        SELECT 
            sa_posts.post_id, 
            content, 
            url, 
            sa_posts.created_at,
            sa_posts.user_id, 
            username, 
            picture,
            count(sa_likes.user_id) as num_likes 
        FROM 
            sa_posts 
            JOIN sa_users USING(user_id) 
            LEFT JOIN sa_likes USING(post_id)
        GROUP BY 
            sa_posts.post_id, 
            content, 
            url, 
            sa_posts.created_at,
            sa_posts.user_id, 
            username,
            picture
        `).rows;
}

export async function getLikes(user_id) {
    return (await sql`SELECT post_id FROM sa_likes WHERE user_id = ${user_id}`).rows;
}

export async function getPost(post_id){
    return (await sql
        `
        SELECT
            sa_posts.post_id, 
            content, 
            url,
            sa_posts.created_at, 
            sa_posts.user_id, 
            username, 
            picture,
            count(sa_likes.user_id) as num_likes 
        FROM 
            sa_posts 
            JOIN sa_users USING(user_id) 
            LEFT JOIN sa_likes USING(post_id)
            WHERE post_id=${post_id}
        GROUP BY 
            sa_posts.post_id, 
            content, 
            url, 
            sa_posts.created_at,
            sa_posts.user_id, 
            username,
            picture
        `).rows;
}

export async function getLike(user_id, post_id){
    return (await sql`
        SELECT post_id FROM sa_likes WHERE user_id = ${user_id} AND post_id=${post_id}
    `).rows;
}
export async function getComments(post_id) {
    const comments = await sql`
        SELECT c.*, u.username 
        FROM sa_comments c
        JOIN sa_users u ON c.user_id = u.user_id
        WHERE c.post_id = ${post_id}
        ORDER BY c.created_at ASC
    `;

    const commentMap = new Map();
    
    // Crear un mapa de comentarios por ID
    comments.rows.forEach((comment) => {
        comment.replies = []; // Inicializar respuestas
        commentMap.set(comment.comment_id, comment);
    });

    // Construir estructura jerárquica
    const rootComments = [];

    comments.rows.forEach((comment) => {
        if (comment.parent_comment_id) {
            const parent = commentMap.get(comment.parent_comment_id);
            if (parent) {
                parent.replies.push(comment);
            }
        } else {
            rootComments.push(comment);
        }
    });

    return rootComments;
}

export async function getProfile(user_id) {
    return (await sql`
        SELECT user_id, username, name, picture, email 
        FROM sa_users 
        WHERE user_id = ${user_id}
    `).rows[0];
}
