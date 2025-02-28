"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { updateProfile } from "../lib/actions";
import Image from "next/image";

export default function ProfileForm({ user }) {
    const router = useRouter();
    const [formState, formAction] = useActionState(updateProfile, { success: null, message: null, errors: {} });
    const [picture, setPicture] = useState("/preview.png");

    useEffect(() => {
        if (formState.success) {
            router.refresh(); // Recarga la página para mostrar datos actualizados
        }
    }, [formState.success]);

    function preview(ev){
        setPicture(URL.createObjectURL(ev.target.files[0]));
}

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center">Editar Perfil</h1>

            {formState.message && (
                <p className={`text-center ${formState.success ? "text-green-600" : "text-red-600"}`}>
                    {formState.message}
                </p>
            )}

            <form action={formAction} className="flex flex-col gap-8">
                <input type="hidden" name="user_id" value={user.user_id} />

                    <label htmlFor="myfs">
                        <Image id="ima" src={picture} width={256} height={256} alt="preview" />
                    </label>
                    <input id="myfs" type="file" name="media" hidden onChange={preview} required />
            

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
