/* eslint-disable max-len */
import React from "react";
import { Link } from "react-router-dom";
// import Image from "next/image";
import ButtonPrimary from "./misc/ButtonPrimary";
// import Student from "../assets2/Illustration1.png";

const Select = () => (
  <div className="max-w-screen-xl mt-20 px-8 xl:px-16 mx-auto " id="about">
    <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 md:grid-rows-1 sm:grid-cols-1 gap-8 py-6 sm:py-16 ">
      <div className=" flex flex-col items-center justify-center items-start row-start-1 sm:row-start-1 ">
        <h3 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
          Select the type of item you wish to create.
        </h3> <br /> <br />

        <div className="flex flex-row my-20 ml-10 mr-10 space-x-14  text-3xl">
          <Link to="/create-ebook">
            <ButtonPrimary>Create Ebook</ButtonPrimary>
          </Link>
          <Link to="/create-videobook">
            <ButtonPrimary>Create Video Book</ButtonPrimary>
          </Link>
        </div>
      </div>

    </div>

  </div>
);

export default Select;
