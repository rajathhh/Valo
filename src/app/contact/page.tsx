"use client";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] py-16">
      <div className="valo-container">

        {/* Header */}

        <div className="mb-14 text-center">
          <h1 className="text-5xl font-bold text-[var(--text-primary)]">
            Contact VALO
          </h1>

          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Need help? We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Contact Form */}

          <div className="valo-card valo-transition p-8">

            <h2 className="mb-8 text-2xl font-bold">
              Send a Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border border-[var(--border-default)] bg-transparent px-5 py-4 outline-none focus:border-[var(--brand-primary)]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-[var(--border-default)] bg-transparent px-5 py-4 outline-none focus:border-[var(--brand-primary)]"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-xl border border-[var(--border-default)] bg-transparent px-5 py-4 outline-none focus:border-[var(--brand-primary)]"
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full rounded-xl border border-[var(--border-default)] bg-transparent px-5 py-4 outline-none focus:border-[var(--brand-primary)]"
              />

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] py-4 font-semibold text-white transition hover:opacity-90"
              >
                <Send size={18} />
                Send Message
              </button>

            </form>

          </div>

          {/* Right Side */}

          <div className="space-y-8">

            {/* Contact Info */}

            <div className="valo-card valo-transition p-8">

              <h2 className="mb-8 text-2xl font-bold">
                Contact Information
              </h2>

              <div className="space-y-6">

                <div className="flex gap-4">
                  <MapPin className="mt-1 text-[var(--brand-primary)]" />

                  <div>
                    <h3 className="font-semibold">
                      Office
                    </h3>

                    <p className="text-[var(--text-secondary)]">
                      VALO Headquarters
                      <br />
                      Wayanad
                      <br />
                      Kerala, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="mt-1 text-[var(--brand-primary)]" />

                  <div>
                    <h3 className="font-semibold">
                      Phone
                    </h3>

                    <p>+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="mt-1 text-[var(--brand-primary)]" />

                  <div>
                    <h3 className="font-semibold">
                      Email
                    </h3>

                    <p>support@valo.app</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="mt-1 text-[var(--brand-primary)]" />

                  <div>
                    <h3 className="font-semibold">
                      Working Hours
                    </h3>

                    <p>
                      Monday – Saturday
                      <br />
                      9:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Social */}

            <div className="valo-card valo-transition p-8">

              <h2 className="mb-6 text-2xl font-bold">
                Follow Us
              </h2>

              <div className="flex gap-4">

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white transition hover:scale-110"
                >
                  <FaFacebookF size={22} />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-600 text-white transition hover:scale-110"
                >
                  <FaInstagram size={22} />
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white transition hover:scale-110"
                >
                  <FaYoutube size={22} />
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white transition hover:scale-110"
                >
                  <FaWhatsapp size={22} />
                </a>

              </div>

            </div>

            {/* Map */}

            <div className="flex h-72 items-center justify-center rounded-3xl border border-dashed border-[var(--border-default)] bg-[var(--bg-surface)]">
              <div className="text-center">
                <MapPin
                  size={40}
                  className="mx-auto mb-3 text-[var(--brand-primary)]"
                />
                <h3 className="font-semibold">
                  Google Map
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Interactive map coming soon
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}