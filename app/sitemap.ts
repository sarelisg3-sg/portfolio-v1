import type { MetadataRoute } from "next";
import { routing } from "@/lib/i18n/routing";
import { getProjectSlugs } from "@/lib/mdx";

const BASE_URL = "https://sarelisantiago.dev";

/** One entry per locale for the home, contact and every project page, with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/contact", ...getProjectSlugs().map((slug) => `/projects/${slug}`)];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/projects/") ? 0.8 : 0.5,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
