import site from "../content/site.json";

export default function About() {
  const a = site.about;
  if (!a.visible) return null;

  return (
    <section id="about" className="py-24 md:py-36 bg-cream relative overflow-hidden grain">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 md:gap-20 items-center relative">
        {/* Images */}
        <div className="relative">
          <div className="relative z-10 max-w-sm mx-auto md:mx-0">
            <img
              src={a.image1}
              alt={a.image1Alt}
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-wine/10 -z-10" />
          </div>
          <div className="hidden md:block absolute top-1/3 -right-4 w-44 aspect-square z-20 shadow-xl">
            <img
              src={a.image2}
              alt={a.image2Alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-taupe mb-4">
            — About the Artist
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-ink leading-[1.05]">
            {a.sectionTitle}
          </h2>
          <p className="mt-2 font-serif italic text-xl text-wine">
            {a.sectionSubtitle}
          </p>

          <div className="mt-8 space-y-5 text-charcoal/80 leading-relaxed font-light">
            {a.biography.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-6 pt-8 border-t border-parchment">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-taupe">Education</p>
              <p className="mt-2 font-serif italic text-xl text-ink">{a.education}</p>
              <p className="text-sm text-charcoal/70 mt-1">{a.educationInstitution}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-taupe">Medium</p>
              <p className="mt-2 font-serif italic text-xl text-ink">{a.medium}</p>
              <p className="text-sm text-charcoal/70 mt-1">{a.mediumNote}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-taupe">Based in</p>
              <p className="mt-2 font-serif italic text-xl text-ink">{a.location}</p>
              <p className="text-sm text-charcoal/70 mt-1">Ships worldwide</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-taupe">Instagram</p>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-serif italic text-xl text-wine hover:text-wine-dark"
              >
                {site.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
