import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

interface PageMetadataInput {
  title: string;
  description: string;
  image?: string;
  path?: string;
}

export function buildMetadata({
  title,
  description,
  image,
  path,
}: PageMetadataInput): Metadata {
  const ogImage = image ?? siteConfig.defaultOgImage;

  return {
    title,
    description,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage }],
      siteName: siteConfig.name,
      locale: "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
