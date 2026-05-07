"use client";

import Link from 'next/link';
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.btnContainer}>
      <Link className={styles.logBtn} href="/auth/login">Login</Link>
      <Link className={styles.regBtn} href="/auth/register">Register</Link>
    </div>
  );
}