import { addComment, formatTimeAgo } from "../lib/actions";


export default function Comment({
    comment_id,
    username,
    content,
    likes = 0,
    createdAt,
    post_id,
}) {
    const timeAgo = formatTimeAgo(new Date(createdAt));


    return (
        <div className="text-sm py-1">
            <div>
                <span className="font-bold">{username}</span> {content}
            </div>

            <details>
                <summary className="list-none ">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <p>{timeAgo}</p>
                        <p>{likes} {likes === 1 ? "like" : "likes"}</p>

                        <p className="font-semibold cursor-pointer hover:underline">Reply</p>
                    </div>
                </summary>
                <form action={addComment} className="mt-2 flex flex-col">
                    <input type="hidden" name="post_id" value={post_id} />
                    <input type="hidden" name="parent_comment_id" value={comment_id} />
                    <div className="relative flex h-8 w-full min-w-[200px] max-w-[24rem]">
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
                            placeholder="Escribe tu respuesta..."
                            required
                        />
                    </div>

                </form>
            </details>
        </div>
    );
}
