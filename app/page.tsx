"use client";

import Link from 'next/link';
// import styles from "./home.module.css";

export default function Home() {
  return (
    <div className="flex justify-center items-center gap-6.25 min-h-screen bg-white/90">
      <Link className="px-6 py-3 rounded-lg no-underline font-bold bg-[#0071f3]/55 text-white transition-transform duration-200 ease-in-out hover:scale-105" href="/auth/login">Login</Link>
      <Link className="px-6 py-3 rounded-lg no-underline font-bold bg-[#0071f3]/55 text-white transition-transform duration-200 ease-in-out hover:scale-105" href="/auth/register">Register</Link>
    </div>
  );
}