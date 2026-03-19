import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteLinks } from "@/hooks/useCmsContent";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37/logo-transparent_6fd28385.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Space", href: "/space" },
  { label: "Partners", href: "/partners" },
  { label: "Location", href: "/location" },
  { label: "3D Tour", href: "/tour" },
  { label: "Booking", href: "/booking" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";
  const { getLink } = useSiteLinks();

  const airbnbLink = getLink("airbnb") !== "#" ? getLink("airbnb") : "https://www.airbnb.com.au/rooms/1625996459378222841";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // On home page: transparent until scrolled, then white bg
  // On sub-pages: always white bg
  const showWhiteBg = !isHome || scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showWhiteBg
            ? "bg-white/95 backdrop-blur-sm border-b border-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-20 lg:h-24">
          {/* Left nav links - desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                  showWhiteBg
                    ? "text-black/70 hover:text-black"
                    : "text-white/80 hover:text-white"
                } ${location === link.href ? (showWhiteBg ? "text-black" : "text-white") : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <Link href="/" className="flex items-center">
            <img
              src={LOGO_URL}
              alt="The Rang Uluwatu"
              className={`h-12 lg:h-16 w-auto transition-all duration-500 ${
                showWhiteBg ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* Right nav links - desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                  showWhiteBg
                    ? "text-black/70 hover:text-black"
                    : "text-white/80 hover:text-white"
                } ${location === link.href ? (showWhiteBg ? "text-black" : "text-white") : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${
              showWhiteBg ? "text-black" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-5 p-2 text-black"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <img src={LOGO_URL} alt="The Rang Uluwatu" className="h-16 mb-12" />
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-[0.2em] uppercase font-medium transition-colors ${
                    location === link.href ? "text-black" : "text-black/50 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={airbnbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-6"
              >
                Book on Airbnb
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
