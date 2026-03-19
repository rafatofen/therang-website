/**
 * Space Page — The Villa: A Detailed Exploration
 * Design: Geological Minimalism — alternating image/text sections
 * All images are editable from the admin CMS.
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { useSiteContent } from "@/hooks/useCmsContent";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37";

// Fallback defaults (used only when CMS has no data)
const DEFAULTS = {
  hero: `${CDN}/hero_pool_view_1262a7be.jpeg`,
  master: `${CDN}/bedroom_master_751b6a2d.jpeg`,
  master_img2: `${CDN}/balcony_1134c415.jpeg`,
  master_img3: `${CDN}/bathroom_master_3bf20b91.jpeg`,
  bedrooms: `${CDN}/bedroom_2_4c60dfb0.jpeg`,
  bedrooms_img2: `${CDN}/bedroom_3_d610517a.jpeg`,
  bedrooms_img3: `${CDN}/bedroom_4_5b99d8eb.jpeg`,
  living: `${CDN}/living_room_1_1d0ea4f3.jpeg`,
  living_img2: `${CDN}/additional_1_69fa140a.jpeg`,
  living_img3: `${CDN}/dining_area_e45aac0d.jpeg`,
  kitchen: `${CDN}/kitchen_18227ee9.jpeg`,
  wellness: `${CDN}/luxury-sauna-wellness-J6g6hBg6657XkKUcSNjxro.webp`,
  pool: `${CDN}/infinity-pool-ocean-acCdzZRHLqou6ZYkfrkQ79.webp`,
  pool_img2: `${CDN}/pool_a63e1e38.jpeg`,
  outdoor: `${CDN}/deck_1d18e694.jpeg`,
  outdoor_img2: `${CDN}/additional_5_ad208b16.jpeg`,
};

interface SpaceSectionProps {
  index: string;
  title: string;
  description: string;
  features: string[];
  images: { src: string; alt: string }[];
  reversed?: boolean;
}

function SpaceSection({ index, title, description, features, images, reversed }: SpaceSectionProps) {
  const imageBlock = (
    <ScrollReveal direction={reversed ? "right" : "left"}>
      <div>
        {images.length === 1 ? (
          <img src={images[0].src} alt={images[0].alt} className="w-full aspect-[4/3] object-cover" />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
              />
            ))}
          </div>
        )}
      </div>
    </ScrollReveal>
  );

  const textBlock = (
    <ScrollReveal direction={reversed ? "left" : "right"} delay={0.2}>
      <div>
        <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">
          {index}
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-light mt-3 mb-5 tracking-tight leading-[1.15]">
          {title}
        </h2>
        <hr className="section-divider" />
        <p className="text-black/60 leading-[1.8] text-[15px] mb-6">
          {description}
        </p>
        <div className="space-y-2">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-black mt-2.5 shrink-0" />
              <p className="text-black/50 text-sm">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );

  return (
    <section className={`section-spacing ${reversed ? "bg-[#FAFAF8]" : "bg-white"}`}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {reversed ? (
            <>
              {textBlock}
              {imageBlock}
            </>
          ) : (
            <>
              {imageBlock}
              {textBlock}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Space() {
  const { getContent } = useSiteContent();

  // Helper to get image URL from CMS with fallback
  const img = (sectionKey: string, fallback: string) => {
    const cms = getContent(sectionKey);
    return cms?.imageUrl || fallback;
  };

  // Hero
  const overview = getContent("space.overview");
  const heroImage = overview?.imageUrl || DEFAULTS.hero;

  return (
    <div className="min-h-screen">
      <Navbar />

      <PageHero
        title={overview?.title || "The Villa"}
        subtitle={overview?.subtitle || "A five-bedroom freehold villa spanning over 500+ sqm of living space, meticulously designed to offer unparalleled luxury and comfort."}
        image={heroImage}
      />

      {/* Introduction */}
      <section className="section-spacing bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6 tracking-tight">
                A Detailed Exploration
              </h2>
              <hr className="section-divider mx-auto" />
              <p className="text-black/60 leading-[1.8] text-[15px]">
                The Rang is a five-bedroom freehold villa spanning over 500+ sqm of living space, meticulously designed to offer unparalleled luxury and comfort. Every corner of the villa reflects a commitment to sculptural elegance and natural harmony.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SpaceSection
        index="01 — Master Suite"
        title="Master Suite"
        description="The expansive Master Suite offers breathtaking ocean and volcano views, complemented by a private wrap-around balcony. Designed as a serene retreat, it features a king-sized bed, a comfortable lounge area, and direct access to the main terrace."
        features={[
          "King-sized bed with premium King Koil mattress",
          "Ocean and volcano views",
          "Private wrap-around balcony",
          "Lounge area with smart TV",
          "Luxurious bathroom with double sinks, bathtub, and walk-in shower",
        ]}
        images={[
          { src: img("space.master", DEFAULTS.master), alt: "Master Suite Bedroom" },
          { src: img("space.master_img2", DEFAULTS.master_img2), alt: "Master Suite Balcony" },
          { src: img("space.master_img3", DEFAULTS.master_img3), alt: "Master Bathroom" },
        ]}
      />

      <SpaceSection
        index="02 — Guest Bedrooms"
        title="Guest Bedrooms"
        description="Four additional guest bedrooms are thoughtfully appointed, each offering comfort and privacy. These rooms feature either king or twin beds, en-suite bathrooms, and views of either the lush gardens or the ocean."
        features={[
          "King or twin bed configurations",
          "En-suite bathrooms with double sinks",
          "Garden or ocean views",
          "Premium linens and smart TVs",
        ]}
        images={[
          { src: img("space.bedrooms", DEFAULTS.bedrooms), alt: "Guest Bedroom 1" },
          { src: img("space.bedrooms_img2", DEFAULTS.bedrooms_img2), alt: "Guest Bedroom 2" },
          { src: img("space.bedrooms_img3", DEFAULTS.bedrooms_img3), alt: "Guest Bedroom 3" },
        ]}
        reversed
      />

      <SpaceSection
        index="03 — Living Areas"
        title="Living Areas"
        description="The Rang boasts expansive indoor and outdoor living areas designed for relaxation and entertainment. The main living room features comfortable seating, high ceilings, and seamless integration with the outdoor spaces. A second sunken lounge sits at the heart of the villa."
        features={[
          "Main living room with smart TV",
          "Sunken lounge for intimate conversations",
          "Multiple terraces and lounge areas",
          "Dining area seating ten guests",
        ]}
        images={[
          { src: img("space.living", DEFAULTS.living), alt: "Main Living Room" },
          { src: img("space.living_img2", DEFAULTS.living_img2), alt: "Outdoor Terrace" },
          { src: img("space.living_img3", DEFAULTS.living_img3), alt: "Dining Area" },
        ]}
      />

      <SpaceSection
        index="04 — Kitchen"
        title="Kitchen"
        description="A fully equipped modern kitchen with state-of-the-art appliances, perfect for culinary enthusiasts or private chef services. The spacious design includes ample counter space and an island seating area."
        features={[
          "High-end appliances",
          "Ample counter space",
          "Island seating",
          "Built-in ice maker and large refrigerator",
        ]}
        images={[{ src: img("space.kitchen", DEFAULTS.kitchen), alt: "Kitchen" }]}
        reversed
      />

      <SpaceSection
        index="05 — Wellness"
        title="Wellness Facilities"
        description="Indulge in the villa's private wellness amenities, including a custom-built sauna and a professional ice bath, designed for rejuvenation and relaxation after a day of surfing or exploring."
        features={[
          "Premium hardwood sauna",
          "Professional ice bath",
          "Outdoor shower",
          "Post-surf recovery area",
        ]}
        images={[{ src: img("space.wellness", DEFAULTS.wellness), alt: "Sauna and Wellness" }]}
      />

      <SpaceSection
        index="06 — Infinity Pool"
        title="Infinity Pool"
        description="The centerpiece of the outdoor area is the 25-meter lap pool, finished with exquisite hand-cut marble tiles, offering stunning ocean views. A sunken pool lounge with in-pool bar creates the perfect relaxation spot."
        features={[
          "25-meter infinity lap pool",
          "Hand-cut marble tile finish",
          "Sunken pool lounge area",
          "In-pool bar",
          "Panoramic ocean views",
        ]}
        images={[
          { src: img("space.pool", DEFAULTS.pool), alt: "Infinity Pool" },
          { src: img("space.pool_img2", DEFAULTS.pool_img2), alt: "Pool Detail" },
        ]}
        reversed
      />

      <SpaceSection
        index="07 — Outdoor Spaces"
        title="Outdoor Spaces"
        description="Beyond the pool, discover various outdoor areas including sun decks, shaded lounges, and beautifully landscaped gardens that blend with the native flora."
        features={[
          "Sun decks with loungers",
          "Shaded outdoor lounge areas",
          "Landscaped tropical gardens",
          "Private staircase toward Suluban Beach",
        ]}
        images={[
          { src: img("space.outdoor", DEFAULTS.outdoor), alt: "Deck Area" },
          { src: img("space.outdoor_img2", DEFAULTS.outdoor_img2), alt: "Garden Area" },
        ]}
      />

      {/* CTA */}
      <section className="bg-black text-white section-spacing">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-6 tracking-tight">
              Ready to Experience The Rang?
            </h2>
            <hr className="section-divider-white mx-auto" />
            <p className="text-white/60 leading-[1.8] text-[15px] max-w-xl mx-auto mb-10">
              Book your unforgettable stay directly through Airbnb and discover luxury living on Bali's most dramatic coastline.
            </p>
            <a
              href="https://www.airbnb.com.au/rooms/1625996459378222841"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white"
            >
              Book on Airbnb
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
