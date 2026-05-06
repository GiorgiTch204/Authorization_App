"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./register.module.css";

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
        <div className={styles.regFormContainer}>
            <Link href="/" className={styles.homePageBtn}>Home Page</Link>
            <form onSubmit={handleRegister} className={styles.regForm}>
                <h1 className={styles.regFormHeader}>Register</h1>

                {error && <p>{error}</p>}

                <input 
                    type="text"
                    placeholder="Username"
                    className={styles.input}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required
                />

                <input 
                    type="email" 
                    placeholder="Email"
                    className={styles.input}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required    
                />

                <input 
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                />

                <input 
                    type="password"
                    placeholder="Confirm Password"
                    className={styles.input}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                />

                <button type="submit" className={styles.regBtn}>Register</button>

                <span className={styles.addInfo}>Already have an account?{" "}</span>
                <Link href="/auth/login" className={styles.logPage}>Login here</Link>
            </form>
        </div>
    )
}