import { auth0 } from "@/app/lib/auth0"
import { getLikes, getPost, getProfile } from "@/app/lib/data";
import Post from "@/app/ui/post";

export default async ({params}) => {
    const post_id = (await params).post_id;
    const user_id = (await auth0.getSession()).user.user_id;
    const user = await getProfile(user_id);

    const post = (await getPost(post_id))[0];
    const likes = await getLikes(user_id, post_id);

    return (
        <>
            <Post
                user_id = {user_id}
                post_id={post_id}
                content={post.content}
                url={post.url}
                isLikedInitial={likes.find(like => like.post_id === post.post_id)}
                username={post.username} 
                num_likes={post.num_likes}
                createdAt={post.created_at}
                picture={user.picture}
            />
        </>
    )
}