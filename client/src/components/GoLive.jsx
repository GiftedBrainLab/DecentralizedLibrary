/* eslint-disable max-len */
import React from "react";
import { Link } from "react-router-dom";

const GoLive = () => (

  <div className="bg-white-100 ">
    <div className="space-x-1 text-sm sm:text-base sm:space-x-3">
      <Link to="liveclass">
        <button
          type="button"
          className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-orange-500 hover:text-white-500 transition-all hover:shadow-orange"
          onClick=""
        >
          Stream Live
        </button>
      </Link>
    </div>

  </div>
);

export default GoLive;
