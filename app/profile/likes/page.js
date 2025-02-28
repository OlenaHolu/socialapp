import Post from "@/app/ui/post";
import { auth0 } from "../../lib/auth0";
import { sql } from "@vercel/postgres";


export default async function LikesPage() {
    try {
        // Obtener la sesión del usuario
        const session = await auth0.getSession();
        if (!session || !session.user) {
            throw new Error("User not authenticated");
        }

        const user_id = session.user.user_id;

        // Obtener los posts que el usuario ha dado "Me gusta"
        const likedPosts = await sql`
            SELECT p.post_id, p.content, p.url, p.created_at, u.username, u.picture,
                (SELECT COUNT(*) FROM sa_likes WHERE sa_likes.post_id = p.post_id) AS num_likes
            FROM sa_likes l
            JOIN sa_posts p ON l.post_id = p.post_id
            JOIN sa_users u ON p.user_id = u.user_id
            WHERE l.user_id = ${user_id}
            ORDER BY p.created_at DESC
        `;

        return (
            <div className="flex flex-col items-center gap-16 w-full">
                <h1 className="text-2xl font-bold text-center">Posts que te han gustado ❤️</h1>

                {/* Lista de posts que le han gustado al usuario */}
                {likedPosts.rows.length > 0 ? (
                    likedPosts.rows.map((post) => (
                        <div key={post.post_id} className="w-full max-w-[600px]">
                            <Post
                                user_id={user_id}
                                isLikedInitial={true} // Ya sabemos que el usuario le dio "Me gusta"
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
                    <p>No has dado "Me gusta" a ningún post aún.</p>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error en LikedPostsPage:", error.message);
        return <p>Error al cargar los posts que te gustaron.</p>;
    }
}
