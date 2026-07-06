"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function OtpPage() {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(30);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  function handleChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function verifyOtp() {
    const code = otp.join("");

    if (code.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    // Replace with Firebase OTP verification later
    router.push("/home");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg-page)] px-5">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 shadow-xl">

        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--brand-primary)]"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white">
            <ShieldCheck size={40} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[var(--text-primary)]">
            Verify OTP
          </h1>

          <p className="mt-2 text-[var(--text-secondary)]">
            Enter the 6-digit code sent to your mobile.
          </p>

        </div>

        <div className="mt-10 flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="h-14 w-14 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-center text-2xl font-bold outline-none focus:border-[var(--brand-primary)]"
            />
          ))}
        </div>

        <button
          onClick={verifyOtp}
          className="mt-10 w-full rounded-2xl bg-[var(--brand-primary)] py-4 text-lg font-semibold text-white transition hover:opacity-90"
        >
          Verify OTP
        </button>

        <div className="mt-6 text-center text-sm">
          {seconds > 0 ? (
            <span className="text-[var(--text-secondary)]">
              Resend OTP in {seconds}s
            </span>
          ) : (
            <button
              onClick={() => setSeconds(30)}
              className="font-semibold text-[var(--brand-primary)]"
            >
              Resend OTP
            </button>
          )}
        </div>

      </div>
    </main>
  );
}