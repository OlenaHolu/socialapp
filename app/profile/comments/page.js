import Post from "@/app/ui/post";
import { auth0 } from "../../lib/auth0";
import { sql } from "@vercel/postgres";


export default async function CommentsPage() {
    try {
        const session = await auth0.getSession();
        if (!session || !session.user) {
            throw new Error("User not authenticated");
        }

        const user_id = session.user.user_id;

        const commentedPosts = await sql`
            SELECT DISTINCT p.post_id, p.content, p.url, p.created_at, u.username, u.picture,
                (SELECT COUNT(*) FROM sa_likes WHERE sa_likes.post_id = p.post_id) AS num_likes
            FROM sa_comments c
            JOIN sa_posts p ON c.post_id = p.post_id
            JOIN sa_users u ON p.user_id = u.user_id
            WHERE c.user_id = ${user_id}
            ORDER BY p.created_at DESC
        `;

        return (
            <div className="flex flex-col items-center gap-16 w-full">
                <h1 className="text-2xl font-bold text-center">Posts donde has comentado 💬</h1>
                {commentedPosts.rows.length > 0 ? (
                    commentedPosts.rows.map((post) => (
                        <div key={post.post_id} className="w-full max-w-[600px]">
                            <Post
                                user_id={user_id}
                                isLikedInitial={false} 
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
                    <p>No has comentado en ningún post aún.</p>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error en CommentedPostsPage:", error.message);
        return <p>Error al cargar los posts en los que has comentado.</p>;
    }
}
