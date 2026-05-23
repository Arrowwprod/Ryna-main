import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

type Country = {
  name: string;
  // alternate names from the topojson `name` property
  aliases?: string[];
  capital: string;
  blurb: string;
  image: string;
};

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const countries: Country[] = [
  {
    name: "United Kingdom",
    aliases: ["England", "UK"],
    capital: "London",
    blurb: "World-class universities, vibrant student cities.",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Slovenia",
    capital: "Ljubljana",
    blurb: "Alpine campuses, affordable living, EU access.",
    image:
      "https://images.unsplash.com/photo-1601280081951-7d2c668d2972?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Croatia",
    capital: "Zagreb",
    blurb: "Adriatic coast, growing English-taught programs.",
    image:
      "https://images.unsplash.com/photo-1555990538-32b58a44b1ed?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Czechia",
    aliases: ["Czech Republic"],
    capital: "Prague",
    blurb: "Historic Prague, strong STEM faculties.",
    image:
      "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Malta",
    capital: "Valletta",
    blurb: "English-speaking island, Mediterranean climate.",
    image:
      "https://images.unsplash.com/photo-1601641254003-3a8fa6bbab3a?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Spain",
    capital: "Madrid",
    blurb: "Diverse cities, vibrant culture, EU degrees.",
    image:
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Denmark",
    capital: "Copenhagen",
    blurb: "Design-led education, high quality of life.",
    image:
      "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Germany",
    capital: "Berlin",
    blurb: "Tuition-free public universities, research powerhouse.",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Bulgaria",
    capital: "Sofia",
    blurb: "Affordable EU education, growing tech scene.",
    image:
      "https://images.unsplash.com/photo-1656864644512-c468caf75ffe?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Lithuania",
    capital: "Vilnius",
    blurb: "Baltic charm, modern campuses, low costs.",
    image:
      "https://images.unsplash.com/photo-1561579137-fb6acd45ad7b?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Sweden",
    capital: "Stockholm",
    blurb: "Innovation hub, sustainability focus.",
    image:
      "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Latvia",
    capital: "Riga",
    blurb: "Art-nouveau Riga, English-taught degrees.",
    image:
      "https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Austria",
    capital: "Vienna",
    blurb: "Vienna's heritage, top music & medical schools.",
    image:
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Finland",
    capital: "Helsinki",
    blurb: "Education leader, free thinking, nature.",
    image:
      "https://images.unsplash.com/photo-1559682468-a6a29e7d9517?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Slovakia",
    capital: "Bratislava",
    blurb: "Central European hub, affordable studies.",
    image:
      "https://images.unsplash.com/photo-1577132498849-90f6e1b1ca57?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Mauritius",
    capital: "Port Louis",
    blurb: "Tropical island campuses, bilingual environment.",
    image:
      "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Malaysia",
    capital: "Kuala Lumpur",
    blurb: "Asia hub, affordable international branches.",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "France",
    capital: "Paris",
    blurb: "Renowned culinary arts, fashion, and business schools.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Greece",
    capital: "Athens",
    blurb: "Classical heritage, medical and archaeological studies.",
    image:
      "https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Hungary",
    capital: "Budapest",
    blurb: "Stunning architecture, affordable medical degrees.",
    image:
      "https://images.unsplash.com/photo-1518884968853-29497d3910c2?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Italy",
    capital: "Rome",
    blurb: "World-class design, architecture, and art academies.",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Netherlands",
    capital: "Amsterdam",
    blurb: "Highly ranked English programs, research leadership.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Poland",
    capital: "Warsaw",
    blurb: "Modern universities, vibrant culture, low living costs.",
    image:
      "https://images.unsplash.com/photo-1512076244538-654dbb83e602?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Kazakhstan",
    capital: "Astana",
    blurb: "Central Asian hub, growing engineering & IT programs.",
    image:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Japan",
    capital: "Tokyo",
    blurb: "Top-tier tech and research, unique cultural experience.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Uzbekistan",
    capital: "Tashkent",
    blurb: "Historic Silk Road campuses, expanding global links.",
    image:
      "https://images.unsplash.com/photo-1616088288599-281b9549f2b8?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Singapore",
    capital: "Singapore",
    blurb: "Global financial hub, world-class university systems.",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Georgia",
    capital: "Tbilisi",
    blurb: "Bridging Europe and Asia, popular for medical studies.",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Albania",
    capital: "Tirana",
    blurb: "Mediterranean coast, affordable European education.",
    image:
      "https://images.unsplash.com/photo-1580997189473-b1d7d2427ba6?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Canada",
    capital: "Ottawa",
    blurb: "Diverse campuses, excellent post-graduation options.",
    image:
      "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=70",
  },
  {
    name: "Switzerland",
    capital: "Bern",
    blurb: "World-renowned hospitality, banking, and science hubs.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=70",
  },
];

const countryByName = new Map<string, Country>();
for (const c of countries) {
  countryByName.set(c.name.toLowerCase(), c);
  c.aliases?.forEach((a) => countryByName.set(a.toLowerCase(), c));
}

export function Countries() {
  const [hovered, setHovered] = useState<Country | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(countries[0]);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Preload all country images in the background so they appear instantly
    countries.forEach((c) => {
      const img = new Image();
      img.src = c.image;
    });
  }, []);

  return (
    <section id="countries" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-coral font-semibold">Where you can go</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl leading-tight">
              31 destinations. <span className="italic text-gradient-sky">One runway.</span>
            </h2>
          </div>
          <p className="text-foreground/60 max-w-sm text-sm">
            Select or hover a highlighted country to preview the destination — from Baltic forests to tropical
            islands.
          </p>
        </div>

        {/* Mobile Horizontal Country Selector */}
        <div className="md:hidden overflow-x-auto scrollbar-none py-2 flex gap-2 mb-6">
          {countries.map((c) => {
            const isSelected = selectedCountry?.name === c.name;
            return (
              <button
                key={c.name}
                onClick={() => {
                  setSelectedCountry(c);
                  setHovered(c);
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 ${
                  isSelected
                    ? "bg-gradient-sunset text-foreground border-transparent shadow-[var(--shadow-soft)]"
                    : "glass border-border/40 text-foreground/80 hover:text-foreground hover:bg-card/50"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        <div className="mx-auto max-w-4xl w-full">
          {/* Map */}
          <div
            className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-coral/5"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            onMouseLeave={() => setHovered(null)}
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 130 }}
              style={{ width: "100%", height: "auto", touchAction: "pan-y" }}
            >
              <ZoomableGroup center={[20, 30]} zoom={1} disablePanning disableZooming>
                <Geographies geography={GEO_URL}>
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo: any) => {
                      const name = (geo.properties.name || "").toLowerCase();
                      const match = countryByName.get(name);
                      const isActive = hovered?.name === match?.name || selectedCountry?.name === match?.name;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => match && setHovered(match)}
                          onClick={() => {
                            if (match) {
                              setSelectedCountry(match);
                              setHovered(match);
                            }
                          }}
                          style={{
                            default: {
                              fill: match
                                ? isActive
                                  ? "oklch(0.72 0.18 30)" // coral
                                  : "oklch(0.55 0.16 235)" // sky
                                : "oklch(0.94 0.018 75)",
                              stroke: "oklch(0.985 0.012 80)",
                              strokeWidth: 0.5,
                              outline: "none",
                              transition: "fill 200ms ease",
                              cursor: match ? "pointer" : "default",
                            },
                            hover: {
                              fill: match ? "oklch(0.72 0.18 30)" : "oklch(0.9 0.02 75)",
                              outline: "none",
                            },
                            pressed: { fill: "oklch(0.72 0.18 30)", outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            {/* Floating popup card - desktop only */}
            <div
              className={`hidden md:block pointer-events-none absolute z-10 w-56 rounded-xl border border-border bg-card shadow-lg overflow-hidden transition-all duration-200 ease-out ${
                hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
              style={{
                left: Math.min(pos.x + 16, 9999),
                top: pos.y + 16,
                transform: "translateZ(0)",
              }}
            >
              {hovered && (
                <>
                  <img
                    src={hovered.image}
                    alt={hovered.name}
                    className="w-full h-24 object-cover bg-foreground/5"
                  />
                  <div className="p-3">
                    <div className="font-display text-base leading-tight">{hovered.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/50 mt-0.5">
                      {hovered.capital}
                    </div>
                    <p className="mt-1.5 text-xs text-foreground/70 leading-snug">
                      {hovered.blurb}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Static Details Card */}
        {selectedCountry && (
          <div className="md:hidden mt-6 glass rounded-2xl overflow-hidden border border-border/40 shadow-lg animate-fade-in">
            <div className="flex flex-col sm:flex-row">
              <img
                src={selectedCountry.image}
                alt={selectedCountry.name}
                className="w-full sm:w-1/3 h-44 sm:h-auto object-cover bg-foreground/5"
              />
              <div className="p-5 flex-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-coral font-semibold">
                  Destination Capital: {selectedCountry.capital}
                </span>
                <h3 className="font-display text-xl mt-1.5">{selectedCountry.name}</h3>
                <p className="mt-2.5 text-sm text-foreground/75 leading-relaxed">
                  {selectedCountry.blurb}
                </p>
                <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-mint hover:underline"
                  >
                    Discuss {selectedCountry.name} Pathway &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
