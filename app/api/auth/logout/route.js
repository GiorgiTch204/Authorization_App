import { cookies } from "next/headers";

export async function POST(request){
    const cookieStore = await cookies();
    cookieStore.delete("session");
    
    return Response.json({ success: true});
}