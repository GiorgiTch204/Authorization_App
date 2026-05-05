"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/dist/client/link";

export default function LoginPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try{
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: {"Content-Type": "Application/json"},
                body: JSON.stringify({
                    username,
                    password,
                    expiresInMins: 60
                })
            })

            const data = await response.json();

            if(response.ok){
                localStorage.setItem("token", data.accessToken);
                router.push("/dashboard");
            }else{
                setError(data.message || "Login Failed.");
            }
        }catch(err){
            setError("Error. Please try again.");
        }
    };

    return(
        <div className="">
            <Link href="/">Home Page</Link>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                {error && <p>{error}</p>}

                <input 
                    type="text"
                    placeholder="Username"
                    className=""
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input 
                    type="password" 
                    placeholder="Password"
                    className=""
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>

                Don&apos;t have an account?{" "}
                <Link href="/auth/register">Register</Link>
            </form>
        </div>
    )
}