import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rakshitr.co.in";
  return [{ url: baseUrl, changeFrequency: "monthly", priority: 1 }];
}
