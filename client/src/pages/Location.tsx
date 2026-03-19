/**
 * Location Page — The Rang Uluwatu
 * Design: Geological Minimalism — map section + nearby attractions
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import PageSkeleton from "@/components/PageSkeleton";
import { MapPin, Clock, Waves, UtensilsCrossed, Dumbbell, ExternalLink } from "lucide-react";
import { useSiteContent, useSiteLinks } from "@/hooks/useCmsContent";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37";
const CLIFF_AERIAL = `${CDN}/uluwatu-cliff-aerial-oNZekmYsnH9nNSqa8KvQJT.webp`;
const SUNSET = `${CDN}/bali-ocean-sunset-Z9rMjV67zYWT98s87jGFhB.webp`;
const ADD5 = `${CDN}/additional_5_ad208b16.jpeg`;

const MAPS_EMBED_DEFAULT = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.5!2d115.0870!3d-8.8140!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDgnNTAuNCJTIDExNcKwMDUnMTMuMiJF!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid";
const MAPS_URL_DEFAULT = "https://maps.google.com/?q=-8.814,115.087";

const nearbyAttractions = [
  {
    category: "Surf Breaks",
    icon: Waves,
    items: [
      { name: "Race Tracks", distance: "Direct view from villa" },
      { name: "Outside Corner", distance: "2 min walk" },
      { name: "Temples", distance: "3 min walk" },
      { name: "Uluwatu", distance: "5 min walk" },
      { name: "Padang Padang", distance: "8 min drive" },
    ],
  },
  {
    category: "Dining",
    icon: UtensilsCrossed,
    items: [
      { name: "Single Fin", distance: "3 min walk" },
      { name: "Yuki Japanese", distance: "5 min drive" },
      { name: "Avli Greek", distance: "5 min drive" },
      { name: "Teja Modern European", distance: "5 min drive" },
      { name: "Ulu Cliffhouse", distance: "8 min drive" },
    ],
  },
  {
    category: "Wellness & Fitness",
    icon: Dumbbell,
    items: [
      { name: "Studio Fondue (Pilates)", distance: "5 min drive" },
      { name: "Ulu Active (Gym)", distance: "5 min drive" },
      { name: "Spa treatments", distance: "Available in-villa" },
    ],
  },
  {
    category: "Landmarks",
    icon: MapPin,
    items: [
      { name: "Uluwatu Temple", distance: "10 min drive" },
      { name: "Suluban Beach", distance: "Private staircase access" },
      { name: "Garuda Wisnu Kencana", distance: "15 min drive" },
      { name: "Ngurah Rai Airport", distance: "35 min drive" },
    ],
  },
];

const travelTimesDefault = [
  { from: "Ngurah Rai Airport", time: "35 min" },
  { from: "Seminyak", time: "45 min" },
  { from: "Canggu", time: "55 min" },
  { from: "Ubud", time: "1 hr 30 min" },
];

const localFavouritesDefault = [
  {
    name: "Mana Uluwatu",
    desc: "A relaxed cliffside retreat ideal for long afternoons by the pool, fresh coconuts, and sunset views.",
    type: "Beach Club & Lounge",
  },
  {
    name: "Kala",
    desc: "An intimate dining experience blending contemporary cuisine with an energetic evening atmosphere.",
    type: "Restaurant & Bar",
  },
];

export default function Location() {
  const { getContent, isLoading } = useSiteContent();
  const { getLink } = useSiteLinks();

  if (isLoading) return <PageSkeleton />;

  const hero = getContent("location.hero");
  const mapSection = getContent("location.map");
  const travelSection = getContent("location.travel");
  const favouritesSection = getContent("location.favourites");

  const heroImage = hero?.imageUrl || CLIFF_AERIAL;
  const heroTitle = hero?.title || "Location";
  const heroSubtitle = hero?.subtitle || "Bahari Complex, Suluban Cliff — Uluwatu's most coveted address.";
  const mapText = mapSection?.body || "The Rang is located in the Bahari Complex on Suluban Cliff, Uluwatu — Bali's most prestigious coastal address.";

  // Maps from Links CMS
  const mapsEmbedUrl = getLink("google_maps_embed") !== "#" ? getLink("google_maps_embed") : MAPS_EMBED_DEFAULT;
  const mapsUrl = getLink("google_maps_url") !== "#" ? getLink("google_maps_url") : MAPS_URL_DEFAULT;

  // Parse travel times from CMS body (format: "Airport: 45 min\nSeminyak: 50 min")
  const travelTimes = travelSection?.body
    ? travelSection.body.split("\n").map(line => {
        const [from, time] = line.split(": ");
        return { from: from?.trim(), time: time?.trim() };
      }).filter(t => t.from && t.time)
    : travelTimesDefault;

  // Parse local favourites from CMS body (format: "Name: Description")
  const localFavourites = favouritesSection?.body
    ? favouritesSection.body.split("\n").map(line => {
        const colonIdx = line.indexOf(": ");
        return {
          name: line.substring(0, colonIdx).trim(),
          desc: line.substring(colonIdx + 2).trim(),
          type: "",
        };
      }).filter(f => f.name && f.desc)
    : localFavouritesDefault;

  return (
    <div className="min-h-screen">
      <Navbar />

      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        image={heroImage}
      />

      {/* Intro */}
      <section className="section-spacing bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6 tracking-tight">
                Where Jungle Meets Cliff
              </h2>
              <hr className="section-divider mx-auto" />
              <p className="text-black/60 leading-[1.8] text-[15px]">
                {mapText}
              </p>
            </div>
          </ScrollReveal>

          {/* Key Features */}
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
              {[
                "Unmatched cliffside vistas",
                "World-class dining",
                "Premium wellness culture",
                "Renowned surf breaks",
                "Cultural authenticity",
              ].map((f) => (
                <div key={f} className="text-center border border-black/10 p-5">
                  <p className="text-sm text-black/60">{f}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Map */}
          <ScrollReveal>
            <div className="w-full aspect-[16/9] bg-[#F0F0EC] overflow-hidden border border-black/10">
              <iframe
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Rang Uluwatu Location"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mt-8">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2"
              >
                <span>View on Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Travel Times */}
      <section className="bg-black text-white py-16">
        <div className="container">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {travelTimes.map((t) => (
                <div key={t.from}>
                  <Clock className="mx-auto mb-3 text-white/40" size={20} />
                  <p className="font-serif text-2xl font-light mb-1">{t.time}</p>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-white/40">{t.from}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="section-spacing bg-[#FAFAF8]">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6 tracking-tight">
                Nearby Attractions
              </h2>
              <hr className="section-divider mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {nearbyAttractions.map((cat, i) => (
              <ScrollReveal key={cat.category} delay={i * 0.1}>
                <div className="border border-black/10 bg-white p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <cat.icon size={20} className="text-black/40" />
                    <h3 className="font-serif text-xl font-light">{cat.category}</h3>
                  </div>
                  <div className="space-y-4">
                    {cat.items.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-xs text-black/40 ml-4 shrink-0">{item.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Local Favourites */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <img
                src={ADD5}
                alt="Uluwatu coastal view"
                className="w-full aspect-[4/3] object-cover"
              />
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-black/40 font-medium">
                  Recommendations
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light mt-3 mb-6 tracking-tight">
                  Local Favourites
                </h2>
                <hr className="section-divider" />
                <div className="space-y-8 mt-6">
                  {localFavourites.map((fav) => (
                    <div key={fav.name}>
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="font-serif text-xl font-light">{fav.name}</h3>
                        {fav.type && (
                          <span className="text-[11px] tracking-[0.15em] uppercase text-black/40 font-medium">
                            {fav.type}
                          </span>
                        )}
                      </div>
                      <p className="text-black/60 text-sm leading-relaxed">{fav.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Sunset CTA */}
      <section className="relative">
        <div
          className="relative h-[450px] lg:h-[550px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${SUNSET})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center px-6">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-light mb-6 tracking-tight">
                Your Uluwatu Escape Awaits
              </h2>
              <hr className="section-divider-white mx-auto" />
              <p className="text-white/60 leading-[1.8] text-[15px] max-w-xl mx-auto mb-10">
                Experience the best of Bali's southern coast from the comfort of The Rang.
              </p>
              <a
                href="https://www.airbnb.com.au/rooms/1625996459378222841"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white"
              >
                Book Your Stay
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
