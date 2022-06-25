import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import App from "./App";
// import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";
import TraversePage from "./pages/traverse/traverse";
import Coming from "./pages/comingsoon/comingsoon";
import Liveclass from "./pages/liveclass/liveclass";
import CreateEbook from "./pages/ebooks/create-ebook/create-ebook";
import Create from "./pages/create/create";
import CreateVideo from "./pages/videobooks/create-videobook/create-videobook";
import Catebooks from "./pages/ebooks/catebooks/catebooks";
import PhysicalScienceEbooks from "./pages/ebooks/physicalscience/physicalscience";
import CsBooks from "./pages/ebooks/csbooks/csbooks";
import ReadBook from "./pages/ebooks/reading/reading";
import CsVideos from "./pages/videobooks/csvideos/csvideos";
import WatchVideos from "./pages/videobooks/watching/watching";
import CatVideos from "./pages/videobooks/catvideos/catvideos";
import PhysicalVideos from "./pages/videobooks/physicalvid/physicalvid";
import Mint from "./mint/mint";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="create" element={<Create />} />
      <Route path="mint" element={<Mint />} />
      <Route path="traverse" element={<TraversePage />} />
      <Route path="videobooks/create-videobook" element={<CreateVideo />} />
      <Route path="coming-soon" element={<Coming />} />
      <Route path="liveclass" element={<Liveclass />} />
      <Route path="ebooks/catebooks" element={<Catebooks />} />
      <Route path="ebooks/create-ebook" element={<CreateEbook />} />
      <Route path="ebooks/physical-science" element={<PhysicalScienceEbooks />} />
      <Route path="ebooks/csbooks" element={<CsBooks />} />
      <Route path="ebooks/reading" element={<ReadBook />} />
      <Route path="videobooks/csvideos" element={<CsVideos />} />
      <Route path="videobooks/watching" element={<WatchVideos />} />
      <Route path="videobooks/catvideos" element={<CatVideos />} />
      <Route path="videobooks/physicalvid" element={<PhysicalVideos />} />

    </Routes>
  </BrowserRouter>,
  document.getElementById("root"),
);
