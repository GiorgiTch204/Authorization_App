"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./register.module.css";

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

        const userLogin = JSON.parse(localStorage.getItem("users") || "[]");

        const existingUserEmail = userLogin.find(
            (user: any) => user.email === email,
        );

        const existingUsername = userLogin.find(
            (user: any) => user.username === username
        );
        
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

        const newUser={
            username: username,
            password: password,
            email: email
        };

        userLogin.push(newUser);

        localStorage.setItem("users", JSON.stringify(userLogin));

        setError("");


        try{
            const response = await fetch("https://dummyjson.com/users/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            // body: JSON.stringify({
            //     username: formData.username,
            //     email: formData.email,
            //     password: formData.password,
            // }),

            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
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
            <form className={styles.regForm}>
                <h1 className={styles.regFormHeader}>Register</h1>

                {error && <p>{error}</p>}

                <input 
                    type="text"
                    placeholder="Username"
                    className={styles.input}
                    // onChange={(e) => setFormData({...formData, username: e.target.value})}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input 
                    type="email" 
                    placeholder="Email"
                    className={styles.input}
                    // onChange={(e) => setFormData({...formData, email: e.target.value})}
                    onChange={(e) => setEmail(e.target.value)}
                    required    
                />

                <input 
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                    // onChange={(e) => setFormData({...formData, password: e.target.value})}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input 
                    type="password"
                    placeholder="Confirm Password"
                    className={styles.input}
                    // onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button onClick={handleRegister} type="submit" className={styles.regBtn}>Register</button>

                <span className={styles.addInfo}>Already have an account?{" "}</span>
                <Link href="/auth/login" className={styles.logPage}>Login here</Link>
            </form>
        </div>
    )
}