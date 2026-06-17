"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const savedSession = localStorage.getItem("authSession");

    if (!savedSession) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authSession");
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5]">
      <div className="w-full max-w-[800px] rounded-lg border-2 border-black/90 bg-[#f0f8ff]/90 p-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        <div className="mb-5 flex items-center justify-between border-b-2 border-black/10 pb-[15px]">
          <h1 className="m-0 text-[28px] font-bold text-blue-900">
            Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="cursor-pointer rounded-md border-none bg-[#db4843]/90 px-5 py-[10px] font-bold text-white/90 transition-transform duration-200 hover:scale-105 hover:bg-[#c9302c]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}