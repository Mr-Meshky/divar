import { Link } from "react-router-dom";

import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="/divar.svg" alt="Divar" className={styles.logo} />
        </Link>

        <span>
          <img src="/location.svg" alt="Location" />
          <p>تهران</p>
        </span>
      </div>

      <div>
        <Link to="/auth">
          <span>
            <img src="/profile.svg" alt="Profile" />
            <p>دیوار من</p>
          </span>
        </Link>
        <Link to="/dashboard" className={styles.button}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
