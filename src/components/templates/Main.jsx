import { sp } from "helpers/helper";

import styles from "./Main.module.css";

function Main({ data }) {
  return (
    <div className={styles.container}>
      {data.data.posts.map((post) => (
        <div key={post._id} className={styles.card}>
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
