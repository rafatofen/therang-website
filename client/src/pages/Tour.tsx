/**
 * 3D Tour Page — Virtual Tour of The Rang
 * Design: Geological Minimalism — full-screen immersive tour embed
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageSkeleton from "@/components/PageSkeleton";
import { Link } from "wouter";
import { useSiteContent } from "@/hooks/useCmsContent";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37";
const LIVING = `${CDN}/living_room_1_1d0ea4f3.jpeg`;
const POOL = `${CDN}/pool_a63e1e38.jpeg`;
const MASTER_BED = `${CDN}/bedroom_master_751b6a2d.jpeg`;
const HERO_POOL = `${CDN}/hero_pool_view_1262a7be.jpeg`;
const MATTERPORT_DEFAULT = "https://my.matterport.com/show/?m=iSm1iF9KDNC";

export default function Tour() {
  const { getContent, isLoading } = useSiteContent();

  if (isLoading) return <PageSkeleton />;

  const hero = getContent("tour.hero");
  const embed = getContent("tour.embed");

  const heroImage = hero?.imageUrl || HERO_POOL;
  const heroTitle = hero?.title || "360° Virtual Tour";
  const heroSubtitle = hero?.subtitle || "Explore every corner of The Rang from the comfort of your screen.";
  const matterportUrl = embed?.body || MATTERPORT_DEFAULT;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="The Rang Uluwatu" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 pb-12 lg:pb-16">
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/40 font-medium">
            Virtual Experience
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light mt-3 tracking-tight">
            {heroTitle}
          </h1>
          <p className="text-white/60 leading-[1.8] text-[15px] max-w-xl mt-4">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Tour Embed */}
      <section className="bg-black">
        <div className="w-full" style={{ height: "75vh", minHeight: "500px" }}>
          <iframe
            src={matterportUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            allow="xr-spatial-tracking"
            title="The Rang Uluwatu 3D Virtual Tour"
            className="w-full h-full"
          />
        </div>
        <div className="container py-6">
          <p className="text-white/40 text-xs text-center">
            Use your mouse or touch to navigate. Click on hotspots to move between rooms.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-spacing bg-[#FAFAF8]">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6 tracking-tight">
                Tour Highlights
              </h2>
              <hr className="section-divider mx-auto" />
              <p className="text-black/60 leading-[1.8] text-[15px] max-w-xl mx-auto">
                Navigate through these key areas during your virtual tour to get a feel for the villa's unique character.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: getContent("tour.highlight_1")?.title || "Living Spaces", desc: getContent("tour.highlight_1")?.body || "Discover the open-plan living areas with their seamless indoor-outdoor flow and stunning ocean views.", image: getContent("tour.highlight_1")?.imageUrl || LIVING },
              { title: getContent("tour.highlight_2")?.title || "Infinity Pool", desc: getContent("tour.highlight_2")?.body || "Experience the 25-meter infinity pool with hand-cut marble tiles and panoramic ocean views.", image: getContent("tour.highlight_2")?.imageUrl || POOL },
              { title: getContent("tour.highlight_3")?.title || "Master Suite", desc: getContent("tour.highlight_3")?.body || "Explore the expansive master suite with its private balcony and breathtaking views.", image: getContent("tour.highlight_3")?.imageUrl || MASTER_BED },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.15}>
                <div className="group">
                  <div className="relative overflow-hidden aspect-[4/3] mb-5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-black/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-14">
              <Link href="/space" className="btn-outline">
                View Full Space Details
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
