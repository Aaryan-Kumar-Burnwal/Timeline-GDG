import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen font-ProductSans">
      <Navbar />
      <Hero />
      <Timeline />
      <Footer />
    </main>
  );
}
