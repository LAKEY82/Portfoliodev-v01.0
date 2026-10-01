import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { RollText } from "@/components/ui/AnimatedLink";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline";

type CommonProps = { children: ReactNode; variant?: Variant; className?: string; arrow?: boolean };
type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/** Arrow that exits top-right and re-enters bottom-left on hover. */
export function ArrowSwap({ className }: { className?: string }) {
  return (
    <span className={cn("arrow-swap", className)} aria-hidden="true">
      <ArrowUpRight className="h-full w-full" strokeWidth={1.5} />
      <ArrowUpRight className="h-full w-full" strokeWidth={1.5} />
    </span>
  );
}

const base =
  "roll-host group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border px-6 py-3.5 text-sm font-medium tracking-tight transition-colors duration-500 ease-expo " +
  // fill that rises from the bottom on hover
  "before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:rounded-[inherit] before:transition-transform before:duration-500 before:ease-expo hover:before:scale-y-100 focus-visible:before:scale-y-100 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid: "border-accent bg-accent text-accent-fg before:bg-fg hover:text-bg focus-visible:text-bg",
  outline: "border-[color:var(--line-strong)] text-fg before:bg-accent hover:border-accent hover:text-accent-fg focus-visible:text-accent-fg",
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "outline", className, arrow = true, ...rest } = props;
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      <RollText>{children}</RollText>
      {arrow && <ArrowSwap className="h-4 w-4" />}
    </>
  );

  if (typeof rest.href === "string") {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
