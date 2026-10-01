/**
 * Faint 12-column guides behind the page, aligned to the layout grid (gutter + gap-x-6).
 * Gives the editorial structure a visible rhythm; panels with their own background cover it.
 * Desktop only — on small screens the lines just add noise.
 */
export function ColumnGuides() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 hidden lg:block">
      <div className="gutter grid h-full grid-cols-12 gap-x-6">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={
              i % 3 === 0
                ? "border-l border-[color:var(--line)] opacity-60"
                : i === 11
                  ? "border-r border-[color:var(--line)] opacity-60"
                  : ""
            }
          />
        ))}
      </div>
    </div>
  );
}
