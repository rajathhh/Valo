import Link from "next/link";
import { Hotel, MapPin, Star, ArrowRight } from "lucide-react";

export default function HotelsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)]">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/10 via-transparent to-[var(--brand-accent)]/10" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <span className="rounded-full bg-[var(--brand-primary)]/10 px-4 py-2 text-sm font-medium text-[var(--brand-primary)]">
              VALO Hotels
            </span>

            <h1 className="mt-6 text-5xl font-bold text-[var(--text-primary)]">
              Discover Kerala's
              <br />
              Best Hotels & Resorts
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-[var(--text-secondary)]">
              Book premium hotels, resorts, homestays and houseboats across
              Kerala with instant confirmation and secure payments.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/"
                className="rounded-xl bg-[var(--brand-primary)] px-6 py-3 text-white transition hover:opacity-90"
              >
                Explore Now
              </Link>

              <Link
                href="/tourism"
                className="rounded-xl border border-[var(--border-default)] px-6 py-3 hover:bg-[var(--bg-surface)]"
              >
                Tourism Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 md:grid-cols-3">

        <div className="rounded-3xl border p-8 shadow-sm">
          <Hotel className="mb-4 h-10 w-10 text-[var(--brand-primary)]" />
          <h3 className="text-xl font-semibold">Luxury Hotels</h3>
          <p className="mt-3 text-[var(--text-secondary)]">
            Premium stays across all 14 districts of Kerala.
          </p>
        </div>

        <div className="rounded-3xl border p-8 shadow-sm">
          <MapPin className="mb-4 h-10 w-10 text-[var(--brand-primary)]" />
          <h3 className="text-xl font-semibold">Nearby Attractions</h3>
          <p className="mt-3 text-[var(--text-secondary)]">
            Find hotels near beaches, waterfalls, hill stations and wildlife parks.
          </p>
        </div>

        <div className="rounded-3xl border p-8 shadow-sm">
          <Star className="mb-4 h-10 w-10 text-yellow-500" />
          <h3 className="text-xl font-semibold">Verified Reviews</h3>
          <p className="mt-3 text-[var(--text-secondary)]">
            Thousands of genuine traveller reviews.
          </p>
        </div>

      </section>

      {/* Coming Soon */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="rounded-3xl border bg-[var(--bg-surface)] p-12 text-center shadow-lg">

          <h2 className="text-3xl font-bold">
            🚀 Hotel Booking Coming Soon
          </h2>

          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            We're partnering with hotels, resorts, homestays and houseboats
            across Kerala to bring you the best booking experience.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 text-white transition hover:opacity-90"
          >
            Back to Home
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>
    </main>
  );
}