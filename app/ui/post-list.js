import { auth0 } from "../lib/auth0";
import { getLikes, getPosts } from "../lib/data"
import Post from "./post"

export default async () => {

    const user_id = (await auth0.getSession()).user.user_id;

    // TODO: lanzar las dos consultas a la vez
    const posts = await getPosts();
    const likes = await getLikes(user_id);


    return (
        <div className="flex flex-col grow items-center gap-16">
            { 
                posts.map(post => (<Post 
                    key={post.post_id} 
                    user_id={user_id} 
                    isLikedInitial={likes.find(like => like.post_id === post.post_id)}
                    post_id={post.post_id} 
                    content={post.content} 
                    url={post.url} 
                    username={post.username}
                    num_likes={post.num_likes}
                />))
            }
        </div>
    )
}