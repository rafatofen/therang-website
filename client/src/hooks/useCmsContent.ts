/**
 * Custom hooks for fetching CMS content from the database.
 * Falls back to hardcoded defaults if the API is unavailable.
 */
import { trpc } from "@/lib/trpc";

// ===== CONTENT HOOK =====
export function useSiteContent() {
  const { data: contentList, isLoading } = trpc.content.getAll.useQuery(undefined, {
    staleTime: 0,
    gcTime: 0,
    retry: 1,
  });

  const getContent = (sectionKey: string) => {
    if (!contentList) return null;
    return contentList.find((c: any) => c.sectionKey === sectionKey) || null;
  };

  return { contentList, getContent, isLoading };
}

// ===== TESTIMONIALS HOOK =====
export function useTestimonials() {
  const { data: testimonials, isLoading } = trpc.testimonials.getVisible.useQuery(undefined, {
    staleTime: 0,
    gcTime: 0,
    retry: 1,
  });

  return { testimonials: testimonials || [], isLoading };
}

// ===== PARTNERS HOOK =====
export function usePartners() {
  const { data: partners, isLoading } = trpc.partners.getVisible.useQuery(undefined, {
    staleTime: 0,
    gcTime: 0,
    retry: 1,
  });

  return { partners: partners || [], isLoading };
}

// ===== LINKS HOOK =====
export function useSiteLinks() {
  const { data: links, isLoading } = trpc.links.getAll.useQuery(undefined, {
    staleTime: 0,
    gcTime: 0,
    retry: 1,
  });

  const getLink = (linkKey: string): string => {
    if (!links) return "#";
    const link = links.find((l: any) => l.linkKey === linkKey);
    return link?.url || "#";
  };

  return { links, getLink, isLoading };
}

// ===== SEO HOOK =====
export function useSeo(pageKey: string) {
  const { data: seo } = trpc.seo.getByPage.useQuery({ pageKey }, {
    staleTime: 0,
    gcTime: 0,
    retry: 1,
  });

  return seo;
}
