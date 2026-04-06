/**
 * Space (New) — Photo-Focused Gallery Layout
 * Design: Geological Minimalism — full-bleed photography with minimal text overlays
 * All images are real Airbnb photos — NO AI-generated images
 * All images are CMS-editable with hardcoded fallbacks
 */

import { Link } from "wouter";
import PageSkeleton from "@/components/PageSkeleton";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useSiteContent, useSiteLinks } from "@/hooks/useCmsContent";

// CDN URLs — ALL REAL AIRBNB PHOTOS (fallback defaults)
const DEFAULTS = {
  HERO_POOL: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/hero_pool_view_1262a7be.jpeg",
  LIVING: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/living_room_1_1d0ea4f3.jpeg",
  KITCHEN: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/kitchen_18227ee9.jpeg",
  DINING: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/dining_area_e45aac0d.jpeg",
  MASTER_BED: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/bedroom_master_751b6a2d.jpeg",
  BED2: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/bedroom_2_4c60dfb0.jpeg",
  BED3: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/bedroom_3_d610517a.jpeg",
  BED4: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/bedroom_4_5b99d8eb.jpeg",
  BED5: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/bedroom_5_579018d2.jpeg",
  BATH_MASTER: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/bathroom_master_3bf20b91.jpeg",
  BATH2: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/bathroom_2_7eccbdc9.jpeg",
  BATH3: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/bathroom_3_544cdd47.jpeg",
  BATH4: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/bathroom_4_70748053.jpeg",
  BATH5: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/bathroom_5_e36810e6.jpeg",
  BATH_HALF1: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/bathroom_half_1_5beeaa63.jpeg",
  BATH_HALF2: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/bathroom_half_2_ab702d14.jpeg",
  BALCONY: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/balcony_1134c415.jpeg",
  DECK: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/deck_1d18e694.jpeg",
  POOL: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/pool_a63e1e38.jpeg",
  ADD1: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_1_69fa140a.jpeg",
  ADD2: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_2_9e6ce51b.jpeg",
  ADD3: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_3_9c61be4c.jpeg",
  ADD4: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_4_b8fbfef5.jpeg",
  ADD5: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_5_ad208b16.jpeg",
  ADD6: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_6_8405a088.jpeg",
  ADD7: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_7_8f92abce.jpeg",
  ADD8: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_8_84f7e0ce.jpeg",
  ADD9: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_9_176eae1a.jpeg",
  ADD10: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_10_24ef198e.jpeg",
  ADD11: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_11_80730ed0.jpeg",
  ADD12: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_12_927d3d29.jpeg",
  ADD13: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_13_0fba4a02.jpeg",
  ADD14: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_14_45d37618.jpeg",
  ADD15: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/additional_15_799aa50a.jpeg",
  GARAGE: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/garage_6fb8738e.jpeg",
};

function GalleryImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <motion.div
      className={`relative overflow-hidden group cursor-pointer ${className}`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
    </motion.div>
  );
}

export default function SpaceNew() {
  const { getContent, isLoading } = useSiteContent();
  const { getLink } = useSiteLinks();
  const airbnbLink = getLink("airbnb") !== "#" ? getLink("airbnb") : "https://www.airbnb.com.au/rooms/1625996459378222841";

  // Helper: get imageUrl from CMS or fallback
  const img = (sectionKey: string, fallback: string): string => {
    return getContent(sectionKey)?.imageUrl || fallback;
  };

  // Helper: get text field from CMS or fallback
  const txt = (sectionKey: string, field: "title" | "subtitle", fallback: string): string => {
    const c = getContent(sectionKey);
    if (!c) return fallback;
    return (c as any)[field] || fallback;
  };

  /* ---- Section data — all CMS-editable ---- */
  const sections = [
    {
      id: "overview",
      label: "01",
      title: txt("space.overview", "title", "The Villa"),
      subtitle: txt("space.overview", "subtitle", "500+ sqm of sculptural living"),
      hero: img("space.overview", DEFAULTS.HERO_POOL),
      grid: [
        img("space.overview_g1", DEFAULTS.ADD2),
        img("space.overview_g2", DEFAULTS.ADD1),
        img("space.overview_g3", DEFAULTS.ADD3),
        img("space.overview_g4", DEFAULTS.ADD4),
      ],
    },
    {
      id: "pool",
      label: "02",
      title: txt("space.pool", "title", "Infinity Pool & Deck"),
      subtitle: txt("space.pool", "subtitle", "25-meter lap pool with hand-cut marble"),
      hero: img("space.pool", DEFAULTS.POOL),
      grid: [
        img("space.pool_g1", DEFAULTS.DECK),
        img("space.pool_g2", DEFAULTS.ADD5),
        img("space.pool_g3", DEFAULTS.ADD10),
        img("space.pool_g4", DEFAULTS.ADD1),
      ],
    },
    {
      id: "living",
      label: "03",
      title: txt("space.living", "title", "Living & Dining"),
      subtitle: txt("space.living", "subtitle", "Sunken lounge, open-plan dining, and indoor-outdoor flow"),
      hero: img("space.living", DEFAULTS.LIVING),
      grid: [
        img("space.living_g1", DEFAULTS.DINING),
        img("space.living_g2", DEFAULTS.KITCHEN),
        img("space.living_g3", DEFAULTS.ADD8),
        img("space.living_g4", DEFAULTS.ADD6),
      ],
    },
    {
      id: "master",
      label: "04",
      title: txt("space.master", "title", "Master Suite"),
      subtitle: txt("space.master", "subtitle", "Ocean and volcano views from your bed"),
      hero: img("space.master", DEFAULTS.MASTER_BED),
      grid: [
        img("space.master_g1", DEFAULTS.BALCONY),
        img("space.master_g2", DEFAULTS.BATH_MASTER),
        img("space.master_g3", DEFAULTS.ADD7),
        img("space.master_g4", DEFAULTS.BED3),
        img("space.master_g5", DEFAULTS.BED4),
        img("space.master_g6", DEFAULTS.BED5),
      ],
    },
    {
      id: "bedrooms",
      label: "05",
      title: txt("space.bedrooms", "title", "Guest Bedrooms"),
      subtitle: txt("space.bedrooms", "subtitle", "Four beautifully appointed rooms with en-suite bathrooms"),
      hero: img("space.bedrooms", DEFAULTS.BED2),
      grid: [
        img("space.bedrooms_g1", DEFAULTS.BED3),
        img("space.bedrooms_g2", DEFAULTS.BED4),
        img("space.bedrooms_g3", DEFAULTS.BED5),
        img("space.bedrooms_g4", DEFAULTS.BATH2),
        img("space.bedrooms_g5", DEFAULTS.BATH3),
        img("space.bedrooms_g6", DEFAULTS.BATH4),
      ],
    },
    {
      id: "wellness",
      label: "06",
      title: txt("space.wellness", "title", "Wellness & Outdoor"),
      subtitle: txt("space.wellness", "subtitle", "Sauna, ice bath, outdoor showers, and private beach stairs"),
      hero: img("space.wellness", DEFAULTS.ADD9),
      grid: [
        img("space.wellness_g1", DEFAULTS.ADD11),
        img("space.wellness_g2", DEFAULTS.ADD12),
        img("space.wellness_g3", DEFAULTS.ADD13),
      ],
    },
  ];

  if (isLoading) return <PageSkeleton />;
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <img
          src={img("space.overview", DEFAULTS.HERO_POOL)}
          alt="The Rang Uluwatu villa overview"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-12 lg:pb-16 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 text-[11px] tracking-[0.35em] uppercase font-medium mb-3"
          >
            {getContent("space.intro")?.subtitle || "The Villa — A Detailed Exploration"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.1]"
          >
            {getContent("space.intro")?.title || "The Space"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/60 text-base md:text-lg mt-4 max-w-xl leading-relaxed"
          >
            {getContent("space.intro")?.body || "Five bedrooms, 500+ sqm of sculptural living, perched on Uluwatu's most dramatic cliff."}
          </motion.p>
        </div>
      </section>

      {/* ===== QUICK NAV ===== */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-8 py-4 min-w-max">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-[11px] tracking-[0.2em] uppercase text-black/40 hover:text-black transition-colors whitespace-nowrap"
              >
                <span className="text-black/20 mr-1.5">{s.label}</span>
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ===== SECTIONS ===== */}
      {sections.map((section, sIdx) => (
        <section key={section.id} id={section.id} className="scroll-mt-16">
          {/* Section label + title */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-8 lg:pt-28 lg:pb-12">
            <ScrollReveal>
              <span className="text-[11px] tracking-[0.3em] uppercase text-black/30 font-medium">
                {section.label} — {section.title}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mt-3 mb-3 tracking-tight leading-[1.15]">
                {section.title}
              </h2>
              <p className="text-black/50 text-[15px] max-w-xl leading-relaxed">
                {section.subtitle}
              </p>
            </ScrollReveal>
          </div>

          {/* Hero image — full bleed */}
          <ScrollReveal>
            <div className="w-full">
              <GalleryImage
                src={section.hero}
                alt={section.title}
                className="w-full aspect-[16/7] md:aspect-[16/6]"
              />
            </div>
          </ScrollReveal>

          {/* Grid gallery — varies by section */}
          <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-4">
            {section.grid.length <= 3 ? (
              /* 3-column layout */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {section.grid.map((imgUrl, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <GalleryImage
                      src={imgUrl}
                      alt={`${section.title} ${i + 1}`}
                      className="aspect-[4/3]"
                    />
                  </ScrollReveal>
                ))}
              </div>
            ) : section.grid.length === 4 ? (
              /* 2x2 layout */
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {section.grid.map((imgUrl, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <GalleryImage
                      src={imgUrl}
                      alt={`${section.title} ${i + 1}`}
                      className="aspect-[4/3]"
                    />
                  </ScrollReveal>
                ))}
              </div>
            ) : section.grid.length === 6 ? (
              /* 2x3 layout — single grid, 2 cols mobile, 3 cols desktop */
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {section.grid.map((imgUrl, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <GalleryImage
                      src={imgUrl}
                      alt={`${section.title} ${i + 1}`}
                      className="aspect-[4/3]"
                    />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              /* Mixed masonry for 5, 7+ images */
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {section.grid.slice(0, 3).map((imgUrl, i) => (
                    <ScrollReveal key={i} delay={i * 0.08}>
                      <GalleryImage
                        src={imgUrl}
                        alt={`${section.title} ${i + 1}`}
                        className="aspect-[4/3]"
                      />
                    </ScrollReveal>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-3 md:mt-4">
                  {section.grid.slice(3).map((imgUrl, i) => (
                    <ScrollReveal key={i} delay={i * 0.08}>
                      <GalleryImage
                        src={imgUrl}
                        alt={`${section.title} detail ${i + 1}`}
                        className="aspect-square"
                      />
                    </ScrollReveal>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thin divider between sections */}
          {sIdx < sections.length - 1 && (
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
              <hr className="border-black/5" />
            </div>
          )}
        </section>
      ))}

      {/* ===== BOOKING CTA ===== */}
      <section className="relative mt-12">
        <div
          className="relative h-[500px] lg:h-[600px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${getContent("space.cta")?.imageUrl || DEFAULTS.HERO_POOL})` }}
        >
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 text-center px-6 max-w-2xl">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-tight mb-6">
                {getContent("space.cta")?.title || "Experience The Rang"}
              </h2>
              <hr className="section-divider-white mx-auto" />
              <p className="text-white/60 leading-[1.8] text-[15px] max-w-xl mx-auto mb-10">
                {getContent("space.cta")?.body || "Ready for an unforgettable stay? Book your escape to The Rang Uluwatu and discover luxury living on Bali's most dramatic coastline."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={airbnbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-white"
                >
                  Book on Airbnb
                </a>
                <a
                  href="https://wa.me/61403712311?text=Hi%2C+I'm+interested+in+booking+The+Rang+Uluwatu.+Could+you+help+me+with+availability+and+rates%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-white"
                >
                  Book Direct
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
