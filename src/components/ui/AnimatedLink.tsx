import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Rolling-text label: the visible copy slides up and a duplicate slides in on hover/focus. */
export function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

type AnimatedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  external?: boolean;
};

export function AnimatedLink({ children, className, external, ...props }: AnimatedLinkProps) {
  return (
    <a
      className={cn("roll-host inline-flex", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <RollText>{children}</RollText>
    </a>
  );
}
