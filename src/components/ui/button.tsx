import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] font-body font-semibold transition-all duration-200 ease-[var(--ease-route)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--brand-primary)] text-white shadow-[var(--shadow-card)] hover:bg-[var(--brand-primary-hover)] hover:shadow-[var(--shadow-elevated)] focus-visible:ring-[var(--brand-primary)] active:scale-[0.98]",
        accent:
          "bg-[var(--brand-accent)] text-ink-950 shadow-[var(--shadow-card)] hover:brightness-95 focus-visible:ring-[var(--brand-accent)] active:scale-[0.98]",
        outline:
          "border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)] focus-visible:ring-[var(--brand-primary)]",
        ghost:
          "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)] focus-visible:ring-[var(--brand-primary)]",
        danger:
          "bg-[var(--color-laterite-500)] text-white hover:bg-[var(--color-laterite-600)] focus-visible:ring-[var(--color-laterite-500)]",
        link: "text-[var(--brand-primary)] underline-offset-4 hover:underline p-0 h-auto font-medium",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
