import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "./like-button";
import { getComments } from "../lib/data";
import CommentList from "./comment-list";
import { formatTimeAgo } from "../lib/actions";

export default async function Post({
    post_id,
    user_id,
    content,
    url,
    isLikedInitial,
    username,
    num_likes,
    createdAt,
    picture
}) {
    const comments = await getComments(post_id);
    const timeAgo = await formatTimeAgo(new Date(createdAt));

    return (
        <div className="w-full max-w-[600px] mx-auto bg-white shadow-md rounded-lg p-4 text-left">
            <div className="flex gap-2">
                <Image src={picture}
                    className="rounded-full"
                    width={24}
                    height={24}
                    alt="avatar"
                />
                <span>{username}</span>
                <span className="flex items-center gap-4 text-xs text-gray-500 mt-1">{timeAgo}</span>
            </div>

            <div className="relative w-full h-[384px]">
                <Link href={`/post/${post_id}`}>
                    <Image
                        src={url}
                        alt="hola"
                        fill
                        className="object-cover rounded-lg"
                    />
                </Link>
            </div>

            <div>
                <div className="flex gap-2">
                    <LikeButton post_id={post_id} user_id={user_id} isLikedInitial={isLikedInitial} />
                    <Link href={`/post/${post_id}`}>
                        <ChatBubbleLeftIcon className="w-8" />
                    </Link>
                </div>
                <div>
                    <span>{num_likes}</span>
                </div>
            </div>

            <div>
                <p><span className="font-bold">{username}</span> {content} </p>
            </div>

            <div>
                <CommentList post_id={post_id} user_id={user_id} initialComments={comments} />
            </div>
        </div>
    );
}
