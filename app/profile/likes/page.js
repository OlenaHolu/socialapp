import Post from "@/app/ui/post";
import { auth0 } from "../../lib/auth0";
import { getlikedPosts } from "@/app/lib/data";


export default async function LikesPage() {
    const user_id = (await auth0.getSession()).user.user_id;
    const likedPosts = await getlikedPosts(user_id);

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

}
