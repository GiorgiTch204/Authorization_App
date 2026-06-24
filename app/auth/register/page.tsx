"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) =>{
        e.preventDefault();

        setError("");
        
        if(password !== confirmPassword){
            setError("Passwords do not match!");
            return;
        }


        if(password.length<6){
            setError("Password must be at least 6 characters long!");
            return;
        }

         try{
            const response = await fetch("/api/auth/register",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok){
                const message = await response.text();
                setError(message || "Registration failed");
                return;
            }

            router.push("/auth/login");
            }catch (err){
            console.error("Registration failed:", err);
            setError("Try again");
            }
        };


    return(
        <div className="flex flex-col items-center justify-center gap-3.75 min-h-screen">
            <Link href="/" className="px-6 py-3 border-2 border-black/90 rounded-lg no-underline font-bold transition-transform duration-200 ease-in-out hover:scale-105">
                Home Page
            </Link>
            
            <form className="flex flex-col items-center justify-center gap-5 border-2 border-black/85 rounded bg-aliceblue/70 p-[15px_50px] shadow-[0_5px_15px_rgba(0,0,0,0.2)]" onSubmit={handleRegister}>
                <h1 className="text-[rgba(0,100,0,0.86)]">Register</h1>

                {error && <p className="text-red-500">{error}</p>}

                <input 
                    type="text"
                    placeholder="Username"
                    className="w-53.75 h-7 px-1.25 py-0.5 border-2 border-gray-500/90 rounded-lg placeholder:font-bold"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input 
                    type="email" 
                    placeholder="Email"
                    className="w-53.75 h-7 px-1.25 py-0.5 border-2 border-gray-500/90 rounded-lg placeholder:font-bold"
                    onChange={(e) => setEmail(e.target.value)}
                    required    
                />

                <input 
                    type="password"
                    placeholder="Password"
                    className="w-53.75 h-7 px-1.25 py-0.5 border-2 border-gray-500/90 rounded-lg placeholder:font-bold"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input 
                    type="password"
                    placeholder="Confirm Password"
                    className="w-53.75 h-7 px-1.25 py-0.5 border-2 border-gray-500/90 rounded-lg placeholder:font-bold"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit" className="font-bold text-white/95 bg-black/95 w-29 h-8.75 rounded-md transition-transform duration-200 ease-in-out cursor-pointer hover:scale-105">
                    Register
                </button>

                <span className="text-black/85 font-bold text-[17px]">Already have an account?{" "}</span>
                    <Link href="/auth/login" className="font-bold no-underline text-blue-600/90 transition-transform duration-200 ease-in-out hover:scale-105 hover:text-blue-600 active:text-blue-400">
                        Login here
                    </Link>
            </form>
        </div>
    )
}