import type { ReactNode } from "react";
import { slugify } from "@/lib/slugify";
import { Figure } from "./Figure";
import { Screens } from "./Screens";
import { Metrics } from "./Metrics";
import { Callout } from "./Callout";
import { Quote } from "./Quote";
import { Video } from "./Video";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

/** h2 with a stable id so the table of contents can link to it. */
function H2({ children }: { children?: ReactNode }) {
  return (
    <h2 id={slugify(textOf(children))} className="scroll-mt-24">
      {children}
    </h2>
  );
}

export const mdxComponents = {
  h2: H2,
  Figure,
  Screens,
  Metrics,
  Callout,
  Quote,
  Video,
};
