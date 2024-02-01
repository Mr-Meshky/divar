import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import Loader from "../modules/Loader";

import { getMyPosts } from "services/post";
import { deletePost } from "services/post";
import { sp } from "helpers/helper";

import styles from "./PostList.module.css";

function PostList() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["my-post-list"], getMyPosts);

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی‌های شما</h3>
          {data.data.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img
                src="/delete.svg"
                alt="Delete"
                className={styles.delete}
                onClick={() => {
                  deletePost(post._id)
                    .then((res) => {
                      queryClient.invalidateQueries("my-post-list");
                      toast.success(res.data.message);
                    })
                    .catch((error) =>
                      toast.error("مشکلی پیش آمد مجدد تلاش نمایید")
                    );
                }}
              />
              <img
                src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
                alt={post.options.title}
                className={styles.cover}
              />

              <div>
                <p>{post.options.title}</p>
                <span title={post.options.content} className={styles.content}>
                  {post.options.content.split(" ").slice(0, 50).join(" ")}...
                </span>
              </div>

              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
