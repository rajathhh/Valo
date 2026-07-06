import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RouteDivider } from "./route-divider";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-10">
          <h3 className="font-display text-2xl font-medium text-[var(--text-primary)]">Drive with VALO</h3>
          <p className="mt-3 text-[var(--text-secondary)]">
            Set your own hours, keep more of every fare, and get paid out daily to your VALO Wallet.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/driver">
              Start earning <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-10">
          <h3 className="font-display text-2xl font-medium text-[var(--text-primary)]">List your business</h3>
          <p className="mt-3 text-[var(--text-secondary)]">
            Homestays, houseboats, and local experiences — reach travellers across all 14 districts.
          </p>
          <Link href="/driver">
  <Button className="mt-6">
    Start earning <ArrowRight className="size-4" />
  </Button>
</Link>
        </div>
      </div>
      <RouteDivider className="mt-16 h-8 opacity-40" nodes={false} />
    </section>
  );
}
