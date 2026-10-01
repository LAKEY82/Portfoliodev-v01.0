import { useEffect, useRef } from "react";
import { profile } from "@/data/portfolio";

const format = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: profile.timeZone }).format(date);

/** Live local time. Updates the text node directly instead of re-rendering every tick. */
export function LocalTime({ className }: { className?: string }) {
  const ref = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    const update = () => {
      if (ref.current) ref.current.textContent = format(new Date());
    };
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return <time ref={ref} className={className} />;
}
