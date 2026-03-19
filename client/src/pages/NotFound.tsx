import { useLocation } from "wouter";
import { useEffect, useState } from "react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/logo-transparent_6fd28385.png";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/uluwatu-cliff-aerial-oNZekmYsnH9nNSqa8KvQJT.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 flex flex-col items-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        {/* Logo */}
        <img
          src={LOGO_URL}
          alt="The Rang Uluwatu"
          className="h-10 w-auto brightness-0 invert mb-16 opacity-60"
        />

        {/* 404 */}
        <p
          className="text-white/20 font-light mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(100px, 20vw, 180px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          404
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-white/30 mb-8" />

        {/* Message */}
        <p
          className="text-white/40 text-xs tracking-[0.3em] uppercase mb-3"
        >
          Page Not Found
        </p>
        <p
          className="text-white/60 mb-12 max-w-sm leading-relaxed"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "18px",
            fontStyle: "italic",
          }}
        >
          The page you're looking for has drifted out to sea.
        </p>

        {/* CTA */}
        <button
          onClick={() => setLocation("/")}
          className="group flex items-center gap-3 text-white/60 hover:text-white transition-all duration-500"
        >
          <span
            className="w-8 h-px bg-white/40 group-hover:w-12 group-hover:bg-white transition-all duration-500"
          />
          <span className="text-xs tracking-[0.25em] uppercase">
            Return Home
          </span>
          <span
            className="w-8 h-px bg-white/40 group-hover:w-12 group-hover:bg-white transition-all duration-500"
          />
        </button>
      </div>

      {/* Bottom coordinates — decorative */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
          Uluwatu · Bali · Indonesia
        </p>
      </div>
    </div>
  );
}
