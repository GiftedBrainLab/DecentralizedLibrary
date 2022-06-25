import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { Loader } from ".";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="mt-4 border-2 rounded p-4"
  />
);

const Sender = () => {
  // const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);
  const { handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);
  const handleSubmit = (e) => {
    const { amount, message } = formData;

    e.preventDefault();

    if (!amount || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-1/2 flex flex-col pb-8  ">

        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
        <Input placeholder="Enter Transaction Message" name="message" type="text" handleChange={handleChange} />

        <div className="h-[1px] w-full bg-gray-400 my-2 mt-4 " />

        {isLoading
          ? <Loader />
          : (
            <button
              type="button"
              onClick={handleSubmit}
              className="text-2xl text-white w-full mt-8 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer h-20"
            >
              Send now
            </button>
          )}
      </div>
    </div>
  );
};

export default Sender;
