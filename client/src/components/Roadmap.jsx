import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start test-gray p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Roadmap = () => (
  <div className="flex w-full justify-center items-center bg-white-100" id="roadmap">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 ">
          Our Roadmap
          <br />
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          Every good and promising projects starts from small and grow to become and indisputable project. This projects is a continuous and dynamic one with this roadmap toward actaulizing a decentralized library
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Front-end Design"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="If you can read this, the frontend design is live nad working. Minor adjustments and updates would be carried out for a better user experience. "
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="IPFS integration of assets to Smart Contract. "
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="How uploaded assets for the library will interact with the smart contract will be done at this phase. Contents includes ebooks and video books. Smart contracts will continually upgraded to meet the need of the community "
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Live Video Class "
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Content creators can live stream classes / tutorails or workshop in a decentralized fashion using the Livepeer protocol."
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="More book Categories "
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="The library will be funished with more books for various category of learning. There will be no more barier to knowledge. More books from different categories and sections coming soon."
        />
      </div>
    </div>
  </div>
);

export default Roadmap;
