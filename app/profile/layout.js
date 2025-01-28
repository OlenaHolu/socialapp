import Link from "next/link"

export default ({children}) => {
    return (
        <div>
            <div className="flex gap-4">
                <Link href="/profile">Perfil</Link>
                <Link href="/profile/likes">Me gusta</Link>
                <Link href="/profile/comments">Comentarios</Link>
            </div>
            {children}
        </div>

    )
}