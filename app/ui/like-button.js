'use client'

import { HeartIcon } from "@heroicons/react/24/outline"
import { deleteLike, insertLike } from "../lib/actions";
import clsx from "clsx";
import { useState } from "react";

export default ({ post_id, user_id, isLikedInitial }) => {

    let [isLiked, setIsLiked] = useState(isLikedInitial);

    function toogleLike() {
        if(isLiked){
            deleteLike(post_id, user_id);
            setIsLiked(false);
        }else {
            insertLike(post_id, user_id);
        setIsLiked(true);
        }
    }

    return (
        <HeartIcon
            onClick={toogleLike}
            className={clsx("w-8", {"fill-red-600 text-red-600":isLiked})}
        />

    )
}