import type { ReactNode } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
  className?: string;
};

/** Editorial section opener: hairline + index/label metadata, then an oversized title. */
export function SectionHeader({ index, label, title, aside, className }: SectionHeaderProps) {
  return (
    <header className={cn("mb-14 md:mb-24", className)}>
      <Reveal className="type-meta mb-8 flex items-center justify-between border-t border-line pt-4 text-muted md:mb-12">
        <span>
          ({index}) — {label}
        </span>
        {aside}
      </Reveal>
      <RevealText as="h2" className="type-display text-section">
        {title}
      </RevealText>
    </header>
  );
}
