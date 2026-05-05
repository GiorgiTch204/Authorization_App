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

        if()
    }
}