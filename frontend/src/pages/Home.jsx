import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import notfound from "../assets/notfound.png";
import { GetContent } from "../services/GetContent";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    setLoading(true);
    GetContent.fetchAllBlogs().then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Loader type={"bubbles"} color={"deepskyblue"} />
        </div>
      )}
      {!loading && blogs.length === 0 ? (
        <>
          <p className="text-2xl font-semibold text-center">
            No blog entries found!
          </p>
          <p className="text-center text-primary">
            You can create blog from your profile tab
          </p>
          <img src={notfound} alt="" className="w-1/2 mx-auto" />
        </>
      ) : (
        <div className="flex flex-row justify-around mt-6">
          <div className="">
            <p className="block p-4 py-2 font-semibold text-primary mt-9">
              Blog Topics
            </p>
            <ul className="flex flex-col gap-2 p-4 mt-3 text-base text-gray-500">
              <li className="font-medium hover:text-black">
                <Link to="/technology">Technology</Link>
              </li>
              <li className="font-medium hover:text-black">
                <Link to="/education">Education</Link>
              </li>
              <li className="font-medium hover:text-black">
                <Link to="/music">Music</Link>
              </li>
              <li className="font-medium hover:text-black">
                <Link to="/">Travel</Link>
              </li>
              <li className="font-medium hover:text-black">
                <Link to="/">Marketing</Link>
              </li>
              <li className="font-medium hover:text-black">
                <Link to="/">Business</Link>
              </li>
              <li className="font-medium hover:text-black">
                <Link to="/">Food</Link>
              </li>
            </ul>
          </div>
          <div className="grid w-2/3 grid-cols-1 gap-5">
            {blogs.map((blog) => {
              return (
                <Blog
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  content={blog.content}
                  author_name={blog.author_name}
                  author_bio={blog.author_bio}
                  author_photo={blog.author_photo}
                  date_created={blog.date_created}
                  date_updated={blog.date_updated}
                  image={blog.image}
                  category={blog.category}
                  total_likes={blog.total_likes}
                  likes={blog.likes}
                  reading_time={blog.reading_time}
                  comment_count={blog.comment_count}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
