import type { MetadataRoute } from "next";
import { getAppUrl } from "@/lib/utils/url";

export default function robots(): MetadataRoute.Robots {
  const appUrl = getAppUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api", "/auth", "/dashboard", "/settings", "/generate", "/library", "/analytics", "/projects", "/voice-training"],
    },
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
