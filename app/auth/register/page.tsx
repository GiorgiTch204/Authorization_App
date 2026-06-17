"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import styles from "./register.module.css";

type User = {
        username:string,
        email:string,
        password:string
    };


export default function RegisterPage(){
    // const [formData, setFormData] = useState({
    //     username: "",
    //     email: "", 
    //     password: "",
    //     confirmPassword: ""
    // });

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    
    const router = useRouter();


    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        // if(formData.password !== formData.confirmPassword){
        //     setError("Passwords do not match!");
        //     return;
        // }



        if(password !== confirmPassword){
            setError("Passwords do not match!");
            return;
        }

        
        // if(formData.password.length<6){
        //     setError("Password must be at least 6 characters long!");
        //     return;
        // }

        if(password.length<6){
            setError("Password must be at least 6 characters long!");
            return;
        }

        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

        const userLogin = JSON.parse(localStorage.getItem("users") || "[]");

        const existingUserEmail = userLogin.find(u => u.email === email);

        const existingUsername = userLogin.find(u => u.username === username);
        
        if(existingUserEmail && existingUsername){
            alert("Both username and email are already taken");
            return;
        }

        if(existingUserEmail){
            alert("Email already taken!");
            return;
        }

        if(existingUsername){
            alert("Username already taken!");
            return;
        }

        
        // const newUser={
        //     username: formData.username,
        //     password: formData.password,
        //     email: formData.email
        // };

        const newUser:User={
            username: username,
            password: password,
            email: email
        };

        try{
            const response = await fetch("https://dummyjson.com/users/add",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(newUser)
            });

            if(!response.ok){
                setError("Failed");
                return;
            }

            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Account Created! Now login.")
            router.push("/auth/login");
        }catch (error){
            console.error("Failed!",error);
            setError("Try again");
        }}


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