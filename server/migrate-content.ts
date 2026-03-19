/**
 * Migration script — adds missing content sections to the database.
 * Safe to run multiple times (uses upsert).
 */
import "dotenv/config";
import { upsertContent } from "./db";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028985962/YUz2cqTs4AvjUqQvfTGS37";

async function migrateContent() {
  console.log("📦 Adding missing content sections...");

  const sections = [
    // Hero video
    { sectionKey: "home.hero_video", title: "Hero Video", imageUrl: `${CDN}/hero-video_b6863f29.mp4` },
    // Features
    { sectionKey: "home.feature_1", title: "Modern Design", body: "Sculptural architecture by Steven Kunz, with a curved façade unlike any other in Uluwatu.", imageUrl: `${CDN}/additional_2_9e6ce51b.jpeg` },
    { sectionKey: "home.feature_2", title: "Infinity Pool", body: "A stunning 25-meter lap pool finished with hand-cut marble tiling.", imageUrl: `${CDN}/infinity-pool-ocean-acCdzZRHLqou6ZYkfrkQ79.webp` },
    { sectionKey: "home.feature_3", title: "Wellness", body: "Custom-built sauna crafted from premium hardwoods and a professional ice bath.", imageUrl: `${CDN}/luxury-sauna-wellness-J6g6hBg6657XkKUcSNjxro.webp` },
    { sectionKey: "home.feature_4", title: "Ocean Views", body: "Elevated ocean views overlooking the Uluwatu surf break \"Race Tracks.\"", imageUrl: `${CDN}/balcony_1134c415.jpeg` },
    { sectionKey: "home.feature_5", title: "Beach Access", body: "Private staircase access toward Suluban Beach with paddle access to iconic breaks.", imageUrl: `${CDN}/uluwatu-cliff-aerial-oNZekmYsnH9nNSqa8KvQJT.webp` },
    { sectionKey: "home.feature_6", title: "Comfort", body: "Full double-glazed system for thermal efficiency and a quiet, meditative interior.", imageUrl: `${CDN}/living_room_1_1d0ea4f3.jpeg` },
    { sectionKey: "home.feature_7", title: "Natural Aesthetic", body: "Extensive use of local natural stone, creating a grounded and organic aesthetic.", imageUrl: `${CDN}/additional_4_b8fbfef5.jpeg` },
    { sectionKey: "home.feature_8", title: "Indoor-Outdoor Flow", body: "Expansive indoor–outdoor living with multiple terraces and lounge areas.", imageUrl: `${CDN}/additional_1_69fa140a.jpeg` },
    // Gallery images
    { sectionKey: "home.gallery_1", title: "Gallery 1", imageUrl: `${CDN}/hero_pool_view_1262a7be.jpeg` },
    { sectionKey: "home.gallery_2", title: "Gallery 2", imageUrl: `${CDN}/bedroom_master_751b6a2d.jpeg` },
    { sectionKey: "home.gallery_3", title: "Gallery 3", imageUrl: `${CDN}/kitchen_18227ee9.jpeg` },
    { sectionKey: "home.gallery_4", title: "Gallery 4", imageUrl: `${CDN}/dining_area_e45aac0d.jpeg` },
    { sectionKey: "home.gallery_5", title: "Gallery 5", imageUrl: `${CDN}/pool_a63e1e38.jpeg` },
    { sectionKey: "home.gallery_6", title: "Gallery 6", imageUrl: `${CDN}/additional_1_69fa140a.jpeg` },
    { sectionKey: "home.gallery_7", title: "Gallery 7", imageUrl: `${CDN}/additional_5_ad208b16.jpeg` },
    { sectionKey: "home.gallery_8", title: "Gallery 8", imageUrl: `${CDN}/additional_10_24ef198e.jpeg` },
    // Space page
    { sectionKey: "space.overview", title: "The Villa", subtitle: "A Sculptural Masterpiece", imageUrl: `${CDN}/hero_pool_view_1262a7be.jpeg` },
    { sectionKey: "space.pool", title: "Infinity Pool & Deck", subtitle: "25-Meter Marble-Tiled Lap Pool", imageUrl: `${CDN}/pool_a63e1e38.jpeg` },
    { sectionKey: "space.living", title: "Living & Dining", subtitle: "Open-Plan Indoor-Outdoor Living", imageUrl: `${CDN}/living_room_1_1d0ea4f3.jpeg` },
    { sectionKey: "space.master", title: "Master Suite", subtitle: "Ocean-View Private Retreat", imageUrl: `${CDN}/bedroom_master_751b6a2d.jpeg` },
    { sectionKey: "space.bedrooms", title: "Guest Bedrooms", subtitle: "Five Beautifully Appointed Rooms", imageUrl: `${CDN}/bedroom_2_f3d3a9f3.jpeg` },
    { sectionKey: "space.wellness", title: "Wellness & Outdoor", subtitle: "Sauna, Ice Bath & Ocean Terraces", imageUrl: `${CDN}/luxury-sauna-wellness-J6g6hBg6657XkKUcSNjxro.webp` },
    // Location page
    { sectionKey: "location.hero", title: "Location", subtitle: "Suluban Cliff, Uluwatu", imageUrl: `${CDN}/uluwatu-cliff-aerial-oNZekmYsnH9nNSqa8KvQJT.webp` },
    { sectionKey: "location.map", title: "Where We Are", body: "The Rang is located in the Bahari Complex on Suluban Cliff, Uluwatu — Bali's most prestigious coastal address." },
    { sectionKey: "location.travel", title: "Getting Here", body: "Airport: 45 min\nSeminyak: 50 min\nCanggu: 60 min\nUluwatu Temple: 10 min\nSuluban Beach: 5 min" },
    { sectionKey: "location.favourites", title: "Local Favourites", body: "Mana Uluwatu: Elevated dining with ocean views\nKala: Sunset cocktails on the cliff\nSingle Fin: Iconic surf bar" },
    // Tour page
    { sectionKey: "tour.hero", title: "Virtual Tour", subtitle: "Explore The Rang in 3D", imageUrl: `${CDN}/living_room_1_1d0ea4f3.jpeg` },
    { sectionKey: "tour.embed", title: "Matterport Tour", body: "https://my.matterport.com/show/?m=iSm1iF9KDNC" },
    // Booking page
    { sectionKey: "booking.hero", title: "Book Your Stay", subtitle: "Experience The Rang Uluwatu", imageUrl: `${CDN}/bali-ocean-sunset-Z9rMjV67zYWT98s87jGFhB.webp` },
    { sectionKey: "booking.overview", title: "Villa Overview", body: "5 Bedrooms · 25m Pool · Sauna · Ice Bath · Ocean Views · Private Beach Access" },
    { sectionKey: "booking.services", title: "Included Services", imageUrl: `${CDN}/additional_8_84f7e0ce.jpeg` },
    { sectionKey: "booking.cta", title: "Ready to Experience The Rang?", body: "Book directly through Airbnb for the best rates and instant confirmation.", imageUrl: `${CDN}/hero_pool_view_1262a7be.jpeg` },
    // Partners page
    { sectionKey: "partners.hero", title: "Guest Perks", subtitle: "Exclusive Partner Benefits", imageUrl: `${CDN}/additional_8_84f7e0ce.jpeg` },
  ];

  let added = 0;
  for (const s of sections) {
    try {
      await upsertContent(s);
      added++;
    } catch (err) {
      console.error(`  ✗ Failed to upsert ${s.sectionKey}:`, err);
    }
  }
  console.log(`  ✓ Upserted ${added} content sections`);
  console.log("✅ Migration complete!");
  process.exit(0);
}

migrateContent().catch(err => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
