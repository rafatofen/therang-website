/**
 * Booking Page — Rates & Reservation Info
 * Now reads links from the CMS database with hardcoded fallbacks
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import SeoHead from "@/components/SeoHead";
import { Check, ExternalLink, Users, BedDouble, Bath, Maximize, Car, Waves, Shield, UserCheck, Briefcase } from "lucide-react";
import { useSiteLinks } from "@/hooks/useCmsContent";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37";
const INFINITY_POOL = `${CDN}/infinity-pool-ocean-acCdzZRHLqou6ZYkfrkQ79.webp`;
const SUNSET = `${CDN}/bali-ocean-sunset-Z9rMjV67zYWT98s87jGFhB.webp`;
const LIVING = `${CDN}/living_room_1_1d0ea4f3.jpeg`;

const villaSpecs = [
  { icon: Users, label: "Guests", value: "10" },
  { icon: BedDouble, label: "Bedrooms", value: "5" },
  { icon: Bath, label: "Bathrooms", value: "5.5" },
  { icon: Maximize, label: "Living Area", value: "500+ sqm" },
  { icon: Car, label: "Parking", value: "1 car + 10 scooters" },
  { icon: Waves, label: "Pool", value: "25m infinity" },
];

const services = [
  { icon: Shield, title: "24-Hour Security", desc: "Round-the-clock security for your peace of mind." },
  { icon: UserCheck, title: "Dedicated Villa Manager", desc: "A personal villa manager to assist with all your needs." },
  { icon: Briefcase, title: "Professional Butlers", desc: "Attentive butler service for a seamless experience." },
  { icon: Car, title: "Parking", desc: "Parking for 1 car and 10 scooters on the premises." },
];

const included = [
  "Daily housekeeping",
  "Welcome amenities",
  "High-speed Wi-Fi throughout",
  "Smart TVs in all rooms",
  "Full air conditioning (double-glazed)",
  "Premium King Koil mattresses",
  "Luxury bathroom amenities",
  "In-villa sauna & ice bath",
  "25m infinity pool with pool bar",
  "Private staircase toward beach",
  "Dedicated parking",
  "Exclusive partner discounts",
];

const houseRules = [
  "Check-in: 3:00 PM",
  "Check-out: 11:00 AM",
  "No smoking indoors",
  "No parties or events without prior arrangement",
  "Pets allowed (upon request)",
  "Quiet hours: 10:00 PM – 8:00 AM",
];

export default function Booking() {
  const { getLink } = useSiteLinks();
  const airbnbLink = getLink("airbnb") !== "#" ? getLink("airbnb") : "https://www.airbnb.com.au/rooms/1625996459378222841";

  return (
    <div className="min-h-screen">
      <SeoHead
        pageKey="booking"
        fallbackTitle="Booking — The Rang Uluwatu"
        fallbackDescription="Book your luxury stay at The Rang Uluwatu. 5 bedrooms, infinity pool, ocean views."
      />
      <Navbar />

      <PageHero
        title="Booking"
        subtitle="Experience the ultimate luxury getaway. Booking your stay at The Rang is seamless and secure."
        image={INFINITY_POOL}
      />

      {/* Villa Overview */}
      <section className="section-spacing bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6 tracking-tight">
                Villa Overview
              </h2>
              <hr className="section-divider mx-auto" />
              <p className="text-black/60 leading-[1.8] text-[15px]">
                The Rang is a five-bedroom luxury villa accommodating up to 10 guests. Every detail has been crafted for an exceptional experience.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {villaSpecs.map((spec) => (
                <div key={spec.label} className="text-center border border-black/10 p-6">
                  <spec.icon className="mx-auto mb-3 text-black/40" size={24} />
                  <p className="font-serif text-2xl font-light mb-1">{spec.value}</p>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-black/40">{spec.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services & Amenities */}
      <section className="section-spacing bg-[#FAFAF8]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <img
                src={LIVING}
                alt="Living area at The Rang"
                className="w-full aspect-[4/3] object-cover"
              />
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">
                  Services
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light mt-3 mb-6 tracking-tight">
                  Services & Amenities
                </h2>
                <hr className="section-divider" />
                <div className="space-y-6 mt-6">
                  {services.map((s) => (
                    <div key={s.title} className="flex items-start gap-4">
                      <s.icon size={20} className="text-black/40 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-sm mb-1">{s.title}</p>
                        <p className="text-black/50 text-sm">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What's Included & House Rules */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <ScrollReveal direction="left">
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">
                  Inclusions
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light mt-3 mb-6 tracking-tight">
                  What's Included
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
                <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">
                  Policies
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light mt-3 mb-6 tracking-tight">
                  House Rules
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

                <div className="mt-10 p-6 border border-black/10 bg-[#FAFAF8]">
                  <h3 className="font-serif text-xl font-light mb-3">Additional Services</h3>
                  <p className="text-sm text-black/60 leading-relaxed mb-4">
                    Private chef, airport transfers, surf lessons, spa treatments, and more can be arranged through your villa manager.
                  </p>
                  <p className="text-xs text-black/40">Contact details provided upon booking confirmation.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="relative">
        <div
          className="relative h-[500px] lg:h-[600px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${SUNSET})` }}
        >
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 text-center px-6 max-w-2xl">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-light mb-6 tracking-tight">
                Reserve Your Stay
              </h2>
              <hr className="section-divider-white mx-auto" />
              <p className="text-white/60 leading-[1.8] text-[15px] mb-4">
                The Rang is available for booking exclusively through Airbnb. Check availability, view rates, and secure your dates directly on our listing.
              </p>
              <p className="text-white/40 text-xs mb-10">
                Rates vary by season. Please check Airbnb for current pricing and availability.
              </p>
              <a
                href={airbnbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white inline-flex items-center gap-2"
              >
                <span>Book on Airbnb</span>
                <ExternalLink size={14} />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
