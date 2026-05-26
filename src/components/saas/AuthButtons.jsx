"use client";

import { signIn, signOut } from "next-auth/react";
import { FaGoogle, FaSignOutAlt } from "react-icons/fa";

export function LoginButton({ className }) {
  return (
    <button
      onClick={() => signIn("google")}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 border border-zinc-800 text-zinc-200 rounded-sm font-medium hover:bg-zinc-800 hover:border-zinc-600 transition-all text-sm outline-none cursor-pointer ${className}`}
    >
      <FaGoogle className="text-xs text-zinc-400" />
      Sign In
    </button>
  );
}

export function SignUpButton({ className }) {
  return (
    <button
      onClick={() => signIn("google")}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-sm font-medium transition-all text-sm outline-none cursor-pointer ${className}`}
    >
      Sign Up
    </button>
  );
}

export function SignOutButton({ className }) {
  return (
    <button
      onClick={() => signOut()}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-zinc-800 text-zinc-400 rounded-sm hover:text-zinc-200 hover:border-zinc-700 transition-all outline-none cursor-pointer ${className}`}
    >
      <FaSignOutAlt className="text-[10px]" />
      Sign Out
    </button>
  );
}
