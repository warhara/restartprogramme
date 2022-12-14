import React from "react";
import { RiUserLine } from "react-icons/ri";

interface Props {
  author: String;
  content: String;
  submitted_at: String;
}

const Review = ({ author, content, submitted_at }: Props) => {
  return (
    <li className="p-4 border rounded-lg bg-white shadow-md">
      <div className="flex items-start h-10 ">
        <RiUserLine className="h-full w-10 bg-slate-100 border-spacing-1 rounded-full" />
        <div className="px-2">
          <h1 className="leading-4 font-bold">{author}</h1>
          <div className="text-xs text-slate-400 leading-3">{submitted_at}</div>
        </div>
      </div>
      <p>{content}</p>
    </li>
  );
};

export default Review;
