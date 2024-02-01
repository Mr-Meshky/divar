import { Link } from "react-router-dom";

import notFound from "assets/images/not-found.png";

import styles from "./404.module.css";

function PageNotFound() {
  return (
    <div className={styles.container}>
      <img src={notFound} alt="اشتباه اومدی" />
      <h3>این راه به جایی نمی‌رسد!</h3>
      <p>
        به نظر آدرس را اشتباه وارد کرده‌اید. برای پیدا کردن مسیر درست می‌توانید
        سری به <Link to="/">صفحهٔ اول دیوار</Link> بزنید.
      </p>
    </div>
  );
}

export default PageNotFound;
