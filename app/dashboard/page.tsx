import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if(!session){
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5]">
      <div className="w-full max-w-200 rounded-lg border-2 border-black/90 bg-aliceblue/90 p-7.5 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        <div className="mb-5 flex items-center justify-between border-b-2 border-black/10 pb-3.75">
          <h1 className="m-0 text-[28px] font-bold text-blue-900">
            Dashboard
          </h1>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}