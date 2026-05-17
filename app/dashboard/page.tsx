"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import styles from "./dashboard.module.css";

export default function DashboardPage(){
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token){
            router.push("/auth/login");
        }
    }, [router]);

    const handleLogout = () =>{
        localStorage.removeItem("token");
        router.push("/");
    };

    return(

        <div className="flex justify-center items-center min-h-screen bg-[#f0f2f5]">
            <div className="w-full max-w-200 bg-aliceblue/90 border-2 border-black/93 rounded-lg p-7.5 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between items-center border-b-2 border-black/10 pb-3.75 margin-bottom-[20px] mb-5">
                    <h1 className="text-[rgba(0,0,139,0.863)] m-0 text-[28px] font-bold">Dashboard</h1>
                    <button onClick={handleLogout} className="font-bold text-white/90 bg-[#db4843]/90 px-5 py-2.5 border-none rounded-md cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-[#c9302c]">Logout</button>
                </div>

                <div className="mb-7.5">
                    <p className="text-[20px] font-bold text-[#333333]/90">Welcome!</p>
                </div>
            </div>
        </div>
    )
}