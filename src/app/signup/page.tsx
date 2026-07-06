"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/otp");
  }

  return (
    <main className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 shadow-xl">

        <h1 className="text-4xl font-bold text-center">
          Create Account
        </h1>

        <p className="mt-2 text-center text-[var(--text-secondary)]">
          Join Kerala's Super Mobility Platform
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <div className="flex items-center rounded-xl border px-4 py-3">
              <User size={18} />
              <input
                className="ml-3 w-full bg-transparent outline-none"
                placeholder="Your Name"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <div className="flex items-center rounded-xl border px-4 py-3">
              <Mail size={18} />
              <input
                type="email"
                className="ml-3 w-full bg-transparent outline-none"
                placeholder="name@email.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Mobile Number
            </label>

            <div className="flex items-center rounded-xl border px-4 py-3">
              <Phone size={18} />
              <input
                className="ml-3 w-full bg-transparent outline-none"
                placeholder="+91 9876543210"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] py-4 font-semibold text-white"
          >
            Continue
            <ArrowRight size={18} />
          </button>

        </form>

        <p className="mt-8 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[var(--brand-primary)]"
          >
            Sign In
          </Link>
        </p>

      </div>

    </main>
  );
}