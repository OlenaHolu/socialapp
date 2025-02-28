'use client'
import Link from "next/link"
import { BeakerIcon, HomeIcon } from '@heroicons/react/24/solid'
import clsx from "clsx"
const { usePathname } = require("next/navigation");

export default ({ruta, texto, icon}) => {

    const objeto = { icon };

    const path = usePathname();

    return (
        <Link href={ruta} className={clsx( 
            "flex gap-2 hover:bg-gray-500 py-1 ps-2 pe-4 rounded"
            , 
            {
                "font-bold pointer-events-none": path === ruta
            })}
        >
            <objeto.icon className="w-4" />
            <span className="hidden sm:inline">{texto}</span>
        </Link>
    )
}