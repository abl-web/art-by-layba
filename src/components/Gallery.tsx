import { useState, useRef } from "react";

type Artwork = {
  id: number;
  src: string;
  title: string;
  medium: string;
  size: string;
  year: string;
  price: string;
  status: "available" | "sold" | "private";
};

const artworks: Artwork[] = [
  { id: 1,  src: "/images/art-1.jpg",  title: "Painting 1",  medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 2,  src: "/images/art-2.jpg",  title: "Painting 2",  medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 3,  src: "/images/art-3.jpg",  title: "Painting 3",  medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 4,  src: "/images/art-4.jpg",  title: "Painting 4",  medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 5,  src: "/images/art-5.jpg",  title: "Painting 5",  medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 6,  src: "/images/art-6.jpg",  title: "Painting 6",  medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 7,  src: "/images/art-7.jpg",  title: "Painting 7",  medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 8,  src: "/images/art-8.jpg",  title: "Painting 8",  medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 9,  src: "/images/art-9.jpg",  title: "Painting 9",  medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 10, src: "/images/art-10.jpg", title: "Painting 10", medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 11, src: "/images/art-11.jpg", title: "Painting 11", medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 12, src: "/images/art-12.jpg", title: "Painting 12", medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 13, src: "/images/art-13.jpg", title: "Painting 13", medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 14, src: "/images/art-14.jpg", title: "Painting 14", medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 15, src: "/images/art-15.jpg", title: "Painting 15", medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 16, src: "/images/art-16.jpg", title: "Painting 16", medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 17, src: "/images/art-17.jpg", title: "Painting 17", medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
  { id: 18, src: "/images/art-18.jpg", title: "Painting 18", medium: "Oil on canvas", size: '20" × 20"', year: "2025", price: "PKR 40,000", status: "available" },
];

const filters = ["All", "Available", "Sold"] as const;
type Filter = (typeof filters)[number];

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<Artwork | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const filtered = artworks.filter((a) => {
    if (filter === "All") return true;
    if (filter === "Available") return a.status === "available";
    if (filter === "Sold") return a.status === "sold" || a.status === "private";
    return true;
  });

  // Reset carousel index when filter changes
  const handleFilterChange = (f: Filter) => {
    setFilter(f);
    setCarouselIndex(0);
  };

  const prevSlide = () =>
    setCarouselIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const nextSlide = () =>
    setCarouselIndex((i) => (i + 1) % filtered.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? nextSlide() : prevSlide();
    touchStartX.current = null;
  };

  const currentArtwork = filtered[carouselIndex] ?? null;

  return (
    <section id="gallery" className="py-24 md:py-36 px-6 md:px-10 bg-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Gallery</h2>
          <p className="text-warm-gray max-w-xl mx-auto">
            A collection of original works available for purchase. Each piece is one-of-a-kind.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-5 py-2 rounded-full text-sm tracking-wide transition-all duration-200 ${
                filter === f
                  ? "bg-charcoal text-ivory"
                  : "border border-charcoal/30 text-charcoal hover:border-charcoal"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-warm-gray py-20">No artworks in this category.</p>
        )}

        {/* ── MOBILE / TABLET: Carousel (hidden on lg+) ── */}
        {currentArtwork && (
          <div className="lg:hidden">
            <div
              className="relative select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Image */}
              <div
                className="aspect-square overflow-hidden rounded-sm bg-stone-100 cursor-pointer"
                onClick={() => setLightbox(currentArtwork)}
              >
                <img
                  src={currentArtwork.src}
                  alt={currentArtwork.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>

              {/* Prev / Next arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal w-9 h-9 flex items-center justify-center rounded-full shadow transition-colors"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal w-9 h-9 flex items-center justify-center rounded-full shadow transition-colors"
                aria-label="Next"
              >
                ›
              </button>
            </div>

            {/* Info row */}
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="font-serif text-charcoal text-lg">{currentArtwork.title}</h3>
                <p className="text-warm-gray text-sm">{currentArtwork.medium} · {currentArtwork.year}</p>
              </div>
              <div className="text-right">
                <p className="text-charcoal font-medium text-sm">{currentArtwork.price}</p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    currentArtwork.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-stone-200 text-stone-500"
                  }`}
                >
                  {currentArtwork.status === "available" ? "Available" : "Sold"}
                </span>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-1.5 mt-5 flex-wrap">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === carouselIndex ? "bg-charcoal scale-125" : "bg-charcoal/25"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <p className="text-center text-warm-gray text-sm mt-3">
              {carouselIndex + 1} / {filtered.length}
            </p>
          </div>
        )}

        {/* ── DESKTOP: Grid (hidden below lg) ── */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {filtered.map((artwork) => (
            <div
              key={artwork.id}
              className="group cursor-pointer"
              onClick={() => setLightbox(artwork)}
            >
              <div className="overflow-hidden rounded-sm aspect-square bg-stone-100">
                <img
                  src={artwork.src}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-charcoal text-lg">{artwork.title}</h3>
                  <p className="text-warm-gray text-sm">{artwork.medium} · {artwork.year}</p>
                </div>
                <div className="text-right">
                  <p className="text-charcoal font-medium text-sm">{artwork.price}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      artwork.status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-stone-200 text-stone-500"
                    }`}
                  >
                    {artwork.status === "available" ? "Available" : "Sold"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <div
              className="bg-white max-w-3xl w-full rounded-sm overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-square">
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal">{lightbox.title}</h3>
                  <p className="text-warm-gray">{lightbox.medium} · {lightbox.size} · {lightbox.year}</p>
                </div>
                <div className="text-right">
                  <p className="text-charcoal font-semibold text-lg">{lightbox.price}</p>
                  <button
                    className="mt-2 bg-charcoal text-ivory text-sm px-4 py-2 hover:bg-charcoal/80 transition-colors"
                    onClick={() => setLightbox(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
