import { auth0 } from "../lib/auth0";
import { getLikes, getPosts, getProfile } from "../lib/data"
import Post from "./post"

export default async function HomePage() {

    const user_id = (await auth0.getSession()).user.user_id;
    const user = await getProfile(user_id);

    // lanzar las dos consultas a la vez
    const [posts, likes] = await Promise.all([
        getPosts(),
        getLikes(user_id)
    ]);



    return (
        <div className="flex flex-col items-center gap-16 w-full">
            {
                posts.map(post => (
                    <div key={post.post_id} className="w-full max-w-[600px]">
                        <Post
                            user_id={user_id}
                            isLikedInitial={likes.find(like => like.post_id === post.post_id)}
                            post_id={post.post_id}
                            content={post.content}
                            url={post.url}
                            username={post.username}
                            num_likes={post.num_likes}
                            createdAt={post.created_at}
                            picture={user.picture}
                        />
                    </div>
                ))
            }
        </div>
    );
}