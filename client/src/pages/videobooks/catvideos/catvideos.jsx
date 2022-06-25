/* eslint-disable jsx-a11y/anchor-is-valid */
import { React } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../../../components";
import actions from "../../../data/catevideodata";

// eslint-disable-next-line no-unused-vars
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CatVideos() {
  const navigate = useNavigate();
  return (
    <div className=" bg-gray-500 mt-14">
      <Navbar />

      <div className="max-w-3xl bg-gray-500 mx-auto px-4 sm:px-6 lg:px-12 mt-14">
        <br />
        <div className="md:items-center">
          <center>
            <br />
            <h2 className="text-6xl font-bold leading-1 text-black-900 sm:text-5xl hover:opacity-25">Video Books Categories</h2>
            <br />
            <br />
          </center>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-20 mt-10">
          {actions.map((person) => (
            <div
              key={person.name}
              className="relative rounded-lg border-2 border-gray-700 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:bg-red-400 focus-within:ring-6 focus-within:ring-offset-6 focus-within:ring-indigo-900"
            >
              <div className="flex-shrink-0">
                <person.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <a
                  className="focus:outline-none text-center"
                  onClick={() => { navigate(person.href); }}
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-md font-medium text-gray-900">{person.name}</p>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
}
