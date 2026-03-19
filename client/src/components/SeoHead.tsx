/**
 * SeoHead — Dynamically updates document title and meta tags from CMS
 */
import { useEffect } from "react";
import { useSeo } from "@/hooks/useCmsContent";

interface SeoHeadProps {
  pageKey: string;
  fallbackTitle: string;
  fallbackDescription?: string;
}

export default function SeoHead({ pageKey, fallbackTitle, fallbackDescription }: SeoHeadProps) {
  const seo = useSeo(pageKey);

  useEffect(() => {
    const title = seo?.title || fallbackTitle;
    const description = seo?.description || fallbackDescription || "";

    document.title = title;

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Update OG tags
    const ogTags: Record<string, string> = {
      "og:title": title,
      "og:description": description,
    };
    if (seo?.ogImage) {
      ogTags["og:image"] = seo.ogImage;
    }

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    });

    // Keywords
    if (seo?.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", seo.keywords);
    }
  }, [seo, fallbackTitle, fallbackDescription]);

  return null;
}
