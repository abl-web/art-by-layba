import { useEffect, useState } from "react";
import site from "../content/site.json";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = site.nav.filter((l) => l.visible !== false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/90 backdrop-blur-md border-b border-parchment/60 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-display text-2xl md:text-3xl tracking-wider text-ink">
            {site.logoText}
          </span>
          <span className="text-[10px] uppercase tracking-[0.35em] text-taupe mt-1">
            {site.logoSubtext}
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm tracking-wide text-charcoal/80 hover:text-wine transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-wine transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={site.navCtaHref}
          className="hidden md:inline-flex items-center gap-2 bg-wine hover:bg-wine-dark text-ivory text-sm px-5 py-2.5 rounded-full transition-colors"
        >
          {site.navCtaLabel}
          <span aria-hidden>→</span>
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-ink p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-[1.5px] bg-ink mb-1.5" />
          <div className="w-6 h-[1.5px] bg-ink mb-1.5" />
          <div className="w-4 h-[1.5px] bg-ink ml-auto" />
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ivory/95 backdrop-blur border-t border-parchment">
          <ul className="flex flex-col p-6 gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  onClick={() => setOpen(false)}
                  href={l.href}
                  className="block text-lg font-serif text-charcoal"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <a
              href={site.navCtaHref}
              onClick={() => setOpen(false)}
              className="inline-block text-center mt-2 bg-wine text-ivory py-3 rounded-full"
            >
              {site.navCtaLabel}
            </a>
          </ul>
        </div>
      )}
    </header>
  );
}
