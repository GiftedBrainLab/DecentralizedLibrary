import { NavbarLive, Footer, Stream } from "../../components";

const Live = () => (
  <div className="bg-gradient-to-b from-blue-700 to-black">
    <NavbarLive />
    <div className="text-4xl text-center text-white font-bold  mb-10">
      <h1> Live Stream Page</h1>
    </div>
    <Stream />
    <Footer />
  </div>
);

export default Live;
