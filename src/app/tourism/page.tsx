import Link from "next/link";
import {
  MapPinned,
  Mountain,
  Waves,
  Trees,
  Camera,
  ArrowRight,
  Star,
} from "lucide-react";

const destinations = [
  {
    name: "Munnar",
    desc: "Tea plantations, waterfalls & misty mountains.",
    icon: <Mountain className="h-8 w-8" />,
  },
  {
    name: "Wayanad",
    desc: "Wildlife, caves, trekking & nature.",
    icon: <Trees className="h-8 w-8" />,
  },
  {
    name: "Alleppey",
    desc: "Backwaters & luxury houseboats.",
    icon: <Waves className="h-8 w-8" />,
  },
  {
    name: "Kovalam",
    desc: "Golden beaches and sunset views.",
    icon: <Camera className="h-8 w-8" />,
  },
];

const experiences = [
  "Houseboat Cruises",
  "Wildlife Safari",
  "Tea Garden Tours",
  "Beach Holidays",
  "Adventure Trekking",
  "Ayurveda Wellness",
  "Temple Tours",
  "Village Experiences",
];

export default function TourismPage() {
  return (
    <main className="bg-[var(--bg-page)]">

      {/* Hero */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/80 to-black/40" />

        <div
          className="h-[500px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1600&q=80')",
          }}
        />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-6 text-white">

            <h1 className="max-w-3xl text-6xl font-bold">
              Discover God's Own Country
            </h1>

            <p className="mt-6 max-w-xl text-xl text-white/90">
              Explore Kerala with VALO. Book rides, hotels,
              houseboats, adventures and unforgettable experiences.
            </p>

            <Link
              href="/ride"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-emerald-700 transition hover:scale-105"
            >
              Explore Now
              <ArrowRight size={20} />
            </Link>

          </div>
        </div>

      </section>

      {/* Destinations */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="text-center">
          <h2 className="text-5xl font-bold">
            Top Destinations
          </h2>

          <p className="mt-4 text-[var(--text-secondary)]">
            Beautiful places across Kerala.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {destinations.map((place) => (
            <div
              key={place.name}
              className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-6 text-emerald-600">
                {place.icon}
              </div>

              <h3 className="text-2xl font-bold">
                {place.name}
              </h3>

              <p className="mt-3 text-[var(--text-secondary)]">
                {place.desc}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* Experiences */}

      <section className="bg-[var(--bg-surface)] py-20">

        <div className="mx-auto max-w-7xl px-6">

          <h2 className="text-center text-5xl font-bold">
            Experiences
          </h2>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {experiences.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-page)] p-6 text-center font-semibold shadow"
              >
                {item}
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Why VALO */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-10 lg:grid-cols-3">

          <div className="rounded-3xl bg-emerald-600 p-8 text-white">

            <MapPinned size={42} />

            <h3 className="mt-6 text-2xl font-bold">
              Local Guides
            </h3>

            <p className="mt-3 text-white/90">
              Trusted local drivers and guides across Kerala.
            </p>

          </div>

          <div className="rounded-3xl bg-blue-600 p-8 text-white">

            <Star size={42} />

            <h3 className="mt-6 text-2xl font-bold">
              Verified Hotels
            </h3>

            <p className="mt-3 text-white/90">
              Safe stays with trusted partners.
            </p>

          </div>

          <div className="rounded-3xl bg-orange-500 p-8 text-white">

            <Mountain size={42} />

            <h3 className="mt-6 text-2xl font-bold">
              Adventure
            </h3>

            <p className="mt-3 text-white/90">
              Trekking, jeep safari, camping and more.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-20">

        <div className="mx-auto max-w-5xl text-center text-white">

          <h2 className="text-5xl font-bold">
            Ready for your next adventure?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-xl text-white/90">
            Book rides, hotels, experiences and explore every
            corner of Kerala with VALO.
          </p>

          <Link
            href="/ride"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-emerald-700 transition hover:scale-105"
          >
            Book Your Journey
            <ArrowRight size={20} />
          </Link>

        </div>

      </section>

    </main>
  );
}