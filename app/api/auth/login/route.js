import { cookies } from "next/headers";

export async function POST(request: Request){
    try{
        const {username, password} = await request.json();

        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
                password: password,
                expiresInMins: 60
            }),
        });

        if(!response.ok){
            const errorData = await response.json();
            const errorMessage = errorData.message || "Login failed";
                return new Response(errorMessage, {status: response.status});
            }

            const data = await response.json();
                
        const cookieStore = await cookies();

        cookieStore.set("session", data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60*60
        });

        return Response.json({username: data.username, email:data.email,})

        }
    catch(reason){
        return new Response("Invalid request", {status: 400});
    }
}