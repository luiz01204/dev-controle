"use client";

import Link from "next/link";
import { FiHome, FiLogOut, FiLoader, FiLock, FiPlusCircle } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Header() {
    const { status } = useSession();
    const router = useRouter();

    // Redireciona automaticamente após login
    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard");
        }
    }, [status, router]);

    async function handleLogin() {
        await signIn(); 
    }

    async function handleLogout() {
        await signOut();
    }

    return (
        <header className="w-full h-20 flex justify-between items-center px-2 py-4 bg-white mx-auto max-w-7xl">
            <div className="pl-2">
                <Link href="/">
                    <h1 className="font-bold text-2xl hover:tracking-widest duration-300">
                        <span className="text-blue-500">DEV</span> CONTROLE
                    </h1>
                </Link>
            </div>
            <div className="flex gap-4 pr-2">
                {status === "loading" && (
                    <button className="animate-spin">
                        <FiLoader size={26} />
                    </button>
                )}
                {status === "unauthenticated" && (
                    <>
                        <Link href={"/open"} className="hover:text-green-500">
                            <FiPlusCircle size={26} />
                        </Link>
                        <button onClick={handleLogin} className="cursor-pointer hover:text-blue-500">
                            <FiLock size={26} />
                        </button>
                    </>
                )}
                {status === "authenticated" && (
                    <>
                        <Link href="/dashboard" className="hover:text-blue-500">
                            <FiHome size={26} />
                        </Link>
                        <button onClick={handleLogout} className="cursor-pointer hover:text-red-500">
                            <FiLogOut size={26} />
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}
