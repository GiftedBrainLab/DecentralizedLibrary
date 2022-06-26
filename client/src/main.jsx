import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import App from "./App";
// import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";
import TraversePage from "./pages/traverse/traverse";
import Coming from "./pages/comingsoon/comingsoon";
import Liveclass from "./pages/liveclass/liveclass";
import CreateEbook from "./pages/create-ebook/create-ebook";
import Create from "./pages/create/create";
import CreateVideo from "./pages/create-videobook/create-videobook";
import Catebooks from "./pages/catebooks/catebooks";
import PhysicalScienceEbooks from "./pages/physicalscience/physicalscience";
import CsBooks from "./pages/csbooks/csbooks";
import ReadBook from "./pages/reading/reading";
import CsVideos from "./pages/csvideos/csvideos";
import WatchVideos from "./pages/watching/watching";
import CatVideos from "./pages/catvideos/catvideos";
import PhysicalVideos from "./pages/physicalvid/physicalvid";
import Mint from "./mint/mint";

ReactDOM.render(
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<App />} />
      <Route path="traverse" element={<TraversePage />} />
      <Route path="liveclass" element={<Liveclass />} />
      <Route path="create" element={<Create />} />
      <Route path="coming-soon" element={<Coming />} />

      <Route path="mint" element={<Mint />} />
      <Route path="create-videobook" element={<CreateVideo />} />

      <Route path="catebooks" element={<Catebooks />} />
      <Route path="create-ebook" element={<CreateEbook />} />
      <Route path="physical-science" element={<PhysicalScienceEbooks />} />
      <Route path="csbooks" element={<CsBooks />} />
      <Route path="reading" element={<ReadBook />} />
      <Route path="csvideos" element={<CsVideos />} />
      <Route path="watching" element={<WatchVideos />} />
      <Route path="catvideos" element={<CatVideos />} />
      <Route path="physicalvid" element={<PhysicalVideos />} />

    </Routes>
  </BrowserRouter>,
  document.getElementById("root"),
);
