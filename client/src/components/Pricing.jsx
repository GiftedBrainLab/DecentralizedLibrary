import React from "react";
import ButtonOutline from "./misc/ButtonOutline.";
import Maps from "../assets2/HugeGlobal.svg";
import UserPlan from "../assets2/Free.png";
import Standard from "../assets2/Standard.png";
import Premium from "../assets2/Premium.png";

const Pricing = () => (
  <div
    className="bg-gradient-to-b from-white-300 to-white-500 w-full py-14"
    id="howitworks"
  >
    <div className="max-w-screen-xl  px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
      <div className="flex flex-col w-full">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed">
          A Place for users and content creators
        </h3>
        <p className="leading-normal w-10/12 sm:w-7/12 lg:w-6/12 mx-auto my-2 text-center">
          Select a package that is best for you and explore it happily. Lets get started

        </p>
        <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-12 py-8 lg:py-12 px-6 sm:px-0 lg:px-6">
          <div className="flex flex-col justify-center items-center border-2 border-gray-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20">
            <div className="p-4 lg:p-0 mt-6 lg:mt-16">
              <img
                src={UserPlan}
                width={145}
                height={165}
                alt="User Plan"
              />
            </div>
            <p className="text-lg text-black-600 font-medium capitalize my-2 sm:my-7">
              User / Student Plan
            </p>
            <ul className="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black-500 flex-grow">
              <li className="relative check custom-list my-2">
                Unlimited free content
              </li>
              <li className="relative check custom-list my-2">
                Access to Ebooks
              </li>
              <li className="relative check custom-list my-2">
                Access to Video books
              </li>
              <li className="relative check custom-list my-2">
                Quiz to earn NFTs
              </li>
            </ul>
            <div className="flex flex-col w-full justify-center mb-8 flex-none mt-12">
              <p className="text-2xl text-black-600 text-center mb-4 ">
                Free
              </p>
              <ButtonOutline>Get Started</ButtonOutline>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center border-2 border-gray-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20">
            <div className="p-4 lg:p-0 mt-6 lg:mt-16">
              <img
                src={Standard}
                width={145}
                height={165}
                alt="Standard Content"
              />
            </div>
            <p className="text-lg text-black-600 font-medium capitalize my-2 sm:my-7">
              Creator Standard Plan{" "}
            </p>
            <ul className="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black-500 flex-grow">
              <li className="relative check custom-list my-2">
                Unlimited Contents
              </li>
              <li className="relative check custom-list my-2">
                Decentralized storage
              </li>
              <li className="relative check custom-list my-2">
                Enjoy Polygon PoS
              </li>
              <li className="relative check custom-list my-2">
                Low Gas Fee
              </li>
              <li className="relative check custom-list my-2">
                Connect Anywhere{" "}
              </li>
            </ul>
            <div className="flex flex-col w-full justify-center mb-8 flex-none mt-12">
              <p className="text-2xl text-black-600 text-center mb-4 ">
                <span className="text-black-500">Free</span>
              </p>
              <ButtonOutline>Create</ButtonOutline>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center border-2 border-gray-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20">
            <div className="p-4 lg:p-0 mt-6 lg:mt-16">
              <img
                src={Premium}
                width={145}
                height={165}
                alt="Premium Content"
              />
            </div>
            <p className="text-lg text-black-600 font-medium capitalize my-2 sm:my-7">
              Creator Premium Plan{" "}
            </p>
            <ul className="flex flex-col list-inside pl-6 xl:pl-0 items-start justify-start text-left text-black-500 flex-grow">
              <li className="relative check custom-list my-2">
                Unlimited Contents
              </li>
              <li className="relative check custom-list my-2">
                Decentralized storage
              </li>
              <li className="relative check custom-list my-2">
                Enjoy Polygon PoS
              </li>
              <li className="relative check custom-list my-2">
                Low Gas Fee
              </li>
              <li className="relative check custom-list my-2">
                Connect Anywhere{" "}
              </li>
              <li className="relative check custom-list my-2">
                Earn per content created {" "}
              </li>
            </ul>
            <div className="flex flex-col w-full justify-center mb-8 flex-none mt-12">
              <p className="text-2xl text-black-600 text-center mb-4 ">
                <span className="text-black-500">Subscription</span>
              </p>

              <ButtonOutline>Create</ButtonOutline>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full my-16">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed w-9/12 sm:w-6/12 lg:w-4/12 mx-auto">
          Huge Global Network of Decentralized Assets{" "}
        </h3>
        <p className="leading-normal  mx-auto my-2 w-10/12 sm:w-7/12 lg:w-6/12">
          Use and create Contents for everyone from anywhere in the world. Keep reading and keep earning.
        </p>
        <div className="py-12 w-full px-8 mt-16">
          {/** <Maps className="w-full h-auto" /> */}
          <img
            src={Maps}
            className="py-12 w-full px-8 mt-16"
            alt="maps"
          />
        </div>
        <div className="w-full flex justify-evenly items-center mt-4 flex-wrap lg:flex-nowrap" />
      </div>
    </div>
  </div>
);

export default Pricing;
