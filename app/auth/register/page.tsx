"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage(){
    const [formData, setFormData] = useState({
        username: "",
        email: "", 
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        if(formData.password !== formData.confirmPassword){
            setError("Passwords do not match!");
            return;
        }

        if(formData.password.length<6){
            setError("Password must be at least 6 characters long!");
            return;
        }

        const userLogin = JSON.parse(localStorage.getItem("users") || "[]");

        const newUser={
            username: formData.username,
            password: formData.password,
            email: formData.email
        };

        userLogin.push(newUser);

        localStorage.setItem("users", JSON.stringify(userLogin));

        setError("");

        try{
            const response = await fetch("https://dummyjson.com/users/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            }),
        });

        if(response.ok){
            alert("Account created successfully! Please login.");
            router.push("/auth/login");
        }
        } catch (error) {
            console.error("Registration failed:", error);

            router.push("/auth/login");
        }
    };

    return(
        <div>
            <Link href="/">Home Page</Link>
            <form onSubmit={handleRegister}>
                <h1>Register</h1>

                {error && <p>{error}</p>}

                <input 
                    type="text"
                    placeholder="Username"
                    className=""
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required
                />

                <input 
                    type="email" 
                    placeholder="Email"
                    className=""
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required    
                />

                <input 
                    type="password"
                    placeholder="Password"
                    className=""
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                />

                <input 
                    type="password"
                    placeholder="Confirm Password"
                    className=""
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                />

                <button type="submit">Register</button>

                Already have an account?{" "}
                <Link href="/auth/login">Login here</Link>
            </form>
        </div>
    )
}