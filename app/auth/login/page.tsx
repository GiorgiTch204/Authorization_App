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

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUsers = users.find(
            (e: any) => e.username === username && e.password === password
        );

        if(foundUsers){
            localStorage.setItem("token", "fakeJWTToken12345");
            router.push("/dashboard");
            return;
        }

        try{
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            });

            if(response.ok){
                const data=await response.json();
                localStorage.setItem("token", data.accessToken);
                router.push("/dashboard");
            }else{
                setError("Error");
            }
        } catch {
            setError("Login failed.");
        }};

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