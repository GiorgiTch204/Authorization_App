"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type AuthSession = {
  token: string;
  username: string;
  email?: string;
  provider: "localStorage" | "dummyJSON";
};

type DummyMeResponse = {
  username?: string;
  email?: string;
};

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() =>{
    const checkAuth = async () =>{
      const savedSession = localStorage.getItem("authSession");

      if(!savedSession){
        router.push("/auth/login");
        return;
      }

      const parsedSession: AuthSession = JSON.parse(savedSession);

      if(!parsedSession.token){
        router.push("/auth/login");
        return;
      }

      if(parsedSession.provider === "localStorage"){
        return;
      }

      try{
        const response = await fetch("https://dummyjson.com/auth/me",{
          method: "GET",
          headers: {
            Authorization: `Bearer ${parsedSession.token}`,
          },
        });

        if (!response.ok){
          localStorage.removeItem("authSession");
          localStorage.removeItem("token");
          router.push("/auth/login");
          return;
        }

        const data: DummyMeResponse = await response.json();

        const updatedSession: AuthSession ={
          token: parsedSession.token,
          username: data.username || parsedSession.username,
          email: data.email || parsedSession.email,
          provider: "dummyJSON",
        };

        localStorage.setItem("authSession", JSON.stringify(updatedSession));

      }catch (error){
        console.error("Auth check failed:", error);
        localStorage.removeItem("authSession");
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () =>{
    localStorage.removeItem("authSession");
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5]">
      <div className="w-full max-w-[800px] rounded-lg border-2 border-black/90 bg-[#f0f8ff]/90 p-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        <div className="mb-5 flex items-center justify-between border-b-2 border-black/10 pb-[15px]">
          <h1 className="m-0 text-[28px] font-bold text-blue-900">Dashboard</h1>

          <button
            onClick={handleLogout}
            className="cursor-pointer rounded-md border-none bg-[#db4843]/90 px-5 py-[10px] font-bold text-white/90 transition-transform duration-200 hover:scale-105 hover:bg-[#c9302c]">Logout</button>
        </div>
      </div>
    </div>
  );
}