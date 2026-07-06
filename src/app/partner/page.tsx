import Link from "next/link";
import {
  Building2,
  Hotel,
  Car,
  MapPinned,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)]">
      {/* Hero */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <span className="rounded-full bg-[var(--brand-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--brand-primary)]">
            VALO Partner Program
          </span>

          <h1 className="mt-6 text-5xl font-bold text-[var(--text-primary)]">
            Grow Your Business
            <br />
            With VALO
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-[var(--text-secondary)]">
            Join Kerala's mobility and tourism platform. Reach thousands of
            customers through one powerful app.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 text-white hover:opacity-90"
          >
            Become a Partner
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Partner Types */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Who Can Join?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border p-8 text-center">
            <Hotel className="mx-auto mb-4 h-10 w-10 text-[var(--brand-primary)]" />
            <h3 className="font-semibold">Hotels & Resorts</h3>
          </div>

          <div className="rounded-3xl border p-8 text-center">
            <Car className="mx-auto mb-4 h-10 w-10 text-[var(--brand-primary)]" />
            <h3 className="font-semibold">Taxi Operators</h3>
          </div>

          <div className="rounded-3xl border p-8 text-center">
            <MapPinned className="mx-auto mb-4 h-10 w-10 text-[var(--brand-primary)]" />
            <h3 className="font-semibold">Tour Guides</h3>
          </div>

          <div className="rounded-3xl border p-8 text-center">
            <Building2 className="mx-auto mb-4 h-10 w-10 text-[var(--brand-primary)]" />
            <h3 className="font-semibold">Local Businesses</h3>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-3xl border bg-[var(--bg-surface)] p-10 shadow-sm">
          <h2 className="mb-6 text-3xl font-bold">
            Why Partner with VALO?
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" />
              Reach customers across Kerala.
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" />
              Secure online bookings and payments.
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" />
              Business analytics dashboard.
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" />
              Grow your brand with VALO promotions.
            </div>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 text-white hover:opacity-90"
          >
            Apply Today
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}