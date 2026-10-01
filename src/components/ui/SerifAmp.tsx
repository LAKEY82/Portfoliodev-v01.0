import { Fragment } from "react";

/** Renders "&" in the editorial serif italic, which reads better than the grotesk ampersand. */
export function SerifAmp({ text }: { text: string }) {
  const parts = text.split("&");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <span className="type-serif">&amp;</span>}
        </Fragment>
      ))}
    </>
  );
}
