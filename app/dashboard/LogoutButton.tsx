"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton(){
    const router = useRouter();

    const handleLogout = async () =>{
        await fetch("/api/auth/logout", {method: "POST"});
        router.push("/");
    };

    return (
        <button onClick={handleLogout} className="cursor-pointer rounded-md border-none bg-[#db4843]/90 px-5 py-2.5 font-bold text-white/90 transition-transform duration-200 hover:scale-105 hover:bg-[#c9302c]">
            Logout
        </button>
    )
}