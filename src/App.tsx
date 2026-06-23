import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import About from "./components/About";
import OrderSystem from "./components/OrderSystem";
import Footer from "./components/Footer";
import site from "./content/site.json";

export default function App() {
  useEffect(() => {
    document.title = site.siteTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", site.seoDescription);
  }, []);

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <About />
        <OrderSystem />
      </main>
      <Footer />
    </div>
  );
}
