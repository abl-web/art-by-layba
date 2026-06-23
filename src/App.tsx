import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import About from "./components/About";
import OrderSystem from "./components/OrderSystem";
import Footer from "./components/Footer";

export default function App() {
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
