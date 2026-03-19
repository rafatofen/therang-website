/**
 * Home Page — The Rang Uluwatu
 * Reads ALL content from the CMS database with hardcoded fallbacks.
 * Features, gallery images, hero video — everything is editable from admin.
 */

import { Link } from "wouter";
import PageSkeleton from "@/components/PageSkeleton";
import { motion } from "framer-motion";
import { ArrowDown, Star, MapPin, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SeoHead from "@/components/SeoHead";
import { useSiteContent, useTestimonials, usePartners, useSiteLinks } from "@/hooks/useCmsContent";

// CDN URLs (fallback defaults — used only when CMS has no data)
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37";
const VIDEO_URL_DEFAULT = `${CDN}/hero-video_b6863f29.mp4`;
const HERO_POOL = `${CDN}/hero_pool_view_1262a7be.jpeg`;
const ADD2_EXTERIOR = `${CDN}/additional_2_9e6ce51b.jpeg`;
const ADD1_TERRACE = `${CDN}/additional_1_69fa140a.jpeg`;
const CLIFF_AERIAL = `${CDN}/uluwatu-cliff-aerial-oNZekmYsnH9nNSqa8KvQJT.webp`;
const SUNSET = `${CDN}/bali-ocean-sunset-Z9rMjV67zYWT98s87jGFhB.webp`;
const POOL = `${CDN}/pool_a63e1e38.jpeg`;
const LIVING = `${CDN}/living_room_1_1d0ea4f3.jpeg`;
const MASTER_BED = `${CDN}/bedroom_master_751b6a2d.jpeg`;
const KITCHEN = `${CDN}/kitchen_18227ee9.jpeg`;
const DINING = `${CDN}/dining_area_e45aac0d.jpeg`;
const BALCONY = `${CDN}/balcony_1134c415.jpeg`;
const INFINITY_POOL_GEN = `${CDN}/infinity-pool-ocean-acCdzZRHLqou6ZYkfrkQ79.webp`;
const SAUNA = `${CDN}/luxury-sauna-wellness-J6g6hBg6657XkKUcSNjxro.webp`;
const ADD4 = `${CDN}/additional_4_b8fbfef5.jpeg`;
const ADD5 = `${CDN}/additional_5_ad208b16.jpeg`;
const ADD8 = `${CDN}/additional_8_84f7e0ce.jpeg`;
const ADD10 = `${CDN}/additional_10_24ef198e.jpeg`;

// Fallback feature data
const defaultFeatures = [
  { title: "Modern Design", desc: "Sculptural architecture by Steven Kunz, with a curved façade unlike any other in Uluwatu.", image: ADD2_EXTERIOR },
  { title: "Infinity Pool", desc: "A stunning 25-meter lap pool finished with hand-cut marble tiling.", image: INFINITY_POOL_GEN },
  { title: "Wellness", desc: "Custom-built sauna crafted from premium hardwoods and a professional ice bath.", image: SAUNA },
  { title: "Ocean Views", desc: "Elevated ocean views overlooking the Uluwatu surf break \"Race Tracks.\"", image: BALCONY },
  { title: "Beach Access", desc: "Private staircase access toward Suluban Beach with paddle access to iconic breaks.", image: CLIFF_AERIAL },
  { title: "Comfort", desc: "Full double-glazed system for thermal efficiency and a quiet, meditative interior.", image: LIVING },
  { title: "Natural Aesthetic", desc: "Extensive use of local natural stone, creating a grounded and organic aesthetic.", image: ADD4 },
  { title: "Indoor-Outdoor Flow", desc: "Expansive indoor–outdoor living with multiple terraces and lounge areas.", image: ADD1_TERRACE },
];

const defaultTestimonials = [
  { name: "Adi Priantana", source: "Google", text: "This villa exceeded all our expectations. The view of the ocean from the living area and pool is incredible. With 5 bedrooms, it was perfect for our group and gave everyone plenty of space and privacy. The atmosphere is relaxing and luxurious at the same time. The staff were kind and very helpful. It truly felt like a home away from home. One of the best villas we have ever stayed in!", rating: 5 },
  { name: "Enrico", source: "Google", text: "Was lucky enough to spend a full week at The Rang. Best holiday accommodation I've ever been. Hands down! Coming to this villa feels like coming home! Great design, high-quality materials, nice colors, amazing details and an amazing view from every corner of the house! You can tell that someone has really put his mind and heart into every detail of this masterpiece to give you a 5-star experience!", rating: 5 },
  { name: "Eric Schmidt", source: "Google", text: "An incredibly beautiful house in Uluwatu, Bali. The location is truly unique. We spent 7 days here with friends and family and had an amazing time. Each bedroom is very well equipped, similar to what you would expect in a 5-star hotel. The house management and cleaning staff are friendly, professional, and truly wonderful people to have around. Overall, we highly recommend it.", rating: 5 },
];

const defaultPartners = [
  { name: "Yuki", type: "Japanese Restaurant", perk: "15% lunch discount" },
  { name: "Avli", type: "Greek Restaurant", perk: "10% discount + 1 complimentary drink" },
  { name: "Studio Fondue", type: "Pilates & Recovery", perk: "20% off with code RANG20" },
  { name: "Ulu Active", type: "Gym & Recovery", perk: "Exclusive guest access" },
  { name: "Teja", type: "Modern European", perk: "Priority reservations" },
];

const defaultGalleryImages = [HERO_POOL, MASTER_BED, KITCHEN, DINING, POOL, ADD1_TERRACE, ADD5, ADD10];

export default function Home() {
  const { getContent, isLoading } = useSiteContent();
  const { testimonials: dbTestimonials } = useTestimonials();
  const { partners: dbPartners } = usePartners();
  const { getLink } = useSiteLinks();

  // Get CMS content with fallbacks
  const hero = getContent("home.hero");
  const heroVideo = getContent("home.hero_video");
  const philosophy = getContent("home.philosophy");
  const experience = getContent("home.experience");
  const location = getContent("home.location");
  const bookingCta = getContent("home.booking");

  // Build features from CMS or fallback
  const features = defaultFeatures.map((df, i) => {
    const cms = getContent(`home.feature_${i + 1}`);
    return {
      title: cms?.title || df.title,
      desc: cms?.body || df.desc,
      image: cms?.imageUrl || df.image,
    };
  });

  // Build gallery from CMS or fallback
  const galleryImages = defaultGalleryImages.map((defaultImg, i) => {
    const cms = getContent(`home.gallery_${i + 1}`);
    return cms?.imageUrl || defaultImg;
  });

  // Hero video URL from CMS or fallback
  const videoUrl = heroVideo?.imageUrl || VIDEO_URL_DEFAULT;
  const heroPoster = hero?.imageUrl || HERO_POOL;

  // Use DB testimonials or fallback
  const testimonials = dbTestimonials.length > 0
    ? dbTestimonials.map((t: any) => ({ name: t.name, source: t.source, text: t.text, rating: t.rating }))
    : defaultTestimonials;

  // Use DB partners or fallback
  const partners = dbPartners.length > 0
    ? dbPartners.map((p: any) => ({ name: p.name, type: p.type, perk: p.perk }))
    : defaultPartners;

  // Dynamic links with fallbacks
  const airbnbLink = getLink("airbnb") !== "#" ? getLink("airbnb") : "https://www.airbnb.com.au/rooms/1625996459378222841";
  const reviewsLink = getLink("google_reviews") !== "#" ? getLink("google_reviews") : "https://share.google/8bJHJBoHSHolISFu5";

  if (isLoading) return <PageSkeleton />;
  return (
    <div className="min-h-screen">
      <SeoHead
        pageKey="home"
        fallbackTitle="The Rang Uluwatu — Luxury Villa in Bali"
        fallbackDescription="A sculptural, coastal masterpiece perched above the Indian Ocean on Uluwatu's dramatic cliffs."
      />
      <Navbar />

      {/* ===== SECTION 1: HERO VIDEO ===== */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={heroPoster}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-white/60 text-[11px] tracking-[0.35em] uppercase font-medium mb-4"
          >
            {hero?.subtitle || "Uluwatu, Bali"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-light tracking-tight leading-[1.1]"
          >
            {hero?.title || "THE RANG"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-white/70 text-sm md:text-base tracking-[0.1em] mt-4 max-w-lg mx-auto"
          >
            {hero?.body || "A Sculptural, Coastal Masterpiece"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link href="/space" className="btn-outline-white">
              {hero?.buttonText || "Explore the Space"}
            </Link>
            <a
              href={airbnbLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white"
            >
              Make your Booking
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="text-white/50" size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SECTION 2: CONCEPT & PHILOSOPHY ===== */}
      <section className="section-spacing bg-[#FAFAF8]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <img
                  src={philosophy?.imageUrl || ADD2_EXTERIOR}
                  alt="The Rang exterior architecture"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-black/10 hidden lg:block" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="lg:pl-4">
                <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">
                  01 — Philosophy
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mt-4 mb-6 tracking-tight leading-[1.15]">
                  {philosophy?.title || <>A Home Shaped by<br />Land, Light, and Return</>}
                </h2>
                <hr className="section-divider" />
                <div className="text-black/60 leading-[1.8] text-[15px] mb-8 whitespace-pre-line">
                  {philosophy?.body || "The Rang is more than a name — it's a philosophy captured in architecture."}
                </div>
                <Link href="/space" className="btn-outline">
                  {philosophy?.buttonText || "Our Philosophy"}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: EXPERIENCE LUXURY ===== */}
      <section className="section-spacing bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
              <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">
                02 — Experience
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mt-4 mb-6 tracking-tight">
                {experience?.title || "Experience Unrivaled Luxury"}
              </h2>
              <hr className="section-divider mx-auto" />
              <p className="text-black/60 leading-[1.8] text-[15px]">
                {experience?.body || "Designed as a contemporary sanctuary with timeless appeal."}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.slice(0, 4).map((feature, i) => (
              <ScrollReveal key={feature.title + i} delay={i * 0.1}>
                <div className="group">
                  <div className="relative overflow-hidden aspect-[3/4] mb-5">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-black/50 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {features.slice(4).map((feature, i) => (
              <ScrollReveal key={feature.title + i} delay={i * 0.1}>
                <div className="group">
                  <div className="relative overflow-hidden aspect-[3/4] mb-5">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-black/50 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-14">
              <Link href="/space" className="btn-outline">
                Detailed View
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SECTION 4: LOCATION ===== */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <div className="relative h-[400px] lg:h-auto">
            <img
              src={location?.imageUrl || CLIFF_AERIAL}
              alt="Uluwatu cliffs aerial view"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="bg-black text-white flex items-center">
            <div className="px-8 md:px-16 lg:px-20 py-16 lg:py-24">
              <ScrollReveal>
                <span className="text-[11px] tracking-[0.3em] uppercase text-white/40 font-medium">
                  03 — Location
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mt-4 mb-6 tracking-tight leading-[1.15]">
                  {location?.title || <>Perched Above the<br />Indian Ocean</>}
                </h2>
                <hr className="section-divider-white" />
                <div className="text-white/60 leading-[1.8] text-[15px] mb-8 whitespace-pre-line">
                  {location?.body || "Located in the Bahari Complex on Suluban Cliff."}
                </div>
                <Link href="/location" className="btn-outline-white">
                  {location?.buttonText || "View the Map"}
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: TESTIMONIALS ===== */}
      <section className="section-spacing bg-[#FAFAF8]">
        <div className="container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">
                04 — Testimonials
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mt-4 mb-6 tracking-tight">
                What Our Guests Say
              </h2>
              <hr className="section-divider mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.map((t: any, i: number) => (
              <ScrollReveal key={t.name} delay={i * 0.15}>
                <div className="border border-black/10 p-8 lg:p-10 bg-white">
                  <Quote className="text-black/10 mb-4" size={32} />
                  <p className="text-black/60 leading-[1.8] text-[15px] mb-6 italic font-serif">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-black text-black" />
                    ))}
                  </div>
                  <p className="text-sm font-medium tracking-wide">{t.name}</p>
                  <p className="text-[11px] text-black/40 tracking-wide mt-1">{t.source} Review</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <a
                href={reviewsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Read All Reviews
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SECTION 6: PARTNERS ===== */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <img
                  src={ADD8}
                  alt="Dining experience near The Rang"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">
                  05 — Partners
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mt-4 mb-6 tracking-tight leading-[1.15]">
                  Exclusive Guest Perks
                </h2>
                <hr className="section-divider" />
                <div className="space-y-5 mb-8">
                  {partners.map((p: any) => (
                    <div key={p.name} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{p.name} <span className="text-black/40">— {p.type}</span></p>
                        <p className="text-black/50 text-sm">{p.perk}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/partners" className="btn-outline">
                  Guest Exclusive Perks
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: MAP & BOOKING CTA ===== */}
      <section className="relative">
        <div
          className="relative h-[500px] lg:h-[600px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${bookingCta?.imageUrl || SUNSET})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center px-6">
            <ScrollReveal>
              <span className="text-[11px] tracking-[0.3em] uppercase text-white/40 font-medium">
                06 — Book Your Stay
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-light mt-4 mb-6 tracking-tight">
                {bookingCta?.title || "Experience The Rang"}
              </h2>
              <hr className="section-divider-white mx-auto" />
              <p className="text-white/60 leading-[1.8] text-[15px] max-w-xl mx-auto mb-10">
                {bookingCta?.body || "Ready for an unforgettable stay?"}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={airbnbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-white"
                >
                  {bookingCta?.buttonText || "Book on Airbnb"}
                </a>
                <Link href="/location" className="btn-outline-white">
                  <span className="flex items-center gap-2">
                    <MapPin size={14} />
                    View Location
                  </span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: CLOSING GALLERY ===== */}
      <section className="py-2 bg-black">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {galleryImages.map((img, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="relative overflow-hidden aspect-square group">
                <img
                  src={img}
                  alt={`The Rang gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
