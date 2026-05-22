const schengenCountries = [
  "AUSTRIA",
  "CROATIA",
  "CZECH REPUBLIC",
  "DENMARK",
  "FINLAND",
  "FRANCE",
  "GERMANY",
  "GREECE",
  "HUNGARY",
  "ITALY",
  "LATVIA",
  "LITHUANIA",
  "MALTA",
  "NETHERLANDS",
  "POLAND",
  "SLOVAKIA",
  "SLOVENIA",
  "SPAIN",
  "SWEDEN",
];

const nonSchengenCountries = [
  "KAZAKHSTAN",
  "JAPAN",
  "UZBEKISTAN",
  "MALAYSIA",
  "SINGAPORE",
  "MAURITIUS",
  "GEORGIA",
  "ALBANIA",
  "UK",
  "CANADA",
  "SWITZERLAND",
];

function Row({ items, className = "" }: { items: string[]; className?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden mask-fade">
      <div className={`flex gap-12 w-max ${className}`}>
        {doubled.map((it, i) => (
          <div
            key={i}
            className="font-display text-2xl sm:text-3xl text-foreground/55 hover:text-mint transition-colors whitespace-nowrap py-2"
          >
            {it}
            <span className="text-mint/40 ml-12">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Nations() {
  return (
    <section id="nations" className="relative py-32 overflow-hidden">
      <style>{`
        .mask-fade {
          mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-mint">Nations</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-tight">
            Explore study destinations{" "}
            <span className="italic text-gradient-mint">across the globe</span>.
          </h2>
        </div>
      </div>

      <div className="mt-16 space-y-8">
        <div>
          <div className="mx-auto max-w-7xl px-6 mb-4">
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/50">
              SCHENGEN COUNTRIES
            </p>
          </div>
          <Row items={schengenCountries} className="marquee" />
        </div>

        <div>
          <div className="mx-auto max-w-7xl px-6 mb-4">
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/50">
              Non-Schengen and Asian Countries
            </p>
          </div>
          <Row items={nonSchengenCountries} className="marquee-slow" />
        </div>
      </div>
    </section>
  );
}
