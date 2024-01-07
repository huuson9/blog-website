import React from "react";
import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import "react-quill/dist/quill.bubble.css";

const Blog = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const {
    id,
    title,
    content,
    author_name,
    author_photo,
    date_created,
    image,
    category,
    total_likes,
    reading_time,
    comment_count,
  } = props;

  return (
    <div className="flex flex-row-reverse p-3 border shadow-xl rounded-2xl bg-primary-neutral gap-9">
      <div>
        <img
          className="object-cover h-48 transition duration-500 w-80 backdrop-grayscale"
          src={`${BASE_URL}${image}`}
          alt=""
        />
      </div>
      <div className="flex flex-col w-2/3 ">
        <div className="flex flex-col gap-5 ">
          <p className="text-lg font-bold transition duration-700 cursor-pointer hover:underline line-clamp-2">
            <Link to={`/blog/${id}`}>{title}</Link>
          </p>
          <p className="text-sm text-gray-600 border-gray-400 line-clamp-5">
            {content.replace(/<[^>]+>/g, "")}
          </p>
          <div className="flex gap-2">
            <img
              className="object-cover w-6 h-6 rounded-full"
              src={`${BASE_URL}${author_photo}`}
              alt=""
            />
            <p className="text-base line-clamp-1">{author_name}</p>
          </div>

          <div className="flex items-center gap-4">
            <p className="px-3 py-1 text-sm text-gray-600 border-2 border-gray-400 cursor-pointer rounded-3xl">
              {category}
            </p>
            <div className="flex flex-row items-center justify-center gap-1">
              <HiOutlineCalendar className="text-xl font-semibold text-blue-600" />
              <p className="text-xs md:text-sm">{date_created}</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <IoIosTimer className="text-xl font-semibold text-purple-600" />
              <p className="text-xs md:text-sm">{reading_time}</p>
            </div>
          </div>

          <div className="flex justify-around px-2 ">
            <div className="flex items-center ">
              <AiFillLike />
              <p>{total_likes}</p>
            </div>
            <div className="flex items-center gap-1">
              <FaRegComments />
              <p>{comment_count}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
