import React from "react";
import Logo from "../assets/library-logo.svg";
import Facebook from "../assets/Icon/facebook.svg";
import Twitter from "../assets/Icon/twitter.svg";
import Instagram from "../assets/Icon/instagram.svg";

const Footer = () => (
  <div className="bg-gray-100 pt-20 pb-24">
    <div className="max-w-screen-xl w-full mx-auto px-6 md:px-8 lg:px-16 grid grid-rows-6 md:grid-rows-1 grid-flow-row md:grid-flow-col grid-cols-3 md:grid-cols-12 gap-4">
      <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start ">
        {/** <Logo className="h-8 w-auto mb-6" /> */}
        <img
          src={Logo}
          alt="logo"
          quality={100}
          className="h-12 w-auto "
          layout="responsive"
        />
        <p className="mb-4">
          <strong className="font-medium">Decentralized Library</strong> offers you you diversity of learning resources both as ebooks and video-books. Materials are curated from various categories..
        </p>
        <div className="flex w-full mt-2 mb-8 -mx-2">
          <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
            {/**  <Facebook className="h-6 w-6" />  */}
            <img
              src={Facebook}
              alt="Facebook"
              quality={100}
              className="h-6 w-6 "
              layout="responsive"
            />
          </div>
          <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
            {/**   <Twitter className="h-6 w-6" />  */}
            <img
              src={Twitter}
              alt="Twitter"
              quality={100}
              className="h-6 w-6 "
              layout="responsive"
            />
          </div>
          <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
            {/**  <Instagram className="h-6 w-6" />  */}
            <img
              src={Instagram}
              alt="Instagram "
              quality={100}
              className="h-6 w-6 "
              layout="responsive"
            />
          </div>
        </div>
        <p className="text-gray-700">©2022 Decentralized Library</p>
      </div>
      <div className=" row-span-2 md:col-span-2 md:col-start-7 md:col-end-9 flex flex-col">
        <p className="text-black-600 mb-4 font-medium text-lg">Categories</p>
        <ul className="text-black-500 ">
          <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            Humanities

            {" "}
          </li>
          <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            Social science{" "}
          </li>
          <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            Natural science{" "}
          </li>
          <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            Formal science{" "}
          </li>
          <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            Applied science{" "}
          </li>

        </ul>
      </div>
      <div className="row-span-2 md:col-span-2 md:col-start-9 md:col-end-11 flex flex-col">
        <p className="text-black-600 mb-4 font-medium text-lg">Engage</p>
        <ul className="text-black-500">
          <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            FAQ{" "}
          </li>
          <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            Tutorials{" "}
          </li>
          <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            About Us{" "}
          </li>
          <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            Privacy Policy{" "}
          </li>
          <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            Terms of Service{" "}
          </li>
        </ul>
      </div>
      <div className="row-span-2 md:col-span-2 md:col-start-11 md:col-end-13 flex flex-col">
        <p className="text-black-600 mb-4 font-medium text-lg">Partners</p>
        <ul className="text-black-500">
          <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            Polygon{" "}
          </li>
          <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            Unlock Protocol{" "}
          </li>
          <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
            Covalent{" "}
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Footer;
