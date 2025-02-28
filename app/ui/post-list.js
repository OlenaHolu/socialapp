import { auth0 } from "../lib/auth0";
import { getLikes, getPosts, getProfile } from "../lib/data"
import Post from "./post"

export default async () => {

    try {
        const session = await auth0.getSession();
        if (!session || !session.user) {
            throw new Error("User not authenticated");
        }

        const user_id = session.user.user_id;
        const user = await getProfile(user_id);

        // TODO: lanzar las dos consultas a la vez
   


    // TODO: lanzar las dos consultas a la vez
    const posts = await getPosts();
    const likes = await getLikes(user_id);


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
} catch (error) {
    console.error("Error fetching user session:", error.message);
    // Handle the error, e.g., redirect to login page or show an error message
}
}