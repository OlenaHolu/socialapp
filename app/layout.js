import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from '@/app/ui/nav-bar'
import { auth0 } from "./lib/auth0";
import Landing from "./ui/landing";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SocialApp",
  description: "Generated by create next app",
};

export default async function RootLayout({ children, modal }) {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}>
          <Landing>
            <a 
              href="/auth/login" 
              className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              Iniciar sesión
            </a>
          </Landing>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <h1>{session.user.name}</h1>
        <NavBar></NavBar>
        <div className="p-8 grow flex justify-center align-center">
          {children}
          {modal}
        </div>
      </body>
    </html>
  );
}
