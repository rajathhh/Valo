"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Smartphone,
  ArrowRight,
  ShieldCheck,
  MapPinned,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function SignInPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/otp");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg-page)]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[var(--brand-primary)]/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <div className="w-full max-w-md rounded-[32px] border border-white/20 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:bg-black/30">

          {/* Logo */}
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--brand-primary)] text-white shadow-xl">
              <MapPinned size={38} />
            </div>

            <h1 className="mt-6 text-4xl font-bold text-[var(--text-primary)]">
              Welcome to VALO
            </h1>

            <p className="mt-3 text-[var(--text-secondary)]">
              Kerala's Super Mobility Platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Mobile Number
              </label>

              <div className="flex overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)]">
                <span className="flex items-center bg-[var(--bg-surface-raised)] px-5 font-semibold">
                  +91
                </span>

                <input
                  type="tel"
                  placeholder="9876543210"
                  required
                  className="w-full bg-transparent px-5 py-4 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand-primary)] py-4 text-lg font-semibold text-white transition hover:scale-[1.02]"
            >
              Continue with OTP
              <ArrowRight size={20} />
            </button>

          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
            <span className="text-sm text-[var(--text-secondary)]">
              OR
            </span>
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>

          {/* Social Login */}
          <div className="space-y-4">

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[var(--border-default)] py-4 transition hover:bg-[var(--bg-surface-raised)]"
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[var(--border-default)] py-4 transition hover:bg-[var(--bg-surface-raised)]"
            >
              <FaApple size={22} />
              Continue with Apple
            </button>

          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-green-600">
            <ShieldCheck size={18} />
            Secure Login
          </div>

          <p className="mt-8 text-center text-xs leading-6 text-[var(--text-secondary)]">
            By continuing, you agree to the{" "}
            <Link
              href="/terms"
              className="font-semibold text-[var(--brand-primary)]"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-semibold text-[var(--brand-primary)]"
            >
              Privacy Policy
            </Link>
            .
          </p>
<div className="mt-8 border-t border-[var(--border-subtle)] pt-6 text-center">
  <p className="text-sm text-[var(--text-secondary)]">
    New to VALO?
  </p>

  <Link
    href="/signup"
    className="mt-3 inline-flex items-center justify-center rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
  >
    Create Account
  </Link>
</div>
        </div>
      </div>
    </main>
  );
}