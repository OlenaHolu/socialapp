import Post from "@/app/ui/post";
import { auth0 } from "../../lib/auth0";
import { getCommentedPosts } from "@/app/lib/data";


export default async function CommentsPage() {
    const user_id = (await auth0.getSession()).user.user_id;
    const commentedPosts = await getCommentedPosts(user_id);

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
}
