"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import styles from "./login.module.css";

export default function LoginPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        
        const foundUsers = users.find(user => user.username === username && user.password === password);

        if(foundUsers){
            localStorage.setItem("token", "fake-token");
            router.push("/dashboard");
            return;
        }

        try{
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username,
                    password,
                    expiresInMins: 30
                }),
            });

            if(response.ok){
                const data = await response.json();
                localStorage.setItem("token", data.accessToken);
                router.push("/dashboard");
            }else{
                setError("Error");
            }
        } catch {
            setError("Login failed.");
        }};

    return(
        <div className="flex justify-center items-center flex-col gap-3.75 min-h-screen">
            <Link href="/" className="font-bold no-underline text-blue-600/90 transition-all duration-200 ease-in-out hover:scale-105 hover:text-blue-600 active:text-blue-400">Home Page=</Link>
            
            <form className="flex justify-center items-center flex-col gap-5 border-2 border-black rounded bg-aliceblue/70 p-[15px_50px] shadow-[0_4px_15px_rgba(0,0,0,0.1)]" onSubmit={handleLogin}>
                <h1 className="text-[rgba(0,0,139,0.863)] m-0 text-2xl font-bold">Login</h1>
                
                {error && <p className="text-red-500 font-medium">{error}</p>}

                <input 
                    type="text"
                    placeholder="Username"
                    className="w-53.75 h-7 px-1.25 py-0.5 border-2 border-gray-500/90 rounded-lg outline-none placeholder:font-bold focus:border-[rgba(0,0,139,0.6)]"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input 
                    type="password" 
                    placeholder="Password"
                    className="w-53.75 h-7 px-1.25 py-0.5 border-2 border-gray-500/90 rounded-lg outline-none placeholder:font-bold focus:border-[rgba(0,0,139,0.6)]"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="font-bold text-white/95 bg-black/96 w-29 h-8.75 border-none rounded-md transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 hover:bg-[#333]">Login</button>

                <span className="text-black/87 font-bold text-[17px]">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/register" className="font-bold no-underline text-blue-600/90 transition-all duration-200 ease-in-out hover:scale-105 hover:text-blue-600 active:text-blue-400">Register</Link>
                </span>
            </form>
        </div>
    )
}