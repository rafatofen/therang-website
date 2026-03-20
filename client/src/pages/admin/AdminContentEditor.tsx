/**
 * Admin Content Editor — Edit ALL page content with image/video upload
 * Organized by page tabs. Each section is expandable with text fields + media upload.
 */
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Save, ChevronDown, ChevronRight, Plus, Film, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/ImageUpload";

// Define all pages and their expected sections
const PAGE_STRUCTURE: Record<string, { label: string; sections: { key: string; label: string; fields: string[] }[] }> = {
  home: {
    label: "Home Page",
    sections: [
      { key: "home.hero", label: "Hero Section", fields: ["title", "subtitle", "body", "buttonText", "buttonLink", "imageUrl"] },
      { key: "home.hero_video", label: "Hero Video", fields: ["imageUrl"] },
      { key: "home.philosophy", label: "Philosophy Section", fields: ["title", "subtitle", "body", "buttonText", "buttonLink", "imageUrl"] },
      { key: "home.experience", label: "Experience Section", fields: ["title", "subtitle", "body"] },
      { key: "home.feature_1", label: "Feature: Modern Design", fields: ["title", "body", "imageUrl"] },
      { key: "home.feature_2", label: "Feature: Infinity Pool", fields: ["title", "body", "imageUrl"] },
      { key: "home.feature_3", label: "Feature: Wellness", fields: ["title", "body", "imageUrl"] },
      { key: "home.feature_4", label: "Feature: Ocean Views", fields: ["title", "body", "imageUrl"] },
      { key: "home.feature_5", label: "Feature: Beach Access", fields: ["title", "body", "imageUrl"] },
      { key: "home.feature_6", label: "Feature: Comfort", fields: ["title", "body", "imageUrl"] },
      { key: "home.feature_7", label: "Feature: Natural Aesthetic", fields: ["title", "body", "imageUrl"] },
      { key: "home.feature_8", label: "Feature: Indoor-Outdoor Flow", fields: ["title", "body", "imageUrl"] },
      { key: "home.location", label: "Location Section", fields: ["title", "subtitle", "body", "buttonText", "buttonLink", "imageUrl"] },
      { key: "home.booking", label: "Booking CTA", fields: ["title", "subtitle", "body", "buttonText", "imageUrl"] },
      { key: "home.gallery_1", label: "Gallery Image 1", fields: ["imageUrl"] },
      { key: "home.gallery_2", label: "Gallery Image 2", fields: ["imageUrl"] },
      { key: "home.gallery_3", label: "Gallery Image 3", fields: ["imageUrl"] },
      { key: "home.gallery_4", label: "Gallery Image 4", fields: ["imageUrl"] },
      { key: "home.gallery_5", label: "Gallery Image 5", fields: ["imageUrl"] },
      { key: "home.gallery_6", label: "Gallery Image 6", fields: ["imageUrl"] },
      { key: "home.gallery_7", label: "Gallery Image 7", fields: ["imageUrl"] },
      { key: "home.gallery_8", label: "Gallery Image 8", fields: ["imageUrl"] },
    ],
  },
  space: {
    label: "Space Page",
    sections: [
      // Section 1: The Villa (hero + 4 grid)
      { key: "space.overview", label: "The Villa — Hero", fields: ["title", "subtitle", "imageUrl"] },
      { key: "space.overview_g1", label: "The Villa — Grid 1", fields: ["imageUrl"] },
      { key: "space.overview_g2", label: "The Villa — Grid 2", fields: ["imageUrl"] },
      { key: "space.overview_g3", label: "The Villa — Grid 3", fields: ["imageUrl"] },
      { key: "space.overview_g4", label: "The Villa — Grid 4", fields: ["imageUrl"] },
      // Section 2: Infinity Pool (hero + 4 grid)
      { key: "space.pool", label: "Infinity Pool — Hero", fields: ["title", "subtitle", "imageUrl"] },
      { key: "space.pool_g1", label: "Infinity Pool — Grid 1", fields: ["imageUrl"] },
      { key: "space.pool_g2", label: "Infinity Pool — Grid 2", fields: ["imageUrl"] },
      { key: "space.pool_g3", label: "Infinity Pool — Grid 3", fields: ["imageUrl"] },
      { key: "space.pool_g4", label: "Infinity Pool — Grid 4", fields: ["imageUrl"] },
      // Section 3: Living & Dining (hero + 4 grid)
      { key: "space.living", label: "Living & Dining — Hero", fields: ["title", "subtitle", "imageUrl"] },
      { key: "space.living_g1", label: "Living & Dining — Grid 1", fields: ["imageUrl"] },
      { key: "space.living_g2", label: "Living & Dining — Grid 2", fields: ["imageUrl"] },
      { key: "space.living_g3", label: "Living & Dining — Grid 3", fields: ["imageUrl"] },
      { key: "space.living_g4", label: "Living & Dining — Grid 4", fields: ["imageUrl"] },
      // Section 4: Master Suite (hero + 3 grid)
      { key: "space.master", label: "Master Suite — Hero", fields: ["title", "subtitle", "imageUrl"] },
      { key: "space.master_g1", label: "Master Suite — Grid 1", fields: ["imageUrl"] },
      { key: "space.master_g2", label: "Master Suite — Grid 2", fields: ["imageUrl"] },
      { key: "space.master_g3", label: "Master Suite — Grid 3", fields: ["imageUrl"] },
      // Section 5: Guest Bedrooms (hero + 7 grid)
      { key: "space.bedrooms", label: "Guest Bedrooms — Hero", fields: ["title", "subtitle", "imageUrl"] },
      { key: "space.bedrooms_g1", label: "Guest Bedrooms — Grid 1", fields: ["imageUrl"] },
      { key: "space.bedrooms_g2", label: "Guest Bedrooms — Grid 2", fields: ["imageUrl"] },
      { key: "space.bedrooms_g3", label: "Guest Bedrooms — Grid 3", fields: ["imageUrl"] },
      { key: "space.bedrooms_g4", label: "Guest Bedrooms — Grid 4", fields: ["imageUrl"] },
      { key: "space.bedrooms_g5", label: "Guest Bedrooms — Grid 5", fields: ["imageUrl"] },
      { key: "space.bedrooms_g6", label: "Guest Bedrooms — Grid 6", fields: ["imageUrl"] },
      { key: "space.bedrooms_g7", label: "Guest Bedrooms — Grid 7", fields: ["imageUrl"] },
      // Section 6: Wellness & Outdoor (hero + 8 grid)
      { key: "space.wellness", label: "Wellness & Outdoor — Hero", fields: ["title", "subtitle", "imageUrl"] },
      { key: "space.wellness_g1", label: "Wellness & Outdoor — Grid 1", fields: ["imageUrl"] },
      { key: "space.wellness_g2", label: "Wellness & Outdoor — Grid 2", fields: ["imageUrl"] },
      { key: "space.wellness_g3", label: "Wellness & Outdoor — Grid 3", fields: ["imageUrl"] },
      { key: "space.wellness_g4", label: "Wellness & Outdoor — Grid 4", fields: ["imageUrl"] },
      { key: "space.wellness_g5", label: "Wellness & Outdoor — Grid 5", fields: ["imageUrl"] },
      { key: "space.wellness_g6", label: "Wellness & Outdoor — Grid 6", fields: ["imageUrl"] },
      { key: "space.wellness_g7", label: "Wellness & Outdoor — Grid 7", fields: ["imageUrl"] },
      { key: "space.wellness_g8", label: "Wellness & Outdoor — Grid 8", fields: ["imageUrl"] },
    ],
  },
  location: {
    label: "Location Page",
    sections: [
      { key: "location.hero", label: "Hero Section", fields: ["title", "subtitle", "imageUrl"] },
      { key: "location.map", label: "Intro Section (title = heading, body = text)", fields: ["title", "body"] },
      { key: "location.key_features", label: "Key Features (one per line)", fields: ["body"] },
      { key: "location.travel", label: "Travel Times (format: Place: 45 min)", fields: ["title", "body"] },
      { key: "location.favourites", label: "Local Favourites (format: Name: Description)", fields: ["title", "body", "imageUrl"] },
      { key: "location.nearby_surf", label: "Nearby: Surf Breaks (format: Name: distance)", fields: ["title", "body"] },
      { key: "location.nearby_dining", label: "Nearby: Dining (format: Name: distance)", fields: ["title", "body"] },
      { key: "location.nearby_wellness", label: "Nearby: Wellness & Fitness (format: Name: distance)", fields: ["title", "body"] },
      { key: "location.nearby_landmarks", label: "Nearby: Landmarks (format: Name: distance)", fields: ["title", "body"] },
      { key: "location.cta", label: "CTA Section", fields: ["title", "body", "buttonText", "imageUrl"] },
    ],
  },
  tour: {
    label: "3D Tour Page",
    sections: [
      { key: "tour.hero", label: "Hero Section", fields: ["title", "subtitle", "imageUrl"] },
      { key: "tour.embed", label: "Matterport Embed URL", fields: ["body"] },
      { key: "tour.highlight_1", label: "Highlight 1 — Living Spaces", fields: ["title", "body", "imageUrl"] },
      { key: "tour.highlight_2", label: "Highlight 2 — Infinity Pool", fields: ["title", "body", "imageUrl"] },
      { key: "tour.highlight_3", label: "Highlight 3 — Master Suite", fields: ["title", "body", "imageUrl"] },
    ],
  },
  booking: {
    label: "Booking Page",
    sections: [
      { key: "booking.hero", label: "Hero Section", fields: ["title", "subtitle", "imageUrl"] },
      { key: "booking.overview", label: "Villa Overview Text", fields: ["title", "body"] },
      { key: "booking.spec_guests", label: "Spec: Guests", fields: ["title", "body"] },
      { key: "booking.spec_bedrooms", label: "Spec: Bedrooms", fields: ["title", "body"] },
      { key: "booking.spec_bathrooms", label: "Spec: Bathrooms", fields: ["title", "body"] },
      { key: "booking.spec_area", label: "Spec: Living Area", fields: ["title", "body"] },
      { key: "booking.spec_parking", label: "Spec: Parking", fields: ["title", "body"] },
      { key: "booking.spec_pool", label: "Spec: Pool", fields: ["title", "body"] },
      { key: "booking.service_1", label: "Service 1", fields: ["title", "body"] },
      { key: "booking.service_2", label: "Service 2", fields: ["title", "body"] },
      { key: "booking.service_3", label: "Service 3", fields: ["title", "body"] },
      { key: "booking.service_4", label: "Service 4", fields: ["title", "body"] },
      { key: "booking.services", label: "Services Section Image", fields: ["imageUrl"] },
      { key: "booking.included", label: "What's Included (one item per line)", fields: ["body"] },
      { key: "booking.house_rules", label: "House Rules (one rule per line)", fields: ["body"] },
      { key: "booking.cta", label: "Booking CTA", fields: ["title", "body", "imageUrl"] },
    ],
  },
  partners: {
    label: "Partners Page",
    sections: [
      { key: "partners.hero", label: "Hero Section", fields: ["title", "subtitle", "imageUrl"] },
    ],
  },
};

const FIELD_LABELS: Record<string, string> = {
  title: "Title",
  subtitle: "Subtitle / Label",
  body: "Body Text",
  buttonText: "Button Text",
  buttonLink: "Button Link",
  imageUrl: "Image / Video",
};

const FIELD_HINTS: Record<string, string> = {
  "home.hero_video.imageUrl": "Upload the hero background video (MP4) or paste a video URL",
  "home.hero.imageUrl": "Hero poster image (shown while video loads)",
  "tour.embed.body": "Paste the full Matterport embed URL (e.g., https://my.matterport.com/show/?m=YOUR_ID)",
  "location.key_features.body": "One feature per line. E.g.: Unmatched cliffside vistas",
  "location.travel.body": "One per line. Format: Place Name: 45 min. E.g.: Airport: 35 min",
  "location.favourites.body": "One per line. Format: Name: Description. E.g.: Mana Uluwatu: Great sunsets",
  "location.favourites.imageUrl": "Image shown next to local favourites section",
  "location.nearby_surf.body": "One per line. Format: Name: distance. E.g.: Race Tracks: Direct view from villa",
  "location.nearby_dining.body": "One per line. Format: Name: distance. E.g.: Single Fin: 3 min walk",
  "location.nearby_wellness.body": "One per line. Format: Name: distance. E.g.: Studio Fondue: 5 min drive",
  "location.nearby_landmarks.body": "One per line. Format: Name: distance. E.g.: Uluwatu Temple: 10 min drive",
  "booking.included.body": "One item per line. E.g.: Daily housekeeping",
  "booking.house_rules.body": "One rule per line. E.g.: Check-in: 3:00 PM",
  "booking.spec_guests.body": "Value shown in the box. E.g.: 10",
  "booking.spec_bedrooms.body": "Value shown in the box. E.g.: 5",
  "booking.spec_bathrooms.body": "Value shown in the box. E.g.: 5.5",
  "booking.spec_area.body": "Value shown in the box. E.g.: 500+ sqm",
  "booking.spec_parking.body": "Value shown in the box. E.g.: 1 car + 10 scooters",
  "booking.spec_pool.body": "Value shown in the box. E.g.: 25m infinity",
};

export default function AdminContentEditor() {
  const { data: allContent, isLoading, refetch } = trpc.content.getAll.useQuery();
  const updateMutation = trpc.content.update.useMutation({
    onSuccess: () => {
      toast.success("Content saved successfully");
      refetch();
    },
    onError: (err) => toast.error(err.message || "Failed to save content"),
  });

  const [activePage, setActivePage] = useState("home");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState<Record<string, boolean>>({});

  // Build a lookup map from DB content
  const contentMap: Record<string, any> = {};
  if (allContent) {
    for (const c of allContent) {
      contentMap[c.sectionKey] = c;
    }
  }

  const getVal = (sectionKey: string, field: string): string => {
    const editKey = `${sectionKey}.${field}`;
    if (editValues[editKey] !== undefined) return editValues[editKey];
    const dbVal = contentMap[sectionKey]?.[field];
    return dbVal || "";
  };

  const setVal = (sectionKey: string, field: string, value: string) => {
    const editKey = `${sectionKey}.${field}`;
    setEditValues(prev => ({ ...prev, [editKey]: value }));
    setHasChanges(prev => ({ ...prev, [sectionKey]: true }));
  };

  const handleSave = (sectionKey: string, fields: string[]) => {
    const data: any = { sectionKey };
    for (const f of fields) {
      const editKey = `${sectionKey}.${f}`;
      data[f] = editValues[editKey] !== undefined ? editValues[editKey] : (contentMap[sectionKey]?.[f] || "");
    }
    updateMutation.mutate(data, {
      onSuccess: () => {
        // Clear the hasChanges flag for this section
        setHasChanges(prev => ({ ...prev, [sectionKey]: false }));
        // Clear editValues for this section so they don't persist after refetch
        setEditValues(prev => {
          const next = { ...prev };
          for (const f of fields) {
            delete next[`${sectionKey}.${f}`];
          }
          return next;
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-white/40" size={24} />
      </div>
    );
  }

  const currentPage = PAGE_STRUCTURE[activePage];

  return (
    <div className="space-y-6">
      {/* Page description */}
      <div>
        <p className="text-white/40 text-sm mb-4">
          Edit text, images, and videos for every section of the website. Changes appear on the live site immediately after saving.
        </p>
      </div>

      {/* Page tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(PAGE_STRUCTURE).map(([key, page]) => (
          <button
            key={key}
            onClick={() => {
              setActivePage(key);
              setExpandedSection(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activePage === key
                ? "bg-white text-black"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
            }`}
          >
            {page.label}
          </button>
        ))}
      </div>

      {/* Sections for active page */}
      <div className="space-y-3">
        {currentPage.sections.map((section) => {
          const isExpanded = expandedSection === section.key;
          const hasData = !!contentMap[section.key];
          const isModified = hasChanges[section.key];
          const isImageOnly = section.fields.length === 1 && section.fields[0] === "imageUrl";

          return (
            <div key={section.key} className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedSection(isExpanded ? null : section.key)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {isImageOnly ? (
                      <ImageIcon size={14} className="text-white/30" />
                    ) : contentMap[section.key]?.imageUrl ? (
                      <Film size={14} className="text-white/30" />
                    ) : null}
                    <p className="text-white/90 font-medium text-sm">{section.label}</p>
                  </div>
                  {isModified && (
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] rounded-full uppercase tracking-wide">
                      Unsaved
                    </span>
                  )}
                  {!hasData && (
                    <span className="px-2 py-0.5 bg-white/5 text-white/25 text-[10px] rounded-full uppercase tracking-wide">
                      Empty
                    </span>
                  )}
                </div>
                {isExpanded ? <ChevronDown size={16} className="text-white/40" /> : <ChevronRight size={16} className="text-white/40" />}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-5 border-t border-white/5 pt-5">
                  {section.fields.map((field) => {
                    const hintKey = `${section.key}.${field}`;
                    const hint = FIELD_HINTS[hintKey];

                    if (field === "imageUrl") {
                      return (
                        <ImageUpload
                          key={field}
                          currentUrl={getVal(section.key, field)}
                          onUpload={(url) => setVal(section.key, field, url)}
                          label={FIELD_LABELS[field] || field}
                          aspectHint={
                            section.key.includes("gallery") ? "1:1 (square)" :
                            section.key.includes("hero") ? "16:9 (widescreen)" :
                            section.key.includes("feature") ? "3:4 (portrait)" :
                            "16:9"
                          }
                          accept={
                            section.key === "home.hero_video"
                              ? "video/mp4,video/webm"
                              : "image/*,video/mp4,video/webm"
                          }
                        />
                      );
                    }

                    if (field === "body") {
                      return (
                        <div key={field}>
                          <Label className="text-white/60 text-xs uppercase tracking-wide">
                            {FIELD_LABELS[field]}
                          </Label>
                          {hint && <p className="text-white/25 text-xs mt-0.5 mb-1">{hint}</p>}
                          <Textarea
                            value={getVal(section.key, field)}
                            onChange={(e) => setVal(section.key, field, e.target.value)}
                            rows={5}
                            className="mt-1.5 bg-white/5 border-white/10 text-white resize-y"
                            placeholder="Enter body text..."
                          />
                        </div>
                      );
                    }

                    return (
                      <div key={field}>
                        <Label className="text-white/60 text-xs uppercase tracking-wide">
                          {FIELD_LABELS[field] || field}
                        </Label>
                        {hint && <p className="text-white/25 text-xs mt-0.5 mb-1">{hint}</p>}
                        <Input
                          value={getVal(section.key, field)}
                          onChange={(e) => setVal(section.key, field, e.target.value)}
                          className="mt-1.5 bg-white/5 border-white/10 text-white"
                          placeholder={`Enter ${(FIELD_LABELS[field] || field).toLowerCase()}...`}
                        />
                      </div>
                    );
                  })}

                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={() => handleSave(section.key, section.fields)}
                      disabled={updateMutation.isPending}
                      className="bg-white text-black hover:bg-white/90"
                    >
                      {updateMutation.isPending ? (
                        <Loader2 className="animate-spin mr-2" size={14} />
                      ) : (
                        <Save size={14} className="mr-2" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
