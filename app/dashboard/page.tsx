"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage(){
    const [loaded, setLoaded] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token){
            router.push("/auth/login");
        }else{
            setLoaded(true);
        }
    }, [router]);

    const handleLogout = () =>{
        localStorage.removeItem("token");
        router.push("/");
    };

    if(!loaded){
        return <div>Loading. Please wait</div>
    };

    return(

        <div>
            <div>
                <div>
                    <h1>Dashboard</h1>

                    <button onClick={handleLogout}>Logout</button>
                </div>

                <div>
                    <p>Welcome!</p>
                </div>

                <div>
                    <div>
                        <h3>Account Status</h3>
                        <p>Active</p>
                    </div>
                </div>
            </div>
        </div>
    )
}