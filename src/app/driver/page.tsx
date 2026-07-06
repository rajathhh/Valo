import Link from "next/link";
import { Car, Clock, Wallet, ArrowRight } from "lucide-react";

export default function DriverPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)]">
      {/* Hero */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <span className="rounded-full bg-[var(--brand-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--brand-primary)]">
            Drive with VALO
          </span>

          <h1 className="mt-6 text-5xl font-bold text-[var(--text-primary)]">
            Earn More,
            <br />
            Drive Smarter
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-[var(--text-secondary)]">
            Join Kerala's next-generation mobility platform. Drive when you
            want, earn daily, and keep more of every ride.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 text-white"
          >
            Apply Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 md:grid-cols-3">
        <div className="rounded-3xl border p-8">
          <Wallet className="mb-4 h-10 w-10 text-[var(--brand-primary)]" />
          <h3 className="text-xl font-semibold">Daily Earnings</h3>
          <p className="mt-3 text-[var(--text-secondary)]">
            Get paid directly to your VALO Wallet every day.
          </p>
        </div>

        <div className="rounded-3xl border p-8">
          <Clock className="mb-4 h-10 w-10 text-[var(--brand-primary)]" />
          <h3 className="text-xl font-semibold">Flexible Hours</h3>
          <p className="mt-3 text-[var(--text-secondary)]">
            Drive whenever you want. No fixed schedule.
          </p>
        </div>

        <div className="rounded-3xl border p-8">
          <Car className="mb-4 h-10 w-10 text-[var(--brand-primary)]" />
          <h3 className="text-xl font-semibold">More Ride Requests</h3>
          <p className="mt-3 text-[var(--text-secondary)]">
            Reach riders across Kerala with smart ride matching.
          </p>
        </div>
      </section>
    </main>
  );
}