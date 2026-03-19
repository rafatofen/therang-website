/**
 * Seed script — populates the database with initial content from the hardcoded data.
 * Run via: pnpm seed (or tsx server/seed.ts)
 * Only inserts if tables are empty (safe to re-run).
 */
import "dotenv/config";
import { hashPassword } from "./adminAuth";
import {
  getAdminCount, createAdmin,
  getAllContent, upsertContent,
  getAllTestimonials, createTestimonial,
  getAllPartners, createPartner,
  getAllLinks, upsertLink,
  getAllSeoSettings, upsertSeo,
} from "./db";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37";

async function seed() {
  console.log("🌱 Seeding database...");

  // 1. Default admin account
  const adminCount = await getAdminCount();
  if (adminCount === 0) {
    const hash = await hashPassword("admin123");
    await createAdmin({
      username: "admin",
      passwordHash: hash,
      displayName: "Admin",
    });
    console.log("  ✓ Created default admin (username: admin, password: admin123)");
  } else {
    console.log("  ⏭ Admin already exists, skipping");
  }

  // 2. Site content sections — ALL pages
  const existingContent = await getAllContent();
  if (existingContent.length === 0) {
    const sections = [
      // ===== HOME PAGE =====
      {
        sectionKey: "home.hero",
        title: "THE RANG",
        subtitle: "Uluwatu, Bali",
        body: "A Sculptural, Coastal Masterpiece",
        buttonText: "Explore the Space",
        buttonLink: "/space",
        imageUrl: `${CDN}/hero_pool_view_1262a7be.jpeg`,
      },
      {
        sectionKey: "home.hero_video",
        title: "Hero Video",
        imageUrl: `${CDN}/hero-video_b6863f29.mp4`,
      },
      {
        sectionKey: "home.philosophy",
        title: "A Home Shaped by Land, Light, and Return",
        subtitle: "01 — Philosophy",
        body: "The Rang is more than a name — it's a philosophy captured in architecture. The villa draws inspiration from two intertwined concepts: a boomerang form representing flow, return, and continuity, and \"Jurang\" — cliff in Bahasa Indonesian.\n\nPerched on a dramatic cliff overlooking Uluwatu's coastline, the home's sweeping curve creates a natural \"embrace\" that opens toward the horizon. Together, these ideas create The Rang — a home named for its geometry and its landscape.",
        buttonText: "Our Philosophy",
        buttonLink: "/space",
        imageUrl: `${CDN}/additional_2_9e6ce51b.jpeg`,
      },
      {
        sectionKey: "home.experience",
        title: "Experience Unrivaled Luxury",
        subtitle: "02 — Experience",
        body: "Designed as a contemporary sanctuary with timeless appeal, The Rang blends luxury craftsmanship, natural materials, and understated elegance. Every element has been considered to feel grounded, timeless, and intrinsically connected to its setting.",
      },
      // Features
      { sectionKey: "home.feature_1", title: "Modern Design", body: "Sculptural architecture by Steven Kunz, with a curved façade unlike any other in Uluwatu.", imageUrl: `${CDN}/additional_2_9e6ce51b.jpeg` },
      { sectionKey: "home.feature_2", title: "Infinity Pool", body: "A stunning 25-meter lap pool finished with hand-cut marble tiling.", imageUrl: `${CDN}/infinity-pool-ocean-acCdzZRHLqou6ZYkfrkQ79.webp` },
      { sectionKey: "home.feature_3", title: "Wellness", body: "Custom-built sauna crafted from premium hardwoods and a professional ice bath.", imageUrl: `${CDN}/luxury-sauna-wellness-J6g6hBg6657XkKUcSNjxro.webp` },
      { sectionKey: "home.feature_4", title: "Ocean Views", body: "Elevated ocean views overlooking the Uluwatu surf break \"Race Tracks.\"", imageUrl: `${CDN}/balcony_1134c415.jpeg` },
      { sectionKey: "home.feature_5", title: "Beach Access", body: "Private staircase access toward Suluban Beach with paddle access to iconic breaks.", imageUrl: `${CDN}/uluwatu-cliff-aerial-oNZekmYsnH9nNSqa8KvQJT.webp` },
      { sectionKey: "home.feature_6", title: "Comfort", body: "Full double-glazed system for thermal efficiency and a quiet, meditative interior.", imageUrl: `${CDN}/living_room_1_1d0ea4f3.jpeg` },
      { sectionKey: "home.feature_7", title: "Natural Aesthetic", body: "Extensive use of local natural stone, creating a grounded and organic aesthetic.", imageUrl: `${CDN}/additional_4_b8fbfef5.jpeg` },
      { sectionKey: "home.feature_8", title: "Indoor-Outdoor Flow", body: "Expansive indoor–outdoor living with multiple terraces and lounge areas.", imageUrl: `${CDN}/additional_1_69fa140a.jpeg` },
      // Location
      {
        sectionKey: "home.location",
        title: "Perched Above the Indian Ocean",
        subtitle: "03 — Location",
        body: "Located in the Bahari Complex on Suluban Cliff, Uluwatu has evolved into Bali's premier destination for elevated coastal living. Where jungle meets cliff, and tradition meets lifestyle, the region offers a rare blend of privacy, luxury, and natural drama.\n\nFeatures a private staircase to Suluban Beach and legendary surf breaks including Outside Corner, Temples, Uluwatu, and Race Tracks.",
        buttonText: "View the Map",
        buttonLink: "/location",
        imageUrl: `${CDN}/uluwatu-cliff-aerial-oNZekmYsnH9nNSqa8KvQJT.webp`,
      },
      // Booking CTA
      {
        sectionKey: "home.booking",
        title: "Experience The Rang",
        subtitle: "06 — Book Your Stay",
        body: "Ready for an unforgettable stay? Book your escape to The Rang Uluwatu directly through Airbnb and discover luxury living on Bali's most dramatic coastline.",
        buttonText: "Book on Airbnb",
        imageUrl: `${CDN}/bali-ocean-sunset-Z9rMjV67zYWT98s87jGFhB.webp`,
      },
      // Gallery images
      { sectionKey: "home.gallery_1", title: "Gallery 1", imageUrl: `${CDN}/hero_pool_view_1262a7be.jpeg` },
      { sectionKey: "home.gallery_2", title: "Gallery 2", imageUrl: `${CDN}/bedroom_master_751b6a2d.jpeg` },
      { sectionKey: "home.gallery_3", title: "Gallery 3", imageUrl: `${CDN}/kitchen_18227ee9.jpeg` },
      { sectionKey: "home.gallery_4", title: "Gallery 4", imageUrl: `${CDN}/dining_area_e45aac0d.jpeg` },
      { sectionKey: "home.gallery_5", title: "Gallery 5", imageUrl: `${CDN}/pool_a63e1e38.jpeg` },
      { sectionKey: "home.gallery_6", title: "Gallery 6", imageUrl: `${CDN}/additional_1_69fa140a.jpeg` },
      { sectionKey: "home.gallery_7", title: "Gallery 7", imageUrl: `${CDN}/additional_5_ad208b16.jpeg` },
      { sectionKey: "home.gallery_8", title: "Gallery 8", imageUrl: `${CDN}/additional_10_24ef198e.jpeg` },

      // ===== SPACE PAGE (matches SpaceNew.tsx gallery layout) =====
      // Section 1: The Villa
      { sectionKey: "space.overview", title: "The Villa", subtitle: "500+ sqm of sculptural living", imageUrl: `${CDN}/hero_pool_view_1262a7be.jpeg` },
      { sectionKey: "space.overview_g1", imageUrl: `${CDN}/additional_2_9e6ce51b.jpeg` },
      { sectionKey: "space.overview_g2", imageUrl: `${CDN}/additional_1_69fa140a.jpeg` },
      { sectionKey: "space.overview_g3", imageUrl: `${CDN}/additional_3_9c61be4c.jpeg` },
      { sectionKey: "space.overview_g4", imageUrl: `${CDN}/additional_4_b8fbfef5.jpeg` },
      // Section 2: Infinity Pool
      { sectionKey: "space.pool", title: "Infinity Pool & Deck", subtitle: "25-meter lap pool with hand-cut marble", imageUrl: `${CDN}/pool_a63e1e38.jpeg` },
      { sectionKey: "space.pool_g1", imageUrl: `${CDN}/deck_1d18e694.jpeg` },
      { sectionKey: "space.pool_g2", imageUrl: `${CDN}/additional_5_ad208b16.jpeg` },
      { sectionKey: "space.pool_g3", imageUrl: `${CDN}/additional_10_24ef198e.jpeg` },
      { sectionKey: "space.pool_g4", imageUrl: `${CDN}/additional_1_69fa140a.jpeg` },
      // Section 3: Living & Dining
      { sectionKey: "space.living", title: "Living & Dining", subtitle: "Sunken lounge, open-plan dining, and indoor-outdoor flow", imageUrl: `${CDN}/living_room_1_1d0ea4f3.jpeg` },
      { sectionKey: "space.living_g1", imageUrl: `${CDN}/dining_area_e45aac0d.jpeg` },
      { sectionKey: "space.living_g2", imageUrl: `${CDN}/kitchen_18227ee9.jpeg` },
      { sectionKey: "space.living_g3", imageUrl: `${CDN}/additional_8_84f7e0ce.jpeg` },
      { sectionKey: "space.living_g4", imageUrl: `${CDN}/additional_6_8405a088.jpeg` },
      // Section 4: Master Suite
      { sectionKey: "space.master", title: "Master Suite", subtitle: "Ocean and volcano views from your bed", imageUrl: `${CDN}/bedroom_master_751b6a2d.jpeg` },
      { sectionKey: "space.master_g1", imageUrl: `${CDN}/balcony_1134c415.jpeg` },
      { sectionKey: "space.master_g2", imageUrl: `${CDN}/bathroom_master_3bf20b91.jpeg` },
      { sectionKey: "space.master_g3", imageUrl: `${CDN}/additional_7_8f92abce.jpeg` },
      // Section 5: Guest Bedrooms
      { sectionKey: "space.bedrooms", title: "Guest Bedrooms", subtitle: "Four beautifully appointed rooms with en-suite bathrooms", imageUrl: `${CDN}/bedroom_2_4c60dfb0.jpeg` },
      { sectionKey: "space.bedrooms_g1", imageUrl: `${CDN}/bedroom_3_d610517a.jpeg` },
      { sectionKey: "space.bedrooms_g2", imageUrl: `${CDN}/bedroom_4_5b99d8eb.jpeg` },
      { sectionKey: "space.bedrooms_g3", imageUrl: `${CDN}/bedroom_5_579018d2.jpeg` },
      { sectionKey: "space.bedrooms_g4", imageUrl: `${CDN}/bathroom_2_7eccbdc9.jpeg` },
      { sectionKey: "space.bedrooms_g5", imageUrl: `${CDN}/bathroom_3_544cdd47.jpeg` },
      { sectionKey: "space.bedrooms_g6", imageUrl: `${CDN}/bathroom_4_70748053.jpeg` },
      { sectionKey: "space.bedrooms_g7", imageUrl: `${CDN}/bathroom_5_e36810e6.jpeg` },
      // Section 6: Wellness & Outdoor
      { sectionKey: "space.wellness", title: "Wellness & Outdoor", subtitle: "Sauna, ice bath, outdoor showers, and private beach stairs", imageUrl: `${CDN}/additional_9_176eae1a.jpeg` },
      { sectionKey: "space.wellness_g1", imageUrl: `${CDN}/additional_11_80730ed0.jpeg` },
      { sectionKey: "space.wellness_g2", imageUrl: `${CDN}/additional_12_927d3d29.jpeg` },
      { sectionKey: "space.wellness_g3", imageUrl: `${CDN}/additional_13_0fba4a02.jpeg` },
      { sectionKey: "space.wellness_g4", imageUrl: `${CDN}/additional_14_45d37618.jpeg` },
      { sectionKey: "space.wellness_g5", imageUrl: `${CDN}/additional_15_799aa50a.jpeg` },
      { sectionKey: "space.wellness_g6", imageUrl: `${CDN}/bathroom_half_1_5beeaa63.jpeg` },
      { sectionKey: "space.wellness_g7", imageUrl: `${CDN}/bathroom_half_2_ab702d14.jpeg` },
      { sectionKey: "space.wellness_g8", imageUrl: `${CDN}/garage_6fb8738e.jpeg` },

      // ===== LOCATION PAGE =====
      { sectionKey: "location.hero", title: "Location", subtitle: "Suluban Cliff, Uluwatu", imageUrl: `${CDN}/uluwatu-cliff-aerial-oNZekmYsnH9nNSqa8KvQJT.webp` },
      { sectionKey: "location.map", title: "Where We Are", body: "The Rang is located in the Bahari Complex on Suluban Cliff, Uluwatu — Bali's most prestigious coastal address." },
      { sectionKey: "location.travel", title: "Getting Here", body: "Airport: 45 min\nSeminyak: 50 min\nCanggu: 60 min\nUluwatu Temple: 10 min\nSuluban Beach: 5 min" },
      { sectionKey: "location.favourites", title: "Local Favourites", body: "Mana Uluwatu: Elevated dining with ocean views\nKala: Sunset cocktails on the cliff\nSingle Fin: Iconic surf bar" },

      // ===== TOUR PAGE =====
      { sectionKey: "tour.hero", title: "Virtual Tour", subtitle: "Explore The Rang in 3D", imageUrl: `${CDN}/living_room_1_1d0ea4f3.jpeg` },
      { sectionKey: "tour.embed", title: "Matterport Tour", body: "https://my.matterport.com/show/?m=iSm1iF9KDNC" },

      // ===== BOOKING PAGE =====
      { sectionKey: "booking.hero", title: "Book Your Stay", subtitle: "Experience The Rang Uluwatu", imageUrl: `${CDN}/bali-ocean-sunset-Z9rMjV67zYWT98s87jGFhB.webp` },
      { sectionKey: "booking.overview", title: "Villa Overview", body: "5 Bedrooms · 25m Pool · Sauna · Ice Bath · Ocean Views · Private Beach Access" },
      { sectionKey: "booking.services", title: "Included Services", imageUrl: `${CDN}/additional_8_84f7e0ce.jpeg` },
      { sectionKey: "booking.cta", title: "Ready to Experience The Rang?", body: "Book directly through Airbnb for the best rates and instant confirmation.", imageUrl: `${CDN}/hero_pool_view_1262a7be.jpeg` },

      // ===== PARTNERS PAGE =====
      { sectionKey: "partners.hero", title: "Guest Perks", subtitle: "Exclusive Partner Benefits", imageUrl: `${CDN}/additional_8_84f7e0ce.jpeg` },
    ];

    for (const s of sections) {
      await upsertContent(s);
    }
    console.log(`  ✓ Seeded ${sections.length} content sections`);
  } else {
    console.log("  ⏭ Content already exists, skipping");
  }

  // 3. Testimonials
  const existingTestimonials = await getAllTestimonials();
  if (existingTestimonials.length === 0) {
    const reviews = [
      {
        name: "Adi Priantana",
        source: "Google",
        text: "This villa exceeded all our expectations. The view of the ocean from the living area and pool is incredible. With 5 bedrooms, it was perfect for our group and gave everyone plenty of space and privacy. The atmosphere is relaxing and luxurious at the same time. The staff were kind and very helpful. It truly felt like a home away from home. One of the best villas we have ever stayed in!",
        rating: 5,
        sortOrder: 1,
      },
      {
        name: "Enrico",
        source: "Google",
        text: "Was lucky enough to spend a full week at The Rang. Best holiday accommodation I've ever been. Hands down! Coming to this villa feels like coming home! Great design, high-quality materials, nice colors, amazing details and an amazing view from every corner of the house! You can tell that someone has really put his mind and heart into every detail of this masterpiece to give you a 5-star experience!",
        rating: 5,
        sortOrder: 2,
      },
      {
        name: "Eric Schmidt",
        source: "Google",
        text: "An incredibly beautiful house in Uluwatu, Bali. The location is truly unique. We spent 7 days here with friends and family and had an amazing time. Each bedroom is very well equipped, similar to what you would expect in a 5-star hotel. The house management and cleaning staff are friendly, professional, and truly wonderful people to have around. Overall, we highly recommend it.",
        rating: 5,
        sortOrder: 3,
      },
    ];

    for (const r of reviews) {
      await createTestimonial(r);
    }
    console.log(`  ✓ Seeded ${reviews.length} testimonials`);
  } else {
    console.log("  ⏭ Testimonials already exist, skipping");
  }

  // 4. Partners
  const existingPartners = await getAllPartners();
  if (existingPartners.length === 0) {
    const partnerData = [
      {
        name: "Yuki",
        type: "Japanese Restaurant",
        perk: "15% lunch discount for The Rang guests",
        description: "Authentic Japanese cuisine with a modern twist, located just minutes from The Rang.",
        imageUrl: `${CDN}/yuki-restaurant_7375e42b.jpg`,
        website: "https://www.instagram.com/yuki.uluwatu/",
        sortOrder: 1,
      },
      {
        name: "Avli",
        type: "Greek Restaurant",
        perk: "10% discount + 1 complimentary drink per guest",
        description: "Mediterranean flavours meet Bali's sunset views. A favourite for evening dining.",
        imageUrl: `${CDN}/avli-restaurant_e212176e.webp`,
        website: "https://www.instagram.com/avli.bali/",
        sortOrder: 2,
      },
      {
        name: "Studio Fondue",
        type: "Pilates & Recovery",
        perk: "20% off all classes with code RANG20",
        description: "Premium Pilates studio offering reformer classes and recovery sessions.",
        imageUrl: `${CDN}/studio-fondue_7c614385.jpg`,
        website: "https://www.instagram.com/studiofondue/",
        sortOrder: 3,
      },
      {
        name: "Ulu Active",
        type: "Gym & Recovery",
        perk: "Exclusive guest access to gym and recovery facilities",
        description: "State-of-the-art fitness facility with ocean views and recovery amenities.",
        imageUrl: `${CDN}/ulu-active_d2d980b6.webp`,
        website: "https://www.instagram.com/uluactive/",
        sortOrder: 4,
      },
      {
        name: "Teja",
        type: "Modern European",
        perk: "Priority reservations for The Rang guests",
        description: "Modern European cuisine with Asian influences, set in a stunning clifftop location.",
        imageUrl: `${CDN}/teja-restaurant_3102cecd.png`,
        website: "https://www.instagram.com/teja.uluwatu/",
        sortOrder: 5,
      },
    ];

    for (const p of partnerData) {
      await createPartner(p);
    }
    console.log(`  ✓ Seeded ${partnerData.length} partners`);
  } else {
    console.log("  ⏭ Partners already exist, skipping");
  }

  // 5. Site links
  const existingLinks = await getAllLinks();
  if (existingLinks.length === 0) {
    const links = [
      { linkKey: "airbnb", label: "Airbnb Listing", url: "https://www.airbnb.com.au/rooms/1625996459378222841" },
      { linkKey: "instagram", label: "Instagram", url: "https://www.instagram.com/theranguluwatu" },
      { linkKey: "google_reviews", label: "Google Reviews", url: "https://share.google/8bJHJBoHSHolISFu5" },
      { linkKey: "matterport", label: "Matterport Tour", url: "https://my.matterport.com/show/?m=iSm1iF9KDNC" },
      { linkKey: "email", label: "Email", url: "mailto:info@theranguluwatu.com" },
    ];

    for (const l of links) {
      await upsertLink(l);
    }
    console.log(`  ✓ Seeded ${links.length} site links`);
  } else {
    console.log("  ⏭ Links already exist, skipping");
  }

  // 6. SEO settings
  const existingSeo = await getAllSeoSettings();
  if (existingSeo.length === 0) {
    const seo = [
      { pageKey: "home", title: "The Rang Uluwatu — Luxury Clifftop Villa in Bali", description: "Experience The Rang, a sculptural 5-bedroom luxury villa perched on Uluwatu's dramatic cliffs. Designed by Steven Kunz with 25m pool, sauna, and ocean views." },
      { pageKey: "space", title: "The Space — The Rang Uluwatu", description: "Explore The Rang's 5 bedrooms, infinity pool, sauna, and stunning living spaces designed with natural stone and ocean views." },
      { pageKey: "partners", title: "Guest Perks & Partners — The Rang Uluwatu", description: "Exclusive discounts and perks at Uluwatu's best restaurants, fitness studios, and experiences for The Rang guests." },
      { pageKey: "location", title: "Location — The Rang Uluwatu", description: "Located on Suluban Cliff in Uluwatu, Bali. Private beach access, world-class surf breaks, and minutes from the best restaurants." },
      { pageKey: "tour", title: "3D Virtual Tour — The Rang Uluwatu", description: "Take a virtual walkthrough of The Rang Uluwatu with our immersive 3D Matterport tour." },
      { pageKey: "booking", title: "Book Your Stay — The Rang Uluwatu", description: "Book The Rang Uluwatu on Airbnb. 5-bedroom luxury villa with 24-hour security, villa manager, and premium amenities." },
    ];

    for (const s of seo) {
      await upsertSeo(s);
    }
    console.log(`  ✓ Seeded ${seo.length} SEO settings`);
  } else {
    console.log("  ⏭ SEO settings already exist, skipping");
  }

  console.log("✅ Seed complete!");
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
