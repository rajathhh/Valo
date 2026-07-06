import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FOOTER_LINKS, BRAND } from "@/config/constants";
import { Logo } from "./logo";
import { RouteDivider } from "@/components/marketing/route-divider";

const socials = [
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FaFacebook, label: "Facebook", href: "https://facebook.com" },
  { icon: FaXTwitter, label: "Twitter / X", href: "https://twitter.com" },
  { icon: FaYoutube, label: "YouTube", href: "https://youtube.com" },
];

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="mt-24 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <RouteDivider className="h-10 opacity-60" nodes={false} />
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-4 lg:px-8">
        <div className="grid grid-cols-2 gap-10 pb-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-[var(--text-secondary)]">{BRAND.taglineMl}</p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn heading={t("footer.servicesHeading")} links={FOOTER_LINKS.services} />
          <FooterColumn heading={t("footer.companyHeading")} links={FOOTER_LINKS.company} />
          <FooterColumn heading={t("footer.trustHeading")} links={FOOTER_LINKS.trust} />
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. {t("footer.rights")}
          </p>
          <p className="font-medium">{t("footer.madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold text-[var(--text-primary)]">{heading}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand-primary)]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
