import site from "../content/site.json";

export default function Footer() {
  const f = site.footer;
  const year = new Date().getFullYear();
  const copyright = f.copyrightText.replace("{year}", String(year));

  return (
    <footer id="contact" className="bg-ink text-ivory relative overflow-hidden grain">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-3 gap-14">
          {/* Brand */}
          <div>
            <h3 className="font-display text-4xl leading-none">{f.artistName}</h3>
            <p className="mt-2 text-xs uppercase tracking-[0.4em] text-gold-light">
              {f.tagline}
            </p>
            <p className="mt-6 text-ivory/60 text-sm leading-relaxed max-w-xs">
              {f.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-light mb-4">Explore</p>
            <ul className="space-y-3 text-ivory/80 text-sm">
              {f.links
                .filter((l) => l.visible !== false)
                .map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="hover:text-gold-light transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-light mb-4">
              Get in touch
            </p>
            <ul className="space-y-3 text-ivory/80 text-sm">
              <li>
                <a
                  href={f.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light transition-colors flex items-center gap-2"
                >
                  <InstagramIcon />
                  {f.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${f.email}`}
                  className="hover:text-gold-light transition-colors flex items-center gap-2"
                >
                  <MailIcon />
                  {f.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <PinIcon />
                {f.location}
              </li>
            </ul>

            <a
              href="#commissions"
              className="mt-8 inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-ink text-sm px-6 py-3 rounded-full transition-colors"
            >
              {site.commissions.enquiryButtonLabel} →
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ivory/50">
          <p>{copyright}</p>
          <p className="font-serif italic">{f.quote}</p>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 2.16c-3.14 0-3.51.01-4.75.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.26.82-.38.38-.62.75-.82 1.26-.15.39-.33.97-.38 2.04-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.07.23 1.65.38 2.04.2.51.44.88.82 1.26.38.38.75.62 1.26.82.39.15.97.33 2.04.38 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.26-.82.38-.38.62-.75.82-1.26.15-.39.33-.97.38-2.04.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.07-.23-1.65-.38-2.04-.2-.51-.44-.88-.82-1.26-.38-.38-.75-.62-1.26-.82-.39-.15-.97-.33-2.04-.38-1.24-.06-1.61-.07-4.75-.07zm0 3.68a3.96 3.96 0 110 7.92 3.96 3.96 0 010-7.92zm0 6.54a2.58 2.58 0 100-5.16 2.58 2.58 0 000 5.16zm5.04-6.7a.92.92 0 11-1.85 0 .92.92 0 011.85 0z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}
