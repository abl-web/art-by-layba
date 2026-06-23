import site from "../content/site.json";
const artistPortrait = "/images/artist-portrait.jpg";
const artistStudio = "/images/artist-studio.jpg";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36 bg-cream relative overflow-hidden grain">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 md:gap-20 items-center relative">
        {/* Images */}
        <div className="relative">
          <div className="relative z-10 max-w-sm mx-auto md:mx-0">
            <img
              src={artistPortrait}
              alt="Layba Amjad, fine artist"
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-wine/10 -z-10" />
          </div>
          <div className="hidden md:block absolute top-1/3 -right-4 w-44 aspect-square z-20 shadow-xl">
            <img
              src={artistStudio}
              alt="Layba in her studio"
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
            {site.aboutTitle}
          </h2>
          <p className="mt-2 font-serif italic text-xl text-wine">
            {site.aboutSubtitle}
          </p>

          <div className="mt-8 space-y-5 text-charcoal/80 leading-relaxed font-light">
            {site.about.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          {/* Education & credentials */}
          <div className="mt-10 grid sm:grid-cols-2 gap-6 pt-8 border-t border-parchment">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-taupe">
                Education
              </p>
              <p className="mt-2 font-serif italic text-xl text-ink">
                Bachelor of Fine Arts
              </p>
              <p className="text-sm text-charcoal/70 mt-1">
                Lahore College for Women University (LCWU), Lahore
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-taupe">Medium</p>
              <p className="mt-2 font-serif italic text-xl text-ink">
                Oil · Acrylic · Ink
              </p>
              <p className="text-sm text-charcoal/70 mt-1">
                Canvas, linen & archival paper
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-taupe">Based in</p>
              <p className="mt-2 font-serif italic text-xl text-ink">Lahore, Pakistan</p>
              <p className="text-sm text-charcoal/70 mt-1">Ships worldwide</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-taupe">Instagram</p>
              <a
                href="https://www.instagram.com/art_by_layba/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-serif italic text-xl text-wine hover:text-wine-dark"
              >
                @art_by_layba
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
