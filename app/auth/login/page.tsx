"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type User ={
  username: string;
  email: string;
  password: string;
};

export default function LoginPage(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    setError("");

    try{
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
      });

      if (!response.ok){
        setError("Invalid username or password.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
      
    }catch (error){
      console.error("Login failed:",error);
      setError("Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-[15px]">
      <Link
        href="/"
        className="font-bold text-blue-600 no-underline transition-all duration-200 hover:scale-105">Home Page
      </Link>

      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center gap-5 rounded border-2 border-black bg-[#f0f8ff]/70 px-[50px] py-[15px] shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
      >
        <h1 className="m-0 text-2xl font-bold text-blue-900">
            Login
        </h1>

        <p className="text-sm font-bold text-black">
            Dummy user: emilys / emilyspass
        </p>

        {error && <p className="font-medium text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Username or Email"
          className="h-[30px] w-[215px] rounded-lg border-2 border-gray-500/90 px-[5px] py-[2px] placeholder:font-bold"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="h-[30px] w-[215px] rounded-lg border-2 border-gray-500/90 px-[5px] py-[2px] placeholder:font-bold"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="h-[35px] w-[116px] cursor-pointer rounded-md border-none bg-black/95 font-bold text-white/95 transition-all duration-200 hover:scale-105 hover:bg-[#333] disabled:opacity-60">Login
        </button>

        <span className="text-[17px] font-bold text-black/90">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-bold text-blue-600 no-underline transition-all duration-200 hover:text-blue-600">Register
          </Link>
        </span>
      </form>
    </div>
)};