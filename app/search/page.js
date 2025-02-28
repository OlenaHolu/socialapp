"use server";
import { auth0 } from "../lib/auth0";
import { sql } from "@vercel/postgres";
import { getLikes } from "../lib/data";
import Post from "../ui/post";


export default async function SearchPage({ searchParams }) {
    const user_id = (await auth0.getSession()).user.user_id;

    const query = searchParams?.query || "";

    let posts;
    if (query) {
        posts = await sql`
                SELECT p.post_id, p.content, p.url, p.created_at, u.username, u.picture,
                    (SELECT COUNT(*) FROM sa_likes WHERE sa_likes.post_id = p.post_id) AS num_likes
                FROM sa_posts p
                JOIN sa_users u ON p.user_id = u.user_id
                WHERE p.content ILIKE ${"%" + query + "%"} OR u.username ILIKE ${"%" + query + "%"}
                ORDER BY p.created_at DESC
            `;
    } else {
        posts = await sql`
                SELECT p.post_id, p.content, p.url, p.created_at, u.username, u.picture,
                    (SELECT COUNT(*) FROM sa_likes WHERE sa_likes.post_id = p.post_id) AS num_likes
                FROM sa_posts p
                JOIN sa_users u ON p.user_id = u.user_id
                ORDER BY p.created_at DESC
            `;
    }

    const likes = await getLikes(user_id);

    return (
        <div className="flex flex-col items-center gap-16 w-full">
            {/* Formulario de búsqueda */}
            <form action="/search" method="GET" className="mb-6">
                <input
                    type="text"
                    name="query"
                    placeholder="Buscar posts..."
                    defaultValue={query}
                    className="border rounded p-2 w-[300px]"
                />
                <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Buscar
                </button>
            </form>

            {posts.rows.length > 0 ? (
                posts.rows.map((post) => (
                    <div key={post.post_id} className="w-full max-w-[600px]">
                        <Post
                            user_id={user_id}
                            isLikedInitial={likes.find((like) => like.post_id === post.post_id)}
                            post_id={post.post_id}
                            content={post.content}
                            url={post.url}
                            username={post.username}
                            num_likes={post.num_likes}
                            createdAt={post.created_at}
                            picture={post.picture}
                        />
                    </div>
                ))
            ) : (
                <p>No se encontraron posts para "{query}"</p>
            )}
        </div>
    );
}
