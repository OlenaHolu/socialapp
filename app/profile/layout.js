'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function ProfileLayout({ children }) {
    const path = usePathname(); // Obtiene la ruta actual

    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* Menú de Navegación */}
            <nav className="flex gap-6 border-b pb-2 mb-4 text-lg font-medium">
                <NavLink href="/profile" isActive={path === "/profile"}>
                    Perfil
                </NavLink>
                <NavLink href="/profile/likes" isActive={path === "/profile/likes"}>
                    Me gusta
                </NavLink>
                <NavLink href="/profile/comments" isActive={path === "/profile/comments"}>
                    Comentarios
                </NavLink>
            </nav>

            {/* Contenido dinámico (Perfil, Me gusta, Comentarios) */}
            {children}
        </div>
    );
}

// Componente de enlace reutilizable con resaltado cuando está activo
function NavLink({ href, isActive, children }) {
    return (
        <Link
            href={href}
            className={clsx(
                "px-4 py-2 rounded-md transition-all",
                isActive
                    ? "text-blue-600 font-bold border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            )}
        >
            {children}
        </Link>
    );
}
