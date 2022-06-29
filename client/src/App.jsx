import { Navbar, Footer, Hero, Feature, Pricing, Roadmap } from "./components";

const App = () => (
  <div className="min-h-screen ">
    <div className="bg-test-gray">
      <Navbar />
      <Hero />
      <Feature />
      <Pricing />
      <Roadmap />
      <Footer />
    </div>
  </div>
);

export default App;
