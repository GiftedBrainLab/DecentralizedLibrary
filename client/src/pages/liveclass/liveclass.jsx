/* eslint-disable jsx-a11y/media-has-caption */
import { React, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import { NavbarLive, Footer } from "../../components";
import GetCount from "../../components/GetCount";

import "../../hooks/styles.css";


export default function Liveclass() {
  // const router = useRouter();
  const [hlsUrl, setHlsUrl] = useState(
    "https://livepeercdn.com/hls/eb3ee78g7crzmczd/index.m3u8"
  );

  async function MoreBooks() {
    /* Link to Library Categories */
    <a href="https://livepeer.org/">Livepeer</a>;
    // router.push("/community");
  }
  return (
    <>
      <NavbarLive />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <br />
        <div className="md:items-center">
          <center>

            <h2 className="text-6xl font-bold leading-1 text-black-900 sm:text-5xl hover:opacity-25 pt-20"> Streaming Live</h2> <GetCount />

          </center>
        </div>
        <div className="w-full text-black font-bold pt-8 text-xl px-4 rounded text-justify">

          Note: The url below is the current live streaming url. If no livestream is active, you can enter a playback url in the textbox to watch a recoreded live session.

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4 item-center">

          <input
            type="text"
            className="text-red-500 font-bold py-2 text-xl px-12 rounded w-full my-4 mt-5 border-4 p-4"
            placeholder="HLS Url..."
            value={hlsUrl}
            aria-label="hls-url"
            aria-describedby="set-hls-url"
            onChange={(e) => setHlsUrl(e.target.value)}
          />
          <ReactHlsPlayer
            src={hlsUrl}
            autoPlay={false}
            controls
            className="object-fill item-center"
            width="100%"
            height="auto"
          />
          {/**
          <div className="-bg-white border shadow rounded-xl overflow-hidden">

            <video id="stream" className="object-fill h-400 w-full" width="100%" height="450px" controls>
              <source src="https://livepeercdn.com/hls/eb3ee78g7crzmczd/index.m3u8" type="application/x-mpegURL" />

            </video>
            <br /><br />
            <iframe
              title="livestream"
              src="src=https://lvpr.tv?v=eb3ee78g7crzmczd"
              // https://livepeercdn.com/hls/eb3ee78g7crzmczd/index.m3u8"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; encrypted-media; picture-in-picture"
              sandbox="allow-scripts"
              className="object-fill h-400 w-full"
              width="100%"
              height="450px"
            />

          </div>
           */}
          <div className="w-full text-red-500 font-bold py-2 text-base px-4 rounded">

            Note: Live streaming is currently open now but will be token gated in the future. Only those with the required access token/NFT will be able to access live streams.

          </div>
          <div className="pb-8 bg-black">
            <button type="button" className="w-full bg-red-500 text-white-500 font-bold py-2 text-xl px-12 rounded" onClick={() => MoreBooks()}>Live streaming proudly powered by <b>Livepeer Studio</b></button>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}

