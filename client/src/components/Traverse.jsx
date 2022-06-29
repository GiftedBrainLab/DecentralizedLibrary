/* eslint-disable max-len */
import React from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "./misc/ButtonPrimary";

const Traverse = () => (
  <div className="max-w-screen-xl mt-32 sm:mt-20 px-8 xl:px-16 mx-auto" id="about">
    <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 md:grid-rows-1 sm:grid-cols-1 gap-8 py-6 sm:py-16  ">
      <div className=" flex flex-col  items-center justify-center items-start row-start-1 sm:row-start-1">
        <h3 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
          Which Item collection do you wish to traverse.
        </h3> <br /> <br />

        <div className="flex flex-col sm:flex-row w-full sm:my-5 sm:ml-2 sm:mr-2 sm:space-x-8 space-y-4 sm:space-y-0 text-lg sm:text-xl md:text-2xl item-justify-center">
          <Link to="/catebooks" className="w-full">
            <ButtonPrimary>Traverse Ebooks</ButtonPrimary>
          </Link>
          <Link to="/catvideos">
            <ButtonPrimary>Traverse Video Books</ButtonPrimary>
          </Link>
        </div>
      </div>

    </div>

  </div>
);

export default Traverse;
