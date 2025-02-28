export default function Landing({ children }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            <div className="text-center max-w-2xl px-6">
                <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">
                    Bienvenido a SocialApp 🌟
                </h1>
                <p className="text-lg opacity-90 mb-6">
                    Conéctate con amigos, comparte momentos y descubre nuevas experiencias.
                </p>
                {children}
            </div>
        </div>
    );
}
