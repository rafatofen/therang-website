import { Link } from "wouter";
import { useSiteLinks } from "@/hooks/useCmsContent";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/logo-transparent_6fd28385.png";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Space", href: "/space" },
  { label: "Partners", href: "/partners" },
  { label: "3D Tour", href: "/tour" },
  { label: "Location", href: "/location" },
  { label: "Booking", href: "/booking" },
];

export default function Footer() {
  const { getLink } = useSiteLinks();
  const airbnbLink = getLink("airbnb") !== "#" ? getLink("airbnb") : "https://www.airbnb.com.au/rooms/1625996459378222841";
  const instagramLink = getLink("instagram") !== "#" ? getLink("instagram") : "https://www.instagram.com/theranguluwatu";

  return (
    <footer className="bg-black text-white">
      <div className="container py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col items-start">
            <img
              src={LOGO_URL}
              alt="The Rang Uluwatu"
              className="h-14 w-auto brightness-0 invert mb-6"
            />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              A sculptural, coastal masterpiece perched above the Indian Ocean on Uluwatu's dramatic cliffs.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium text-white/40 mb-6">
              Navigate
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium text-white/40 mb-6">
              Address
            </h4>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Jl. Labuansait No.83, Pecatu,<br />
              Kuta Selatan, Bali 80361, Indonesia
            </p>
            <a
              href={airbnbLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white text-[10px]"
            >
              Book on Airbnb
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} The Rang Uluwatu. All Rights Reserved.
          </p>
          <p className="text-xs text-white/30">
            Website developed by{" "}
            <a
              href="https://rafatofen.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              Rafael Thofehrn
            </a>
          </p>
          <div className="flex items-center gap-6">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
