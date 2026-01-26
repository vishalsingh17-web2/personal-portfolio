import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

import { Navbar } from "./components/sections/Navbar";
import { NeuralNetworkBackground } from "./components/visuals";

function App() {
  return (
    <>
      <NeuralNetworkBackground />
      <div className="min-h-screen text-foreground relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />

          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
