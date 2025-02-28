'use client'

import { createPost } from "../lib/actions"
import ImageSelector from "../ui/image-selector"

export default () => {
    return (
        <div className="flex flex-col grow items-center gap-16">
            <form action={createPost} className="flex flex-col gap-8">
                <ImageSelector />
                <input name="content" placeholder="escribe post" className="text-black" required />
                <input className="rounded bg-teal-800 p-2" type="submit" value="Publicar" />
            </form>
        </div>



    )
}



/* 
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from 'react';
import { createPost } from "../lib/actions";
import ImageSelector from "./image-selector";

export default () => {
    const router = useRouter();
    const [formState, formAction] = useActionState(createPost, { success: null, message: null, errors: {} });

    useEffect(() => {
        if (!formState.errors) {
            router.back();
        }
    },[formState.success])

    return (
        <form action={formAction} className="flex flex-col gap-8">
            <ImageSelector />
            <input name="content" className="text-black" required/>
            <input className="rounded bg-teal-800 p-2" type="submit" value="Publicar" />
        </form>
    )
}

*/
    