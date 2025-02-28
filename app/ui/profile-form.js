"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { updateProfile } from "../lib/actions";
import Image from "next/image";

export default function ProfileForm({ user }) {

    const router = useRouter();
    const [formState, formAction] = useActionState(updateProfile, { success: null, message: null, errors: {} });

    useEffect(() => {
        if (formState.success) {
            router.refresh(); // Recarga la página para mostrar datos actualizados
        }
    }, [formState.success]);

    const [imageUrl, setImageUrl] = useState(user.picture);

    function preview(ev) {
        setImageUrl(URL.createObjectURL(ev.target.files[0]));
    }


    return (
        <div className="flex flex-col items-center gap-16 w-full">
            <h1 className="text-2xl font-bold text-center">Editar Perfil</h1>

            {formState.message && (
                <p className={`text-center ${formState.success ? "text-green-600" : "text-red-600"}`}>
                    {formState.message}
                </p>
            )}

            <form action={formAction} className="flex flex-col gap-8">
                <input type="hidden" name="user_id" value={user.user_id} />

                <label htmlFor="myfs">
                    <Image 
                        id="ima" 
                        src={imageUrl} 
                        width={300} 
                        height={300} 
                        alt="preview"
                        className="rounded-full" />
                </label>
                <input id="myfs" type="file" name="media" hidden onChange={preview} />


                <input
                    type="text"
                    name="username"
                    defaultValue={user.username}
                    className="border p-2 w-full rounded text-black"
                    required
                />

                <input
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    className="border p-2 w-full rounded text-black"
                    required
                />

                <input
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    className="border p-2 w-full rounded text-black"
                    required
                />

                <input className="rounded bg-teal-800 p-2 text-white cursor-pointer" type="submit" value="Guardar Cambios" />
            </form>

        </div>
    );
}
