import { cookies } from "next/headers";

export async function POST(request: Request){
    try{
        await request.json();

        const response = fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: "emilys",
                password: "emilyspass",
                expiresInMins: 60
            }),
        });

        if(response.ok){
            const data = await response.json();
            return new Response(JSON.stringify(data), {status: 200});
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.message || "Login failed";
                return new Response(errorMessage, {status: response.status});
            }
        }
    } catch(reason){
        const message = reason instanceof Error ? reason.message : "Unexpected error";

        return new Response(message, {status: 500});
    }

}