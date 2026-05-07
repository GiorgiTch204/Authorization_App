"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import RegisterPage from "../auth/register/page";

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

        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardCard}>
                <div className={styles.dashboardHeader}>
                    <h1 className={styles.title}>Dashboard</h1>

                    <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
                </div>

                <div className={styles.welcomeSection}>
                    <p className={styles.welcomeText}>Welcome!</p>
                </div>
                
            </div>
        </div>
    )
}