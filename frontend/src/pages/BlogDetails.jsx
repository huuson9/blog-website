import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Comment from "../components/Comment";
import { GetContent } from "../services/GetContent";
import { RiEditCircleFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import "animate.css";
import { HiOutlineCalendar } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import LikeBtn from "../components/LikeBtn";
import Loader from "../components/Loader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const BlogDetails = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { user, authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const URL_CREATE_COMMENT = `${BASE_URL}/api/comments/create/`;
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    GetContent.fetchBlog(id).then((data) => {
      setBlog(data);
      setLoading(false);
    });
    GetContent.fetchComments(id).then((data) => {
      setComments(data);
    });
  }, [id]);

  const {
    title,
    content,
    author_name,
    author_photo,
    date_created,
    image,
    category,
    total_likes,
    reading_time,
    likes,
  } = blog || {};
  const { user_photo } = comments.user || {};

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = () => {
      if (likes) {
        if (likes.includes(user?.user_id)) {
          return true;
        } else {
          return false;
        }
      }
    };
    setIsLiked(checkIfLiked());
  }, [likes, user?.user_id]);

  const [comment, setComment] = useState("");

  const handleSubmitComment = async (e) => {
    if (!user) {
      navigate("/login", {
        state: { message: "Please login to comment!" },
      });
    } else {
      e.preventDefault();
      const response = await fetch(URL_CREATE_COMMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
        body: JSON.stringify({
          blog: id,
          user: user.user_id,
          body: comment,
        }),
      });
      const data = await response.json();
      setComments([...comments, data]);
      setComment("");
    }
  };

  const handleChangeComment = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleLike = async () => {
    if (!user) {
      navigate("/login", {
        state: { message: "Please login to like!" },
      });
    } else {
      const response = await fetch(`${BASE_URL}/api/blogs/${id}/addlike/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
        body: JSON.stringify({ user: user.user_id }),
      });
      const data = await response.json();
      setBlog((prev) => ({ ...prev, total_likes: data.total_likes }));
      setIsLiked(true);
    }
  };

  const handleUnlike = async () => {
    if (!user) {
      navigate("/login", {
        state: { message: "You need to login first!" },
      });
    } else {
      const response = await fetch(`${BASE_URL}/api/blogs/${id}/removelike/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
        body: JSON.stringify({ user: user.user_id }),
      });
      const data = await response.json();
      setBlog((prev) => ({ ...prev, total_likes: data.total_likes }));
      setIsLiked(false);
    }
  };

  const handleDelete = async () => {
    await fetch(`${BASE_URL}/api/blogs/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authToken.access),
      },
    });
    navigate("/");
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`, { state: { blog } });
  };

  const handleDeleteComment = useCallback(
    async (commentId) => {
      await fetch(`${BASE_URL}/api/comments/${commentId}/delete/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
      });
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authToken?.access]
  );

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
      {!loading && (
        <div className="container mx-auto my-10 animate__animated animate__fadeIn">
          <div className="relative flex flex-col gap-2 border shadow-2xl rounded-2xl bg-primary-neutral border-primary-base">
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                className=" md:h-[500px] w-full object-cover"
                src={`${BASE_URL}${image}`}
                alt=""
              />

              <p className="absolute px-4 py-2 font-semibold text-white transition duration-500 top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl hover:scale-110">
                {category}
              </p>
            </div>
            <div className="flex flex-wrap px-2 pt-4 md:justify-between md:px-10">
              <div className="flex items-center gap-2">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src={`${BASE_URL}${author_photo}`}
                  alt=""
                />
                <p className="text-sm">{author_name}</p>
              </div>

              <div className="flex items-center gap-1">
                <HiOutlineCalendar className="font-semibold text-blue-600 md:text-2xl" />
                <p className="text-xs md:text-lg">{date_created}</p>

                <IoIosTimer className="ml-4 font-semibold text-purple-600 md:text-2xl" />
                <p className="text-xs md:text-lg">{reading_time}</p>
              </div>
              <div className="flex items-center justify-end gap-2 px-2 ">
                {user && user.username === blog.author_name ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="p-3 cursor-pointer bg-primary-info rounded-2xl hover:scale-95"
                    >
                      <RiEditCircleFill className="text-gray-50" />
                    </button>

                    <button
                      onClick={handleDelete}
                      className="p-3 cursor-pointer bg-primary-error rounded-2xl hover:scale-95"
                    >
                      <MdDelete className="text-gray-100" />
                    </button>
                  </>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-5 px-2 py-2 md:px-10">
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold blog-title">{title}</p>
                <LikeBtn
                  total_likes={total_likes}
                  handleLike={handleLike}
                  handleUnlike={handleUnlike}
                  isLiked={isLiked}
                  likes={likes}
                  user={user}
                />
              </div>

              <div>
                <ReactQuill value={content} readOnly={true} theme={"bubble"} />
              </div>
            </div>
          </div>
          <h2 className="mt-5 mb-2 text-xl font-semibold">Comment</h2>
          <form onSubmit={handleSubmitComment}>
            <input
              className="w-full p-3 border rounded bg-primary-neutral border-slate-600 focus:outline-primary"
              type="text"
              placeholder="Write your thought..."
              value={comment}
              onChange={handleChangeComment}
              required
            />
            <div className="flex justify-end mt-5">
              <button
                className="mb-5 text-white capitalize bg-blue-500 btn btn-sm"
                type="submit"
              >
                Comment
              </button>
            </div>
          </form>
          <div className="flex flex-col gap-3">
            {comments
              ?.slice(0)
              .reverse()
              .map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  user={user}
                  user_photo={user_photo}
                  handleDeleteComment={handleDeleteComment}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetails;
