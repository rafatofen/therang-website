/**
 * Booking Page — Fully restructured with 3 spec rows, staff section, tour highlights and CTA
 */

import Navbar from "@/components/Navbar";
import PageSkeleton from "@/components/PageSkeleton";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import SeoHead from "@/components/SeoHead";
import {
  Check, Users, BedDouble, Bath, Maximize, Car, Waves, Shield, UserCheck,
  Briefcase, ChefHat, Wind, Flame, Snowflake, Footprints, Droplets,
  Binoculars, WashingMachine, Wifi, Star, MapPin, Camera, Coffee,
  Sun, Moon, Heart, Dumbbell, Music, Book, Utensils, Laptop
} from "lucide-react";
import { useSiteLinks, useSiteContent } from "@/hooks/useCmsContent";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37";
const INFINITY_POOL = `${CDN}/infinity-pool-ocean-acCdzZRHLqou6ZYkfrkQ79.webp`;
const SUNSET = `${CDN}/bali-ocean-sunset-Z9rMjV67zYWT98s87jGFhB.webp`;
const LIVING = `${CDN}/living_room_1_1d0ea4f3.jpeg`;
const POOL = `${CDN}/pool_a63e1e38.jpeg`;
const ADD8 = `${CDN}/additional_8_84f7e0ce.jpeg`;
const ADD9 = `${CDN}/additional_9_176eae1a.jpeg`;
const MASTER_BED = `${CDN}/bedroom_master_751b6a2d.jpeg`;

const WHATSAPP = "https://wa.me/61403712311?text=Hi%2C+I'm+interested+in+booking+The+Rang+Uluwatu.+Could+you+help+me+with+availability+and+rates%3F";

// Icon map — 20 presets selectable from admin
const ICON_MAP: Record<string, any> = {
  Users, BedDouble, Bath, Maximize, Car, Waves, Shield, UserCheck,
  Briefcase, ChefHat, Wind, Flame, Snowflake, Footprints, Droplets,
  Binoculars, WashingMachine, Wifi, Star, MapPin, Camera, Coffee,
  Sun, Moon, Heart, Dumbbell, Music, Book, Utensils, Laptop,
};

function getIcon(iconName: string | undefined, fallback: any) {
  if (!iconName) return fallback;
  return ICON_MAP[iconName] || fallback;
}

// Spec box component
function SpecBox({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="text-center border border-black/10 p-6">
      <Icon className="mx-auto mb-3 text-black/40" size={24} />
      <p className="font-serif text-2xl font-light mb-1">{value}</p>
      <p className="text-[11px] tracking-[0.15em] uppercase text-black/40">{label}</p>
    </div>
  );
}

const defaultSpecs1 = [
  { label: "Guests", value: "10", icon: "Users" },
  { label: "Bedrooms", value: "5", icon: "BedDouble" },
  { label: "Bathrooms", value: "5.5", icon: "Bath" },
  { label: "Living Area", value: "500+ sqm", icon: "Maximize" },
  { label: "Parking", value: "1 car + 10 scooters", icon: "Car" },
  { label: "In-house Laundry", value: "Included", icon: "WashingMachine" },
];

const defaultSpecs2 = [
  { label: "Infinity Pool", value: "25m", icon: "Waves" },
  { label: "Sauna", value: "In-villa", icon: "Flame" },
  { label: "Ice Bath", value: "In-villa", icon: "Snowflake" },
  { label: "Beach Access", value: "Private staircase", icon: "Footprints" },
  { label: "Ocean Views", value: "Panoramic", icon: "Binoculars" },
  { label: "Outdoor Showers", value: "Multiple", icon: "Droplets" },
];

const defaultSpecs3 = [
  { label: "24h Security", value: "Always on", icon: "Shield" },
  { label: "Villa Manager", value: "Dedicated", icon: "UserCheck" },
  { label: "Butlers", value: "Professional", icon: "Briefcase" },
  { label: "Private Chef", value: "On request", icon: "ChefHat" },
  { label: "Airport Transfers", value: "Available", icon: "Car" },
  { label: "Surf Lessons", value: "Bookable", icon: "Wind" },
];

const defaultIncluded = [
  "Daily housekeeping", "Welcome amenities", "High-speed Wi-Fi throughout",
  "Smart TVs in all rooms", "Full air conditioning (double-glazed)", "Premium King Koil mattresses",
  "Luxury bathroom amenities", "In-villa sauna & ice bath", "25m infinity pool with pool bar",
  "Private staircase toward beach", "Dedicated parking", "Exclusive partner discounts",
];

const defaultRules = [
  "Check-in: 3:00 PM", "Check-out: 11:00 AM", "No smoking indoors",
  "No parties or events without prior arrangement", "Pets allowed (upon request)",
  "Quiet hours: 10:00 PM – 8:00 AM",
];

const defaultHighlights = [
  { title: "Living Spaces", desc: "Discover the open-plan living areas with their seamless indoor-outdoor flow and stunning ocean views.", imageUrl: LIVING },
  { title: "Infinity Pool", desc: "Experience the 25-meter infinity pool with hand-cut marble tiles and panoramic ocean views.", imageUrl: POOL },
  { title: "Master Suite", desc: "Explore the expansive master suite with its private balcony and breathtaking views.", imageUrl: MASTER_BED },
];

export default function Booking() {
  const { getLink, isLoading: linksLoading } = useSiteLinks();
  const { getContent, isLoading: contentLoading } = useSiteContent();

  if (linksLoading || contentLoading) return <PageSkeleton />;

  const airbnbLink = getLink("airbnb") !== "#" ? getLink("airbnb") : "https://www.airbnb.com.au/rooms/1625996459378222841";

  // Helper to parse spec from CMS
  function parseSpec(key: string, def: { label: string; value: string; icon: string }) {
    const cms = getContent(key);
    const iconName = cms?.extraData ? (() => { try { return JSON.parse(cms.extraData).icon; } catch { return def.icon; } })() : def.icon;
    return {
      icon: getIcon(iconName, ICON_MAP[def.icon]),
      label: cms?.title || def.label,
      value: cms?.body || def.value,
    };
  }

  const specs1 = defaultSpecs1.map((d, i) => parseSpec(`booking.spec_${['guests','bedrooms','bathrooms','area','parking','laundry'][i]}`, d));
  const specs2 = defaultSpecs2.map((d, i) => parseSpec(`booking.spec2_${i + 1}`, d));
  const specs3 = defaultSpecs3.map((d, i) => parseSpec(`booking.spec3_${i + 1}`, d));

  // Services sections
  const services2 = getContent("booking.services2");
  const services3 = getContent("booking.services3");

  // Included & rules
  const includedCms = getContent("booking.included");
  const included = includedCms?.body ? includedCms.body.split("\n").filter(Boolean) : defaultIncluded;
  const rulesCms = getContent("booking.house_rules");
  const houseRules = rulesCms?.body ? rulesCms.body.split("\n").filter(Boolean) : defaultRules;

  // Staff section
  const staff = getContent("booking.staff");

  // Tour highlights
  const highlights = defaultHighlights.map((def, i) => {
    const cms = getContent(`tour.highlight_${i + 1}`);
    return {
      title: cms?.title || def.title,
      desc: cms?.body || def.desc,
      imageUrl: cms?.imageUrl || def.imageUrl,
    };
  });

  // Hero
  const hero = getContent("booking.hero");
  const heroImage = hero?.imageUrl || INFINITY_POOL;
  const heroTitle = hero?.title || "Booking";
  const heroSubtitle = hero?.subtitle || "Experience the ultimate luxury getaway. Booking your stay at The Rang is seamless and secure.";

  // CTA
  const cta = getContent("booking.cta");

  return (
    <div className="min-h-screen">
      <SeoHead pageKey="booking" fallbackTitle="Booking — The Rang Uluwatu" fallbackDescription="Book your luxury stay at The Rang Uluwatu." />
      <Navbar />
      <PageHero title={heroTitle} subtitle={heroSubtitle} image={heroImage} />

      {/* ===== VILLA OVERVIEW + SPEC ROW 1 ===== */}
      <section className="section-spacing bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6 tracking-tight">
                {getContent("booking.overview")?.title || "Villa Overview"}
              </h2>
              <hr className="section-divider mx-auto" />
              <p className="text-black/60 leading-[1.8] text-[15px]">
                {getContent("booking.overview")?.body || "The Rang is a five-bedroom luxury villa accommodating up to 10 guests. Every detail has been crafted for an exceptional experience."}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {specs1.map((spec) => <SpecBox key={spec.label} {...spec} />)}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SERVICES 2 (image left) + SPEC ROW 2 ===== */}
      <section className="section-spacing bg-[#FAFAF8]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-12">
            <ScrollReveal direction="left">
              <img src={services2?.imageUrl || POOL} alt="Pool & Wellness" className="w-full aspect-[4/3] object-cover" />
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">Pool & Wellness</span>
                <h2 className="font-serif text-3xl md:text-4xl font-light mt-3 mb-6 tracking-tight">
                  {services2?.title || "Pool & Wellness"}
                </h2>
                <hr className="section-divider" />
                <p className="text-black/60 leading-[1.8] text-[15px] mt-6">
                  {services2?.body || "Unwind in pure luxury — from the 25-metre infinity pool to the in-villa sauna, ice bath and private beach staircase."}
                </p>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {specs2.map((spec) => <SpecBox key={spec.label} {...spec} />)}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SERVICES 3 (image right) + SPEC ROW 3 ===== */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-12">
            <ScrollReveal direction="left" delay={0.2}>
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">Staff & Concierge</span>
                <h2 className="font-serif text-3xl md:text-4xl font-light mt-3 mb-6 tracking-tight">
                  {services3?.title || "Dedicated Staff & Concierge"}
                </h2>
                <hr className="section-divider" />
                <p className="text-black/60 leading-[1.8] text-[15px] mt-6">
                  {services3?.body || "Our professional team is on hand around the clock to ensure every aspect of your stay exceeds expectations."}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <img src={services3?.imageUrl || ADD8} alt="Staff & Concierge" className="w-full aspect-[4/3] object-cover" />
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {specs3.map((spec) => <SpecBox key={spec.label} {...spec} />)}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== WHAT'S INCLUDED & HOUSE RULES ===== */}
      <section className="section-spacing bg-[#FAFAF8]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <ScrollReveal direction="left">
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">Inclusions</span>
                <h2 className="font-serif text-3xl md:text-4xl font-light mt-3 mb-6 tracking-tight">
                  {getContent("booking.included")?.title || "What's Included"}
                </h2>
                <hr className="section-divider" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  {included.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check size={16} className="text-black/40 mt-0.5 shrink-0" />
                      <p className="text-sm text-black/60">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">Policies</span>
                <h2 className="font-serif text-3xl md:text-4xl font-light mt-3 mb-6 tracking-tight">
                  {getContent("booking.house_rules")?.title || "House Rules"}
                </h2>
                <hr className="section-divider" />
                <div className="space-y-3 mt-6">
                  {houseRules.map((rule) => (
                    <div key={rule} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-black mt-2.5 shrink-0" />
                      <p className="text-sm text-black/60">{rule}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10 p-6 border border-black/10 bg-white">
                  <h3 className="font-serif text-xl font-light mb-3">
                    {getContent("booking.additional_services")?.title || "Additional Services"}
                  </h3>
                  <p className="text-sm text-black/60 leading-relaxed mb-4">
                    {getContent("booking.additional_services")?.body || "Private chef, airport transfers, surf lessons, spa treatments, and more can be arranged through your villa manager."}
                  </p>
                  <p className="text-xs text-black/40">
                    {getContent("booking.additional_services")?.subtitle || "Contact details provided upon booking confirmation."}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== FRIENDLY STAFF ===== */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <img src={staff?.imageUrl || ADD9} alt="The Rang Staff" className="w-full aspect-[4/3] object-cover" />
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">Our Team</span>
                <h2 className="font-serif text-3xl md:text-4xl font-light mt-3 mb-6 tracking-tight">
                  {staff?.title || "A Team That Feels Like Family"}
                </h2>
                <hr className="section-divider" />
                <p className="text-black/60 leading-[1.8] text-[15px] mt-6">
                  {staff?.body || "From the moment you arrive, our dedicated staff are here to make every detail seamless. Whether it's arranging a private dinner, booking surf lessons, or simply ensuring the villa is perfect — we're here for you."}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== TOUR HIGHLIGHTS ===== */}
      <section className="section-spacing bg-[#FAFAF8]">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6 tracking-tight">
                {getContent("tour.highlights_section")?.title || "Tour Highlights"}
              </h2>
              <hr className="section-divider mx-auto" />
              <p className="text-black/60 leading-[1.8] text-[15px] max-w-xl mx-auto">
                {getContent("tour.highlights_section")?.body || "Navigate through these key areas during your virtual tour to get a feel for the villa's unique character."}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.15}>
                <div className="group">
                  <div className="relative overflow-hidden aspect-[4/3] mb-5">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="font-serif text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-black/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-14">
              <a href="/space" className="btn-outline">
                Explore The Space
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== BOOKING CTA ===== */}
      <section className="relative">
        <div
          className="relative h-[500px] lg:h-[600px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${cta?.imageUrl || SUNSET})` }}
        >
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 text-center px-6 max-w-2xl">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-light mb-6 tracking-tight">
                {cta?.title || "Reserve Your Stay"}
              </h2>
              <hr className="section-divider-white mx-auto" />
              <p className="text-white/60 leading-[1.8] text-[15px] mb-10">
                {cta?.body || "The Rang is available for booking exclusively through Airbnb. Check availability, view rates, and secure your dates directly on our listing."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={airbnbLink} target="_blank" rel="noopener noreferrer" className="btn-outline-white inline-flex items-center gap-2">
                  Book on Airbnb
                </a>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-outline-white">
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
