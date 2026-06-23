import type { MetadataRoute } from "next";
import { publicMarketingPaths, siteUrl } from "./_lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicMarketingPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
}
