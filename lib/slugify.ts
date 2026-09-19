/** URL-safe id from a heading's text — shared by the MDX h2 renderer and the ToC. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Extracts `## ` headings from raw MDX for the table of contents. */
export function extractHeadings(mdx: string): { id: string; text: string }[] {
  return mdx
    .split("\n")
    .filter((line) => /^## /.test(line))
    .map((line) => {
      const text = line.replace(/^## /, "").replace(/[*_`]/g, "").trim();
      return { id: slugify(text), text };
    });
}
