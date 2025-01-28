'use client';

import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function NavLink({ ruta, texto, icon }) {

    const path = usePathname();

    return (
        <Link href={ruta} className={clsx(
            "flex gap-2 hover:bg-gray-200 py-1 ps-2 pe-4 rounded-lg ",
            {
                "font-bold pointer-events-none": path === ruta
            })}
        >
            <HomeIcon className="w-4" />
            <span className="hidden sm:inline">{texto}</span>
        </Link >
    );
}