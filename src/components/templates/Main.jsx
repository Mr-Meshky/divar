import { sp } from "helpers/helper";

import styles from "./Main.module.css";
import { useNavigate } from "react-router-dom";

function Main({ data }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {data.data.posts.map((post) => (
        <div
          key={post._id}
          className={styles.card}
          onClick={() => navigate(`advertising/${post._id}`)}
        >
          <div className={styles.info}>
            <p>{post.options.title}</p>
            <div>
              <p>{sp(post.amount)} تومان</p>
              <span>{post.options.city}</span>
            </div>
          </div>
          <img
            src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
            alt={post.options.title}
          />
        </div>
      ))}
    </div>
  );
}

export default Main;
