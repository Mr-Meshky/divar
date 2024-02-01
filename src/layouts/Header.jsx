import { Link, NavLink, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getProfile } from "src/services/user";

import styles from "./Header.module.css";
import { deleteCookie } from "src/utils/cookie";

function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery(["profile"], getProfile);

  const logOutHandler = () => {
    deleteCookie();
    queryClient.invalidateQueries(["profile"]);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src="/divar.svg" alt="Divar" className={styles.logo} />
      </Link>

      <div>
        <div className={styles.divarMan}>
          <span>
            <img src="/profile.svg" alt="Profile" />
            <p>دیوار من</p>
          </span>
          {data?.data?.role === "ADMIN" ? (
            <div>
              <Link to="/dashboard">
                <p>داشبورد</p>
              </Link>
              <hr />
              <Link to="/admin">
                <p>پنل ادمین</p>
              </Link>
              <hr />
              <p onClick={logOutHandler}>خروج</p>
            </div>
          ) : data?.data?.role === "USER" ? (
            <div>
              <Link to="/dashboard">
                <p>داشبورد</p>
              </Link>
              <hr />
              <p onClick={logOutHandler}>خروج</p>
            </div>
          ) : (
            <div>
              <Link to="/auth">ورود</Link>
            </div>
          )}
        </div>

        <Link to="/dashboard" className={styles.button}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
