/**
 * Partners Page — Exclusive Guest Perks & Collaborations
 * Now reads partners from the CMS database with hardcoded fallbacks
 */

import Navbar from "@/components/Navbar";
import PageSkeleton from "@/components/PageSkeleton";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import SeoHead from "@/components/SeoHead";
import { MapPin } from "lucide-react";
import { usePartners, useSiteLinks } from "@/hooks/useCmsContent";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37";
const ADD8 = `${CDN}/additional_8_84f7e0ce.jpeg`;

// Partner photos (fallback defaults)
const YUKI_IMG = `${CDN}/yuki-restaurant_7375e42b.jpg`;
const AVLI_IMG = `${CDN}/avli-restaurant_e212176e.webp`;
const FONDUE_IMG = `${CDN}/studio-fondue_7c614385.jpg`;
const ULU_IMG = `${CDN}/ulu-active_d2d980b6.webp`;
const TEJA_IMG = `${CDN}/teja-restaurant_3102cecd.png`;

const defaultPartners = [
  {
    name: "Yuki",
    type: "Japanese Restaurant",
    description: "Refined Japanese dining in a relaxed setting, known for its precision, flavor, and craft.",
    perk: "15% lunch discount",
    address: "Jl. Labuansait, Pecatu, South Kuta, Badung, Bali 80361",
    imageUrl: YUKI_IMG,
  },
  {
    name: "Avli",
    type: "Greek Restaurant",
    description: "Modern Greek cuisine with a Mediterranean sensibility — warm, social, and beautifully executed.",
    perk: "10% discount + 1 complimentary drink",
    address: "Pecatu, South Kuta, Badung Regency, Bali 80361",
    imageUrl: AVLI_IMG,
  },
  {
    name: "Studio Fondue",
    type: "Pilates & Recovery",
    description: "A dedicated studio for Pilates and recovery, offering a holistic approach to well-being.",
    perk: "20% off with code RANG20",
    address: "Jl. Labuansait, Pecatu, South Kuta, Badung, Bali 80361",
    imageUrl: FONDUE_IMG,
  },
  {
    name: "Ulu Active",
    type: "Gym & Recovery",
    description: "A comprehensive gym and recovery center, perfect for maintaining your fitness routine while on holiday.",
    perk: "Exclusive guest access",
    address: "ULU TRIBE, Jl. Labuansait, Pecatu, South Kuta, Badung, Bali 80361",
    imageUrl: ULU_IMG,
  },
  {
    name: "Teja",
    type: "Modern European Restaurant",
    description: "An exquisite modern European dining experience with locally sourced ingredients and creative presentations.",
    perk: "Priority reservations for guests",
    address: "Jl. Labuansait, Pecatu, South Kuta, Badung, Bali 80361",
    imageUrl: TEJA_IMG,
  },
];

export default function Partners() {
  const { partners: dbPartners, isLoading } = usePartners();
  const { getLink } = useSiteLinks();

  // Use DB partners or fallback
  const partners = dbPartners.length > 0 ? dbPartners : defaultPartners;
  const airbnbLink = getLink("airbnb") !== "#" ? getLink("airbnb") : "https://www.airbnb.com.au/rooms/1625996459378222841";

  if (isLoading) return <PageSkeleton />;
  return (
    <div className="min-h-screen">
      <SeoHead
        pageKey="partners"
        fallbackTitle="Partners — The Rang Uluwatu"
        fallbackDescription="Exclusive guest perks and collaborations with Uluwatu's finest establishments."
      />
      <Navbar />

      <PageHero
        title="Partners"
        subtitle="Exclusive guest perks and collaborations with Uluwatu's finest establishments."
        image={ADD8}
      />

      {/* Introduction */}
      <section className="section-spacing bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6 tracking-tight">
                Exclusive Guest Perks & Collaborations
              </h2>
              <hr className="section-divider mx-auto" />
              <p className="text-black/60 leading-[1.8] text-[15px]">
                We are proud to collaborate with a small selection of local partners who share our commitment to quality, craft, and experience. Guests of The Rang enjoy exclusive benefits at these esteemed establishments.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Partner Cards */}
      <section className="pb-24 lg:pb-32 bg-white">
        <div className="container">
          <div className="space-y-12">
            {partners.map((partner: any, i: number) => (
              <ScrollReveal key={partner.name} delay={i * 0.1}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border border-black/10 overflow-hidden ${
                    i % 2 === 1 ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Photo */}
                  <div className={`relative overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      src={partner.imageUrl || partner.image || `https://placehold.co/800x600/1a1a1a/ffffff?text=${encodeURIComponent(partner.name)}`}
                      alt={partner.name}
                      className="w-full h-64 lg:h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className={`p-8 lg:p-12 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-black/35 font-medium mb-3">
                      {partner.type}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-light mb-4 tracking-tight">
                      {partner.name}
                    </h3>
                    <p className="text-black/60 leading-[1.8] text-[15px] mb-6">
                      {partner.description}
                    </p>

                    {/* Perk badge */}
                    {partner.perk && (
                      <div className="mb-6">
                        <span className="text-[10px] tracking-[0.15em] uppercase text-black/40 font-medium block mb-2">
                          Guest Perk
                        </span>
                        <p className="text-sm font-medium bg-[#FAFAF8] px-5 py-3 inline-block border border-black/5">
                          {partner.perk}
                        </p>
                      </div>
                    )}

                    {/* Address */}
                    {partner.address && (
                      <div className="flex items-start gap-2 text-black/40">
                        <MapPin size={14} className="mt-0.5 shrink-0" />
                        <p className="text-xs leading-relaxed">{partner.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white section-spacing">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-6 tracking-tight">
              Discover Uluwatu's Finest
            </h2>
            <hr className="section-divider-white mx-auto" />
            <p className="text-white/60 leading-[1.8] text-[15px] max-w-xl mx-auto mb-10">
              All partner perks are exclusively available to guests of The Rang during their stay. Details and booking assistance provided by your villa manager.
            </p>
            <a
              href={airbnbLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white"
            >
              Book Your Stay
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
