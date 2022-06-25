/* eslint-disable jsx-a11y/media-has-caption */
import { React } from "react";
import { Navbar } from "../../components";

export default function Liveclass() {
  // const router = useRouter();

  async function MoreBooks() {
    /* Link to Library Categories */

    // router.push("/community");
  }
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <br />
        <div className="md:items-center">
          <center>

            <h2 className="text-6xl font-bold leading-1 text-black-900 sm:text-5xl hover:opacity-25"> Streaming Live Class</h2>

          </center>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">

          <div className="-bg-white border shadow rounded-xl overflow-hidden">
            <video id="stream" className="object-fill h-400 w-full" width="100%" height="450px" controls>
              <source src="https://cdn.livepeer.com/hls/12c8kni7n2mjt3cp/index.m3u8" type="application/x-mpegURL" />
            </video>
            <div className="p-4 bg-black">
              <button type="button" className="w-full bg-blue-500 text-white font-bold py-2 px-12 rounded" onClick={() => MoreBooks()}>contact us to schedule a live class</button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

