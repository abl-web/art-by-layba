import { useMemo, useState } from "react";

type ArtType = "portrait" | "landscape" | "abstract" | "custom" | "";
type Size = "small" | "medium" | "large" | "xl" | "";
type Medium = "oil" | "acrylic" | "watercolor" | "mixed" | "";

const artTypes: { id: ArtType; label: string; desc: string; icon: string }[] = [
  {
    id: "portrait",
    label: "Portrait",
    desc: "From a photograph or live sitting",
    icon: "👤",
  },
  {
    id: "landscape",
    label: "Landscape",
    desc: "Cities, nature, architecture",
    icon: "🏞",
  },
  {
    id: "abstract",
    label: "Abstract",
    desc: "Colour, texture and mood",
    icon: "🎨",
  },
  {
    id: "custom",
    label: "Custom Concept",
    desc: "Something entirely your own",
    icon: "✨",
  },
];

const sizes: {
  id: Size;
  label: string;
  dims: string;
  base: number;
}[] = [
  { id: "small", label: "Small", dims: 'up to 16" × 20"', base: 25000 },
  { id: "medium", label: "Medium", dims: 'up to 24" × 30"', base: 45000 },
  { id: "large", label: "Large", dims: 'up to 36" × 48"', base: 85000 },
  { id: "xl", label: "Statement", dims: "over 36\" × 48\"", base: 130000 },
];

const mediums: { id: Medium; label: string; factor: number; note: string }[] = [
  { id: "oil", label: "Oil on canvas", factor: 1.2, note: "Rich, timeless, slow-drying" },
  { id: "acrylic", label: "Acrylic on canvas", factor: 1.0, note: "Versatile & vibrant" },
  { id: "watercolor", label: "Watercolor on paper", factor: 0.7, note: "Soft, ethereal" },
  { id: "mixed", label: "Mixed media / gold leaf", factor: 1.35, note: "Textured, layered" },
];

const timelines = [
  { id: "standard", label: "Standard (6–8 weeks)", factor: 1.0 },
  { id: "priority", label: "Priority (3–4 weeks)", factor: 1.25 },
  { id: "express", label: "Express (2 weeks)", factor: 1.5 },
];

type FormState = {
  artType: ArtType;
  size: Size;
  medium: Medium;
  description: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  budget: string;
  notes: string;
};

const initial: FormState = {
  artType: "",
  size: "",
  medium: "",
  description: "",
  timeline: "standard",
  name: "",
  email: "",
  phone: "",
  city: "",
  budget: "",
  notes: "",
};

export default function OrderSystem() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const totalSteps = 4;

  const estimate = useMemo(() => {
    const s = sizes.find((x) => x.id === form.size);
    const m = mediums.find((x) => x.id === form.medium);
    const t = timelines.find((x) => x.id === form.timeline);
    if (!s || !m || !t) return null;
    const total = Math.round(s.base * m.factor * t.factor);
    return total;
  }, [form.size, form.medium, form.timeline]);

  const canProceed = () => {
    if (step === 1) return form.artType !== "";
    if (step === 2) return form.size !== "" && form.medium !== "";
    if (step === 3) return form.description.trim().length >= 10;
    if (step === 4)
      return form.name.trim() && form.email.includes("@") && form.phone.trim();
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(false);
    try {
      const body = new URLSearchParams({
        "form-name": "commission-request",
        "bot-field": "",
        name: form.name,
        email: form.email,
        phone: form.phone,
        city: form.city,
        artType: form.artType,
        size: form.size,
        medium: form.medium,
        timeline: form.timeline,
        budget: form.budget,
        description: form.description,
        notes: form.notes,
        estimate: estimate ? `PKR ${estimate.toLocaleString()}` : "—",
      });
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm(initial);
    setStep(1);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <section id="commissions" className="py-24 md:py-36 px-6 md:px-10 bg-ivory">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-wine/10 flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-wine"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.4em] text-taupe">
            Request Received
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-ink mt-4 leading-tight">
            Thank you, <span className="italic font-serif">{form.name.split(" ")[0]}</span>.
          </h2>
          <p className="mt-6 text-charcoal/70 leading-relaxed">
            Your commission request has been received. Layba will review the brief and
            get back to you at <span className="font-medium">{form.email}</span> within
            48 hours with a detailed quote and next steps.
          </p>

          <div className="mt-10 bg-cream border border-parchment p-8 text-left">
            <h3 className="font-serif italic text-2xl text-ink mb-4">Order Summary</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-parchment/60">
                <dt className="text-taupe">Type</dt>
                <dd className="text-charcoal capitalize">{form.artType}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-parchment/60">
                <dt className="text-taupe">Size</dt>
                <dd className="text-charcoal capitalize">{form.size}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-parchment/60">
                <dt className="text-taupe">Medium</dt>
                <dd className="text-charcoal capitalize">{form.medium.replace("_", " ")}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-parchment/60">
                <dt className="text-taupe">Timeline</dt>
                <dd className="text-charcoal capitalize">{form.timeline}</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-taupe font-medium">Estimated price</dt>
                <dd className="text-wine font-display text-xl">
                  PKR {estimate?.toLocaleString() ?? "—"}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-charcoal/60 italic">
              * This is an estimate. The final quote may vary based on complexity.
            </p>
          </div>

          <button
            onClick={reset}
            className="mt-10 text-sm text-charcoal/70 underline hover:text-wine"
          >
            Submit another request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="commissions" className="py-24 md:py-36 px-6 md:px-10 bg-ivory">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-taupe mb-4">
            — Bespoke Commissions
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-ink leading-none">
            Commission a Painting
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-charcoal/70 font-light leading-relaxed">
            Tell me about the piece you'd like created. I'll respond within 48 hours with
            a detailed quote, timeline and sketch concepts.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex justify-between text-xs uppercase tracking-wider text-taupe mb-3">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-[2px] bg-parchment overflow-hidden">
            <div
              className="h-full bg-wine transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-cream border border-parchment p-8 md:p-12">
          {/* STEP 1: Art type */}
          {step === 1 && (
            <div className="animate-fade-up">
              <h3 className="font-serif italic text-3xl md:text-4xl text-ink">
                What would you like painted?
              </h3>
              <p className="mt-2 text-sm text-charcoal/60">Choose one to continue.</p>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {artTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setForm({ ...form, artType: t.id })}
                    className={`text-left p-6 border-2 transition-all ${
                      form.artType === t.id
                        ? "border-wine bg-ivory"
                        : "border-parchment hover:border-taupe bg-ivory/50"
                    }`}
                  >
                    <span className="text-3xl">{t.icon}</span>
                    <p className="mt-3 font-serif italic text-xl text-ink">{t.label}</p>
                    <p className="mt-1 text-sm text-charcoal/60">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Size & medium */}
          {step === 2 && (
            <div className="animate-fade-up space-y-10">
              <div>
                <h3 className="font-serif italic text-3xl text-ink">Size</h3>
                <div className="mt-5 grid sm:grid-cols-2 gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setForm({ ...form, size: s.id })}
                      className={`text-left p-5 border-2 transition-all ${
                        form.size === s.id
                          ? "border-wine bg-ivory"
                          : "border-parchment hover:border-taupe bg-ivory/50"
                      }`}
                    >
                      <p className="font-serif text-lg text-ink">{s.label}</p>
                      <p className="text-xs text-taupe mt-1">{s.dims}</p>
                      <p className="text-sm text-wine mt-2 font-medium">
                        from PKR {s.base.toLocaleString()}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif italic text-3xl text-ink">Medium</h3>
                <div className="mt-5 grid sm:grid-cols-2 gap-3">
                  {mediums.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setForm({ ...form, medium: m.id })}
                      className={`text-left p-5 border-2 transition-all ${
                        form.medium === m.id
                          ? "border-wine bg-ivory"
                          : "border-parchment hover:border-taupe bg-ivory/50"
                      }`}
                    >
                      <p className="font-serif text-lg text-ink">{m.label}</p>
                      <p className="text-xs text-taupe mt-1">{m.note}</p>
                    </button>
                  ))}
                </div>
              </div>

              {estimate !== null && (
                <div className="bg-ivory border border-gold/30 p-5 flex justify-between items-center">
                  <span className="text-sm text-charcoal/70">Estimated starting at</span>
                  <span className="font-display text-2xl text-wine">
                    PKR {estimate.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Description + timeline */}
          {step === 3 && (
            <div className="animate-fade-up space-y-8">
              <div>
                <h3 className="font-serif italic text-3xl text-ink">
                  Describe your vision
                </h3>
                <p className="mt-2 text-sm text-charcoal/60">
                  Mood, colours, subject, a reference photo link — anything helps.
                </p>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="E.g., a warm, impressionist portrait of my parents on their anniversary. Soft earth tones, something timeless…"
                  className="mt-4 w-full h-44 p-4 bg-ivory border border-parchment focus:border-wine focus:outline-none text-charcoal placeholder:text-taupe/60 font-light leading-relaxed"
                />
              </div>

              <div>
                <h3 className="font-serif italic text-2xl text-ink">When do you need it?</h3>
                <div className="mt-4 grid sm:grid-cols-3 gap-3">
                  {timelines.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setForm({ ...form, timeline: t.id })}
                      className={`text-left p-4 border-2 transition-all ${
                        form.timeline === t.id
                          ? "border-wine bg-ivory"
                          : "border-parchment hover:border-taupe bg-ivory/50"
                      }`}
                    >
                      <p className="font-serif text-base text-ink">{t.label}</p>
                      {t.factor > 1 && (
                        <p className="text-xs text-wine mt-1">
                          +{Math.round((t.factor - 1) * 100)}% rush fee
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-charcoal/80 mb-2">
                  Your budget range <span className="text-taupe">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  placeholder="e.g. PKR 50,000 – 80,000"
                  className="w-full p-3 bg-ivory border border-parchment focus:border-wine focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Contact + review */}
          {step === 4 && (
            <div className="animate-fade-up space-y-8">
              <div>
                <h3 className="font-serif italic text-3xl text-ink">Where should I reply?</h3>
                <div className="mt-5 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-taupe mb-2">
                      Full name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-3 bg-ivory border border-parchment focus:border-wine focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-taupe mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full p-3 bg-ivory border border-parchment focus:border-wine focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-taupe mb-2">
                      Phone (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full p-3 bg-ivory border border-parchment focus:border-wine focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-taupe mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Lahore, Karachi, Dubai…"
                      className="w-full p-3 bg-ivory border border-parchment focus:border-wine focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs uppercase tracking-wider text-taupe mb-2">
                    Anything else?
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    placeholder="Gift note, delivery date, questions…"
                    className="w-full p-3 bg-ivory border border-parchment focus:border-wine focus:outline-none font-light"
                  />
                </div>
              </div>

              {/* Summary card */}
              <div className="bg-ivory border border-parchment p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-taupe mb-3">
                  Your commission
                </p>
                <dl className="text-sm space-y-1.5">
                  <div className="flex justify-between">
                    <dt className="text-taupe">Type</dt>
                    <dd className="capitalize">{form.artType}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-taupe">Size</dt>
                    <dd className="capitalize">{form.size}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-taupe">Medium</dt>
                    <dd className="capitalize">{form.medium.replace("_", " ")}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-taupe">Timeline</dt>
                    <dd className="capitalize">{form.timeline}</dd>
                  </div>
                </dl>
                <div className="mt-4 pt-4 border-t border-parchment flex justify-between items-baseline">
                  <span className="text-sm text-taupe">Estimated from</span>
                  <span className="font-display text-2xl text-wine">
                    PKR {estimate?.toLocaleString() ?? "—"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-10 flex justify-between items-center">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1 || submitting}
              className="text-sm text-charcoal/60 hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Back
            </button>

            <div className="flex flex-col items-end gap-2">
              {submitError && (
                <p className="text-xs text-red-500">Something went wrong — please try again.</p>
              )}
              {step < totalSteps ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="bg-wine hover:bg-wine-dark text-ivory text-sm px-8 py-3 rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || submitting}
                  className="bg-ink hover:bg-charcoal text-ivory text-sm px-8 py-3 rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? "Sending…" : "Submit Request"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
