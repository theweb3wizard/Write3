import type { MetadataRoute } from "next";
import { getAppUrl } from "@/lib/utils/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = getAppUrl();

  return [
    { url: appUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${appUrl}/pricing`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${appUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${appUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${appUrl}/refund`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${appUrl}/llms.txt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];
}
