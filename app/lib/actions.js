'use server'

import { put } from "@vercel/blob"
import { sql } from "@vercel/postgres"
import { auth0, uid } from "./auth0";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData) {
    const user_id = (await auth0.getSession()).user.user_id;

    const { url } = await put(
        'media', 
        formData.get("media"),
        { access: 'public' }
    );
    const content = formData.get('content');

    await sql `INSERT INTO sa_POSTS(content, url, user_id) 
        VALUES(
            ${content}, 
            ${url},
            ${user_id}
    )`

    revalidatePath('/');
    redirect('/');

}

export async function insertLike(post_id, user_id) {
    await sql `INSERT INTO sa_likes(post_id, user_id) 
        VALUES(
            ${post_id}, 
            ${user_id}
    )`
}

export async function deleteLike(post_id, user_id) {
    await sql `DELETE FROM sa_likes
        WHERE post_id = ${post_id} AND user_id = ${user_id}
    `
}

export async function addComment(formData) {
    console.log(formData);
    const user_id = (await auth0.getSession()).user.user_id;

    const post_id = formData.get('post_id');
    const content = formData.get('content');
    const parent_comment_id = formData.get('parent_comment_id') || null;


    await sql`
        INSERT INTO sa_comments (post_id, user_id, content, parent_comment_id)
        VALUES (${post_id}, ${user_id}, ${content}, ${parent_comment_id})
    `;
    revalidatePath(`/post/${post_id}`);
}

export async function formatTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    const intervals = [
        { label: "año", seconds: 31536000 },
        { label: "mes", seconds: 2592000 },
        { label: "día", seconds: 86400 },
        { label: "hora", seconds: 3600 },
        { label: "minuto", seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            return `hace ${count} ${interval.label}${count !== 1 ? "s" : ""}`;
        }
    }

    return "hace unos segundos";
}
export async function updateProfile(formData) {
    console.log("Datos de formdata: ", formData);
    try {
        const user_id = formData.get("user_id");
        const username = formData.get("username");
        const name = formData.get("name");
        const email = formData.get("email");
        const media = formData.get("media"); // Puede ser null si el usuario no cambia la imagen

        // Validaciones básicas
        if (!user_id || !username || !name || !email) {
            return { success: false, message: "Todos los campos son obligatorios", errors: {} };
        }

        // Si el usuario sube una nueva imagen, procesarla
        let picture = null;
        if (media && media.size > 0) {  // Evitar subir si no hay nueva imagen
            try {
                const uploadResult = await put(
                    "media",
                    media,
                    { access: "public" }
                );
                if (uploadResult?.url) {
                    picture = uploadResult.url; // Guardamos la nueva URL
                    console.log("Imagen subida con éxito:", picture);
                }
            } catch (error) {
                console.error("Error al subir imagen:", error);
                return { success: false, message: "Error al subir imagen 🚨", errors: {} };
            }
        }

        // Actualizar en la base de datos, conservando la imagen anterior si no hay nueva
        await sql`
            UPDATE sa_users
            SET 
                username = ${username}, 
                name = ${name},
                email = ${email}, 
                picture = COALESCE(${picture}, picture) -- Mantener imagen anterior si no hay nueva
            WHERE user_id = ${user_id}
        `;

        return { success: true, message: "Perfil actualizado con éxito 🎉", errors: {} };
    } catch (error) {
        console.error("Error en updateProfile:", error);
        return { success: false, message: "Error al actualizar el perfil 🚨", errors: {} };
    }
}
