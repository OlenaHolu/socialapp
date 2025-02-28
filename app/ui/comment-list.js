import { addComment } from "../lib/actions";
import { getComments } from "../lib/data";
import Comment from "./comment";

export default async function CommentList({ post_id }) {
    const comments = await getComments(post_id);

    return (
        <div className="mt-4">
            <h3 className="font-bold mb-2">Comentarios</h3>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <CommentWithReplies key={comment.comment_id} comment={comment} post_id={post_id} />
                ))
            ) : (
                <p className="text-gray-500 text-sm">No hay comentarios aún.</p>
            )}

            <form action={addComment} className="mt-2">
                <input type="hidden" name="post_id" value={post_id} />
                <div className="relative flex h-8 w-full">
                        <button
                            type="submit"
                            className="!absolute right-1 top-1 z-10 select-none rounded bg-gray-600 h-6 py-1 px-3 text-center align-middle font-sans text-xs font-semibold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none"
                            data-ripple-light="true"
                        >
                            Enviar
                        </button>
                        <input
                            type="text"
                            name="content"
                            className="peer h-full w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-20 font-sans text-sm text-gray-900 outline-none transition-all placeholder-gray-400 focus:border-2 focus:border-blue-500"
                            placeholder="Añadir un comentario..."
                            required
                        />
                    </div>
            </form>
        </div>
    );
}

function CommentWithReplies({ comment, post_id }) {
    return (
        <div className="ml-0">
            <Comment 
                comment_id={comment.comment_id}
                username={comment.username} 
                content={comment.content} 
                likes={10}
                createdAt={comment.created_at}
                post_id={post_id}
            />

            {comment.replies.length > 0 && (
                <div className="ml-6 border-l-2 border-gray-300 pl-4">
                    {comment.replies.map((reply) => (
                        <CommentWithReplies key={reply.comment_id} comment={reply} post_id={post_id} />
                    ))}
                </div>
            )}
        </div>
    );
}
