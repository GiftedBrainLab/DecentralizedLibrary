import React from "react";
import Image from "../assets/Illustration2.png";

const Feature = () => (
  <div
    className="max-w-screen-xl mt-8 mb-6 md:mt-14 md:mb-14 px-6 md:px-8 lg:px-16 mx-auto"
    id="feature"
  >
    <div className="grid grid-flow-row md:grid-flow-col grid-cols-1 md:grid-cols-2 gap-8 py-8 my-12">
      <div className="flex w-full justify-end">
        <div className="h-full w-full p-4">
          <img
            src={Image}
            alt="VPN Illustrasi"
            layout="responsive"
            quality={100}
            height={414}
            width={508}
          />
        </div>
      </div>
      <div className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12">
        <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
          We Provide Many Features You Can Use
        </h3>
        <p className="my-2 text-black-500">
          You can explore the features that we provide with fun and you can suggest features you intend to see.
        </p>
        <ul className="text-black-500 self-start list-disc list-inside ml-8">
          <li className="relative circle-check custom-list">
            Profile creation for users and content creators.
          </li>
          <li className="relative circle-check custom-list">
            Various categories of learning material.
          </li>
          <li className="relative circle-check custom-list">
            E-books
          </li>
          <li className="relative circle-check custom-list">
            Video Books
          </li>
          <li className="relative circle-check custom-list">
            Short Online quiz
          </li>
          <li className="relative circle-check custom-list">
            Earn NFTs
          </li>
          <li className="relative circle-check custom-list">
            Live class / Tutorial broadcast
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Feature;
