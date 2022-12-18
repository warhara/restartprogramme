import React, { useState } from "react";
import { Portal } from "react-portal";
import CreateReview from "./CreateReview";

const Subheader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" flex flex-col items-center my-4">
      <h1 className="font-semibold py-2">Have you experienced ReStart?</h1>
      <button
        className="border px-2 py-1 bg-blue-200 rounded-lg mt-2"
        onClick={() => setIsOpen(true)}
      >
        Add a review
      </button>
      <Portal>{isOpen && <CreateReview setIsOpen={setIsOpen} />}</Portal>
    </div>
  );
};

export default Subheader;
