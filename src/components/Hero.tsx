import site from "../content/site.json";

export default function Hero() {
  const h = site.hero;
  if (!h.visible) return null;

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={h.image}
          alt={h.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/80" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-10 pt-40">
        <div className="max-w-7xl mx-auto w-full text-ivory">
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-ivory/70 animate-fade-up">
            {h.eyebrow}
          </p>
          <h1
            className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.95] mt-6 animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            {h.heading} <br />
            <span className="italic font-serif font-light">{h.headingItalic}</span>.
          </h1>
          <p
            className="max-w-xl mt-8 text-lg md:text-xl text-ivory/80 font-light leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {h.subheading}
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: "0.45s" }}
          >
            <a
              href={h.primaryButtonHref}
              className="inline-flex items-center justify-center gap-2 bg-ivory text-ink hover:bg-gold-light hover:text-ink px-8 py-4 rounded-full text-sm tracking-wide transition-colors"
            >
              {h.primaryButtonLabel}
            </a>
            <a
              href={h.secondaryButtonHref}
              className="inline-flex items-center justify-center gap-2 border border-ivory/40 hover:border-ivory hover:bg-ivory/10 text-ivory px-8 py-4 rounded-full text-sm tracking-wide transition-colors"
            >
              {h.secondaryButtonLabel}
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/60 animate-shimmer">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-10 bg-ivory/40" />
        </div>
      </div>
    </section>
  );
}
