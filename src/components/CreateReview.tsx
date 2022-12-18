import React, { useRef, useState } from "react";
import { z } from "zod";

const reviewSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(25),
  lastName: z
    .string({
      required_error: "Last name is required",
    })
    .min(1)
    .max(25),
  content: z
    .string({
      required_error: "Content name is required",
    })
    .min(1)
    .max(250),
});

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateReview = ({ setIsOpen }: Props) => {
  const [reviewInfo, setReviewInfo] = useState({
    firstName: "",
    lastName: "",
    content: "",
  });
  const [formError, setFormError] = useState<any>({});
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormError({ ...formError, [e.target.name]: "" });
    setReviewInfo({
      ...reviewInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log(e.target);
    console.log();
    if (!modalRef.current) return;
    if (!modalRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSubmit = async () => {
    const data = reviewSchema.safeParse(reviewInfo);

    if (!data.success) {
      const formatted = data.error.format();
      return setFormError(formatted);
    }

    const payload = {
      author: data.data.firstName + " " + data.data.lastName,
      content: data.data.content,
    };

    const response = fetch("http://localhost:5000/reviews/add", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsOpen(false);
  };

  return (
    <div
      className="absolute top-0 bg-opacity-20 bg-slate-500 w-screen h-screen"
      onClick={handleModalClick}
    >
      <div
        className="relative w-fit p-2 bg-white h-fit mx-auto my-20 rounded-lg border shadow-md flex flex-col items-center "
        ref={modalRef}
      >
        <button
          className="absolute right-2 top-2 font-bold"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
        <h1 className="font-semibold mx-auto w-fit my-2 text-lg">
          Create a Review
        </h1>
        <div className="flex flex-col gap-4 mx-4 w-fit">
          <div className="flex ">
            <label className="w-24">First Name *</label>

            <input
              name="firstName"
              onChange={handleChange}
              maxLength={20}
              className={`border px-2 rounded-md ${
                formError.firstName && "border-red-500"
              }`}
            />
          </div>

          <div className="flex">
            <label className="w-24">Last Name *</label>

            <input
              name="lastName"
              onChange={handleChange}
              maxLength={20}
              className={`border px-2 rounded-md ${
                formError.lastName && "border-red-500"
              }`}
            />
          </div>

          <div>
            <label>Your Review *</label>

            <textarea
              name="content"
              onChange={handleChange}
              className={`border w-full max-h-24 h-24 resize-none p-2 leading-4 rounded-md ${
                formError.content && "border-red-500"
              }`}
              maxLength={250}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="border px-2 py-1 bg-slate-300 shadow-md hover:bg-slate-600 hover:text-white rounded-lg font-semibold leading-tight my-2"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreateReview;
