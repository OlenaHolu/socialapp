'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Modal({ children }) {
    const router = useRouter();
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        router.back();
    }

    function closeModal(e) {
        if (e.target === dialogRef.current) {
            e.stopPropagation();
            onDismiss();
        }
    }

    return (
        <>
            <dialog 
                ref={dialogRef} 
                className="backdrop:bg-gray-700 backdrop:opacity-50 rounded-lg shadow-lg p-4 flex justify-center items-center"
                onClose={onDismiss} 
                onClick={closeModal}
            >
                <div className="relative bg-[#0a0a0a] text-white p-6 w-[80vw] h-[80vh] max-w-[700px] max-h-[600px] overflow-y-auto rounded-lg">
                    {/* Botón de cerrar */}
                    <button 
                        onClick={onDismiss} 
                        className="absolute top-2 right-3 p-2 bg-gray-600 text-white rounded-full hover:bg-gray-400 transition"
                    >
                        ✖
                    </button>

                    {/* Contenido del modal */}
                    {children}
                </div>
            </dialog>
        </>
    );
}
