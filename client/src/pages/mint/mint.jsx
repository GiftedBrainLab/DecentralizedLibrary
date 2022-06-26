/* pages/create-item-ebook.js */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../../components";

export default function CreateItem() {
  // const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ name: "" });
  const navigate = useNavigate();

  async function mintNFT() {
    // const { name } = formInput;
    const options = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/mints/easy/urls",
      headers: {
        "Content-Type": "application/json",
        Authorization: "768bfb7a-087d-4ee1-8bb0-5498cc36ad46"
      },
      data: {
        chain: "polygon",
        name: "DLIB NFT",
        description: "An NFT you earn at Decentralized Library",
        file_url: "https://thumbs.dreamstime.com/b/conceptual-hand-writing-showing-well-done-concept-meaning-used-praising-demonstrating-group-something-have-good-way-young-142552626.jpg",
        mint_to_address: formInput.name
      }
    };

    axios.request(options).then((response) => {
      console.log(response.data);
      alert("Your DLIB NFT have just been minted. Check your NFT on polygon explorer");
    }).catch((error) => {
      console.error(error);
    });
    // router.push('/')
    navigate("/");
  }

  return (
    <>
      <Navbar />
      <br />
      <div className="flex justify-center my-40">

        <div className="w-1/2 flex flex-col pb-12">
          <div className="text-5xl justify-center font-bold mt-4 text-white">
            <h1>Mint your earned NFT here </h1>
            <br />
          </div>
          <input
            placeholder="Enter you Polygon Wallet Address"
            className="mt-8 border rounded p-4"
            onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
          />

          <button type="button" onClick={mintNFT} className="font-bold mt-4 bg-red-500 text-white rounded p-4 shadow-lg">
            Mint you NFT
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
